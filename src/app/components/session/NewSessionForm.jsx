// @flow
import React, { useEffect, useState } from 'react';
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
  InputLabel,
  Typography, TextField,
} from '@material-ui/core';

import CategorySelect from './CategorySelect';
import { useCategories } from '../../hooks/useCategories';
import { routes } from '../../constants';

type Props = {
  classes: any,
  history: any,
};

const NewSessionForm = (props: Props) => {
  const { classes, history } = props;
  const [name, setName] = useState('New Session');
  const [date, setDate] = useState(format(new Date(), 'YYYY-MM-DD'));
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [categories, isError, isLoading] = useCategories();

  useEffect(() => {
    setSelectedCategoryIds(categories.map(({ id }) => id));
  }, [categories]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleStartSession = () => {
    const sessionCategories = selectedCategoryIds.map(c => ({ id: c, votes: [] }));
    const newSession = { id: uuid.v4(), name, date, categories: sessionCategories };
    console.log('new session', newSession);
    // history.push(`${routes.SESSIONS}/${newSession.id}`);
    history.push(`${routes.SESSION}/session-1`);
  };

  const commonTextFieldProps = {
    fullWidth: true,
    InputLabelProps: { shrink: true },
    margin: 'dense',
    required: true,
  };

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Paper className={classes.root}>
      <Typography variant="h5">
        New Session
      </Typography>
      <Grid className={classes.form} container alignItems="center" justify="center" spacing={24}>
        <Grid item xs={12} sm={8}>
          <TextField
            {...commonTextFieldProps}
            id="nameInput"
            label="Name"
            helperText="The name for your session."
            error={!name}
            value={name}
            onChange={handleNameChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            {...commonTextFieldProps}
            id="dateInput"
            label="Date"
            type="date"
            helperText="The date your session takes place."
            error={!date}
            value={date}
            onChange={handleDateChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl required fullWidth margin="dense" error={!selectedCategoryIds.length}>
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
          <Button
            color="primary"
            variant="contained"
            onClick={handleStartSession}
            disabled={!(name && date && selectedCategoryIds.length)}
          >
            Start Session
          </Button>
        </Grid>
      </Grid>
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
