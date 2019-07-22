// @flow
import React, { useEffect, useState } from 'react';
import uuid from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import format from 'date-fns/format';
import {
  Button,
  Grid,
  Paper,
  FormControl,
  FormHelperText,
  InputLabel,
  Typography, TextField, Toolbar, AppBar,
} from '@material-ui/core';

import CategorySelect from './CategorySelect';
import { routes } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import type { Category } from '../../types';

type Props = {
  categories: Array<Category>,
  history: any,
  requestCategories: any,
  saveSession: any,
  selectedCategoryIds: Array<string>,
  setSelectedCategoryIds: any,
};

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    padding: theme.spacing(2),
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  categorySelect: {
    maxHeight: 300,
    overflow: 'auto',
  },
  form: {
    padding: `${theme.spacing(2)}px 0`,
  },
  title: {
    padding: theme.spacing(1),
  },
}));

const NewSessionForm = (props: Props) => {
  const {
    categories, history, requestCategories, saveSession,
    selectedCategoryIds, setSelectedCategoryIds } = props;
  const classes = useStyles();
  const user = useAuth();
  const [name, setName] = useState('New Session');
  const [organization, setOrganization] = useState('');
  const [date, setDate] = useState(format(new Date(), 'YYYY-MM-DD'));

  useEffect(() => {
    requestCategories();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleOrganizationChange = (e) => {
    setOrganization(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleCategorySelect = (categoryIds) => {
    setSelectedCategoryIds(categoryIds);
  };

  const handleStartSession = () => {
    const sessionCategories = selectedCategoryIds.map((id) => {
      const category = categories.find(c => c.id === id);
      return { ...category, id, votes: {} };
    });

    const session = {
      id: uuid.v4(),
      name,
      organization,
      date,
      categories: sessionCategories,
      createDate: format(Date.now()),
      createdBy: user.uid,
      categoryIndex: 0,
    };

    saveSession(session);
    history.push(`${routes.SESSION}/${session.id}`);
  };

  const commonTextFieldProps = {
    fullWidth: true,
    InputLabelProps: { shrink: true },
    margin: 'dense',
  };

  return (
    <>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6">Create New Session</Typography>
        </Toolbar>
      </AppBar>
      <Paper className={classes.root} square elevation={0}>
        <Grid className={classes.form} container alignItems="center" justify="center" spacing={2}>
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
              <InputLabel htmlFor="categorySelect" shrink>
              Categories
              </InputLabel>
              <CategorySelect
                className={classes.categorySelect}
                categories={categories}
                selectedCategoryIds={selectedCategoryIds}
                onChange={handleCategorySelect}
              />
              <FormHelperText>
                {`Select the categories that your team will vote on.
               ${selectedCategoryIds.length}/${categories.length} selected.`}
              </FormHelperText>
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
    </>
  );
};

export default NewSessionForm;
