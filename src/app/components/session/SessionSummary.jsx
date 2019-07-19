// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';
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
    <div>
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
    </div>
  );
};

export default SessionSummary;
