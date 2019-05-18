// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

type Props = {
  classes: any,
};

const Login = (props: Props) => {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      Login Page
    </Paper>
  );
};

const styles = () => ({
  root: {},
});

export default withStyles(styles)(Login);
