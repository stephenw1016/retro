// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
} from '@material-ui/core';

import type { Session } from '../../types';
import PyramidChart from './PyramidChart';

type Props = {
  metrics: any,
  session: Session,
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
  },
  card: {
    width: 300,
  },
  cardContent: {
    borderTop: '1px solid #ddd',
    height: 300,
    width: 300,
  },
  title: {
    fontSize: 16,
  },
}));

const Metrics = (props: Props) => {
  const { metrics, session } = props;
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={1}>
      <Grid item>
        <Card className={classes.card} elevation={1}>
          <CardHeader title="Pyramid Chart" />
          <CardContent className={classes.cardContent}>
            <PyramidChart data={metrics} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card className={classes.card} elevation={1}>
          <CardHeader title="Pyramid Chart" />
          <CardContent className={classes.cardContent}>
            <PyramidChart data={metrics} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Metrics;
