// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';

import GroupedBarChart from './GroupedBarChart';
import CenteredStackedBarChart from './CenteredStackedBarChart';

type Props = {
  session: any,
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
  },
  card: {},
  cardContent: {
    borderTop: '1px solid #ddd',
    height: 300,
  },
  title: {
    fontSize: 16,
  },
  tooltip: {
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[2],
    color: 'rgba(0, 0, 0, 0.87)',
    padding: theme.spacing(2),
  },
  tooltipTitle: {
    marginBottom: theme.spacing(1),
  },
}));

const Metrics = (props: Props) => {
  const { session } = props;
  const classes = useStyles();
  const cardHeaderProps = {
    subheaderTypographyProps: { variant: 'subtitle2' },
    titleTypographyProps: { variant: 'h6' },
  };

  const data = session.categories.map(category => category.votes.reduce((prev, vote, index, votes) => {
    const voteWeight = 100 / votes.length;
    const newValue = prev[vote.value] + voteWeight;
    return { ...prev, [vote.value]: newValue };
  }, { title: category.title, positive: 0, neutral: 0, negative: 0 }));

  const centeredStackedBarTooltip = (
    <Tooltip
      classes={{ tooltip: classes.tooltip }}
      title={(
        <>
          <Typography className={classes.tooltipTitle} color="primary">
            What is a Centered Stacked Bar Chart?
          </Typography>
          <Typography>
            A bar chart which places the count or percentage in a typical bar chart format,
            but removes the neutral response category in order to place the right end of the negative
            category subdivision at the same position of the left end of the positive category subdivision.
            This creates a central line dividing positive from negative votes, allowing for the skew
            between them to be seen more easily.
          </Typography>
        </>
      )}
    >
      <IconButton disableRipple aria-label="info">
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );

  const groupedBarTooltip = (
    <Tooltip
      classes={{ tooltip: classes.tooltip }}
      title={(
        <>
          <Typography className={classes.tooltipTitle} color="primary">
            What is a Grouped Bar Chart?
          </Typography>
          <Typography>
            For comparison across categories, it is sometimes useful to show several
            votes in the same bar chart by placing different colored bars side by side,
            with each color corresponding to a different sentiment.
          </Typography>
        </>
      )}
    >
      <IconButton disableRipple aria-label="info">
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );

  return (
    <Grid container className={classes.root} spacing={1}>
      <Grid item xs={12} sm={4}>
        <Card className={classes.card} elevation={1}>
          <CardHeader
            {...cardHeaderProps}
            title="Centered Stacked Bar"
            subheader="by percentage of votes"
            action={centeredStackedBarTooltip}
          />
          <CardContent className={classes.cardContent}>
            <CenteredStackedBarChart data={data} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Card className={classes.card} elevation={1}>
          <CardHeader
            {...cardHeaderProps}
            title="Grouped Bar"
            subheader="by percentage of votes"
            action={groupedBarTooltip}
          />
          <CardContent className={classes.cardContent}>
            <GroupedBarChart data={data} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Metrics;
