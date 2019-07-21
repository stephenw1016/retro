// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, Typography } from '@material-ui/core';

import { routes } from '../../constants';

type Props = {
  sessionId: string,
};

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  id: {
    fontWeight: 'bold',
  },
  linkButton: {
    margin: theme.spacing(1),
  },
}));

const SessionNotFound = (props: Props) => {
  const { sessionId } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.root} square elevation={0}>
      <Typography variant="h6">
        No session with an ID of
        <span className={classes.id}>{` ${sessionId} `}</span>
        exists.
      </Typography>
      <Typography variant="subtitle1">
        Would you like to start a new session?
      </Typography>
      <Button
        className={classes.linkButton}
        color="primary"
        component={Link}
        to={routes.NEW_SESSION}
        variant="contained"
      >
        Start a new Session
      </Button>
    </Paper>
  );
};

export default SessionNotFound;
