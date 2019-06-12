// @flow
import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import format from 'date-fns/format';
import uuid from 'uuid';
import {
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  Paper,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

type Props = {
  classes: any,
};

const NewSessionForm = (props: Props) => {
  const { classes } = props;
  const [name, setName] = useState('New Session');
  const [date, setDate] = useState(format(new Date(), 'YYYY-MM-DD'));
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let ignore = false;

    const fetchCategories = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await fetch('../../../../data/categories.json');
        const data = await response.json();

        if (!ignore) {
          setCategories(data);
        }
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchCategories();
    return () => { ignore = true; };
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleCategoryToggle = id => () => {
    console.log(id);
    const currentIndex = selectedCategories.indexOf(id);
    console.log(currentIndex);
    const newSelectedCategories = [...selectedCategories];

    if (currentIndex === -1) {
      newSelectedCategories.push(id);
    } else {
      newSelectedCategories.splice(currentIndex, 1);
    }

    setSelectedCategories(newSelectedCategories);
    console.log(newSelectedCategories);
  };

  const handleStartSession = () => {
    const newSession = {
      id: uuid.v4(),
      name,
      date,
      categories: selectedCategories.map(c => ({ id: c, votes: [] })),
    };
    console.log('NEW SESSION CREATED', newSession);
  };

  return (
    <Paper className={classes.root}>
      {isError && <div>Something went wrong ...</div>}
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
                <InputLabel shrink>Date</InputLabel>
                <Input type="date" value={date} onChange={handleDateChange} />
                <FormHelperText>The date your session takes place.</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="categorySelect" shrink>Categories</InputLabel>
                <List id="categorySelect">
                  {categories.map(({ id, title }) => {
                    const labelId = `checkbox-list-label-${id}`;

                    return (
                      <ListItem key={id} dense button onClick={handleCategoryToggle(id)} divider>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={selectedCategories.includes(id)}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={title} />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="Description">
                            <InfoIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
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
