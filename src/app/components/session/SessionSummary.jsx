// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import type { Session } from '../../types';
import Metrics from '../metrics/Metrics';

type Props = {
  metrics: any,
  session: Session,
}

const useStyles = makeStyles(() => ({
  root: {},
}));

const SessionSummary = (props: Props) => {
  const { metrics } = props;
  const classes = useStyles();

  return <Metrics data={metrics} />;
};

export default SessionSummary;
