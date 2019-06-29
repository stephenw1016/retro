// @flow
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import format from 'date-fns/format';
import uuid from 'uuid';
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from '@material-ui/core';

import CategorySelect from './CategorySelect';

type Props = {
  classes: any,
};

const NewSessionForm = (props: Props) => {
  const { classes } = props;
  const [name, setName] = useState('New Session');
  const [date, setDate] = useState(format(new Date(), 'YYYY-MM-DD'));
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let ignore = false;

    const fetchCategories = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        if (!ignore) {
          const { data } = await axios('../../../../data/categories.json');
          setCategories(data);
        }
      } catch (error) {
        setIsError(true);
        console.error(error);
      }

      setIsLoading(false);
    };

    fetchCategories();

    return () => {
      ignore = true;
    };
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleStartSession = () => {
    const newSession = {
      id: uuid.v4(),
      name,
      date,
      categories: selectedCategoryIds.map(c => ({ id: c, votes: [] })),
    };
    console.log('NEW SESSION CREATED', newSession);
  };

  return (
    <Paper className={classes.root}>
      {isError && <div>Something went wrong...</div>}
      {isLoading ? <CircularProgress /> : (
        <>
          <Typography variant="h5">
            New Session
          </Typography>
          <Grid className={classes.form} container alignItems="center" justify="center" spacing={24}>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="nameInput" shrink>Name</InputLabel>
                <Input id="nameInput" type="text" value={name} onChange={handleNameChange} />
                <FormHelperText>The name for your session.</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="dateInput" shrink>Date</InputLabel>
                <Input id="dateInput" type="date" value={date} onChange={handleDateChange} />
                <FormHelperText>The date your session takes place.</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="categorySelect" shrink>Categories</InputLabel>
                <CategorySelect
                  categories={categories}
                  selectedCategoryIds={selectedCategoryIds}
                  onChange={setSelectedCategoryIds}
                />
                <FormHelperText>Select the categories that your team will vote on.</FormHelperText>
              </FormControl>
            </Grid>

            <Grid className={classes.actions} item xs={12}>
              <Button color="primary" variant="contained" onClick={handleStartSession}>
                Start Session
              </Button>
            </Grid>

          </Grid>
        </>
      )}
    </Paper>
  );
};

const styles = theme => ({
  root: {
    height: '100%',
    padding: theme.spacing.unit * 2,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  form: {
    padding: `${theme.spacing.unit * 2}px 0`,
  },
  title: {
    padding: theme.spacing.unit,
  },
});

export default withStyles(styles)(NewSessionForm);
