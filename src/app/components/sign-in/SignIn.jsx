// @flow
import React, { useContext } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';

import { FirebaseContext } from '../../context/FirebaseContext';
import { routes } from '../../constants';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
  title: {
    padding: theme.spacing(1),
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);

  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: `/#${routes.HOME}`,
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    tosUrl: `/#${routes.TERMS_OF_SERVICE}`,
    privacyPolicyUrl: () => {
      window.location.assign(`/#${routes.PRIVACY_POLICY}`);
    },
  };

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
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SignIn;
