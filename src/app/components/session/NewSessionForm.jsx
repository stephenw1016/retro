// @flow
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { withStyles } from '@material-ui/core/styles';
import format from 'date-fns/format';
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
import { routes } from '../../constants';
import { addSession } from '../../state/actions';
import { useAuth } from '../../hooks/useAuth';
import { useCategories } from '../../hooks/useCategories';

type Props = {
  classes: any,
  history: any,
  addSession: Function,
};

const NewSessionForm = (props: Props) => {
  const { classes, history } = props;
  const user = useAuth();
  const [name, setName] = useState('New Session');
  const [organization, setOrganization] = useState('');
  const [date, setDate] = useState(format(new Date(), 'YYYY-MM-DD'));
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [categories, isError, isLoading] = useCategories();

  useEffect(() => {
    setSelectedCategoryIds(categories.map(({ id }) => id));
  }, [categories]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleOrganizationChange = (e) => {
    setOrganization(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleStartSession = () => {
    const sessionCategories = selectedCategoryIds.map((id) => {
      const category = categories.find(c => c.id === id);
      return { ...category, id, votes: [] };
    });

    const session = {
      id: uuid.v4(),
      name,
      organization,
      date,
      categories: sessionCategories,
      createDate: format(Date.now()),
      createdBy: user.uid,
      inProgress: true,
    };

    props.addSession(session);
    history.push(`${routes.SESSION}/${session.id}`);
  };

  const commonTextFieldProps = {
    fullWidth: true,
    InputLabelProps: { shrink: true },
    margin: 'dense',
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
        <Grid item xs={12} sm={12}>
          <TextField
            {...commonTextFieldProps}
            required
            id="nameInput"
            label="Name"
            helperText="The name for your session."
            error={!name}
            value={name}
            onChange={handleNameChange}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            {...commonTextFieldProps}
            id="organizationInput"
            label="Organization"
            helperText="The name of your organization."
            value={organization}
            onChange={handleOrganizationChange}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            {...commonTextFieldProps}
            required
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

const mapDispatchToProps = dispatch => ({
  addSession: session => dispatch(addSession(session)),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(NewSessionForm));
