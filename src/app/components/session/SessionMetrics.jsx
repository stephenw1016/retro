// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {},
}));

const SessionMetrics = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>Metrics</div>
  );
};

export default SessionMetrics;
