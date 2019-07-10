// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

type Props = {};

const useStyles = makeStyles(theme => ({
  root: {},
}));

const UserProfile = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>User Profile</div>
  );
};

export default UserProfile;
