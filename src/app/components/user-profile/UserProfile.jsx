// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {},
}));

const UserProfile = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>User Profile</div>
  );
};

export default UserProfile;
