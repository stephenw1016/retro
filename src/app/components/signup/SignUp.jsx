// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

type Props = {
  classes: any,
};

const SignUp = (props: Props) => {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      Sign Up Page
    </Paper>
  );
};

const styles = () => ({
  root: {},
});

export default withStyles(styles)(SignUp);
