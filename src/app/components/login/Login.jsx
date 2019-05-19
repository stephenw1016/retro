// @flow
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

import { firebaseAuth, uiConfig } from '../../../firebase';

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
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
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
