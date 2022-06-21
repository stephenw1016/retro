// @flow
import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Paper, Toolbar, Typography } from '@material-ui/core';

import type { Session } from '../../types';
import Metrics from '../metrics/Metrics';
import SessionInfo from './SessionInfo';

type Props = {
  session: Session,
}

// const useStyles = makeStyles(theme => ({
//   root: {
//     padding: theme.spacing(2),
//   },
// }));

const SessionSummary = (props: Props) => {
  const { session } = props;
  // const classes = useStyles();

  return (
    <Paper square elevation={0}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6">Session Results</Typography>
        </Toolbar>
      </AppBar>
      <SessionInfo session={session} />
      <Metrics session={session} />
    </Paper>
  );
};

export default SessionSummary;
