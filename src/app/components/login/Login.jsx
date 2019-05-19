// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

type Props = {
  classes: any,
};

const Login = (props: Props) => {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Typography
        className={classes.title}
        align="center"
        variant="h3"
      >
        Login
      </Typography>
      <div id="firebaseui-auth-container" />
    </Paper>
  );
};

const styles = theme => ({
  root: {
    height: '100%',
  },
  title: {
    padding: theme.spacing.unit,
  },
});

export default withStyles(styles)(Login);
