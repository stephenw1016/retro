// @flow
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';

import { firebaseAuth, uiConfig } from '../../../firebase';

type Props = {
  classes: any,
};

const SignIn = (props: Props) => {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Grid container alignContent="center" justify="center">
        <Grid item xs={12} sm={6}>
          <Typography
            className={classes.title}
            align="center"
            variant="h3"
          >
            Sign in
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
        </Grid>
      </Grid>
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

export default withStyles(styles)(SignIn);
