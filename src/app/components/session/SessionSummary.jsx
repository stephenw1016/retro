// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Paper, Toolbar, Typography } from '@material-ui/core';
import type { Session } from '../../types';
import Metrics from '../metrics/Metrics';

type Props = {
  session: Session,
}

const useStyles = makeStyles(() => ({
  root: {},
}));

const SessionSummary = (props: Props) => {
  const { session } = props;
  const classes = useStyles();

  return (
    <Paper square elevation={0}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6">Summary</Typography>
        </Toolbar>
      </AppBar>
      <Typography variant="h4">
        {session.name}
      </Typography>
      <Typography variant="h6">
        {session.organization}
      </Typography>
      <Typography variant="h6">
        {session.date}
      </Typography>
      <Metrics session={session} />
    </Paper>
  );
};

export default SessionSummary;
