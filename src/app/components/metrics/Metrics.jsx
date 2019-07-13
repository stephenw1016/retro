// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import type { Session } from '../../types';

type Props = {
  session: Session,
}

const useStyles = makeStyles(() => ({
  root: {},
}));

const Metrics = (props: Props) => {
  const { session } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>{session && JSON.stringify(session, null, '  ')}</div>
  );
};

export default Metrics;
