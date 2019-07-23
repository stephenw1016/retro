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

import CategoryTable from './CategoryTable';
import CenteredStackedBarChart from './CenteredStackedBarChart';
import GroupedBarChart from './GroupedBarChart';

type Props = {
  session: any,
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    margin: 0,
    width: '100%',
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

  const data = session.categories.map((category) => {
    const categoryVotes = Object.values(category.votes || {});
    const defaultCategoryMetric = { title: category.title, positive: 0, neutral: 0, negative: 0 };

    return categoryVotes.reduce((prev, vote, index, votes) => {
      const voteWeight = 100 / votes.length;
      const newValue = prev[vote.value] + voteWeight;
      return { ...prev, [vote.value]: newValue };
    }, defaultCategoryMetric);
  });

  const centeredStackedBarTooltip = (
    <Tooltip
      classes={{ tooltip: classes.tooltip }}
      title={(
        <>
          <Typography className={classes.tooltipTitle} variant="h6">
            What is a Centered Stacked Bar Chart?
          </Typography>
          <Typography>
            A bar chart which places the count or percentage in a typical bar chart format,
            but removes the neutral response category in order to juxtapose the right end of the negative
            category with the left end of the positive category. This creates a central line
            dividing positive from negative votes, highlighting any skew between.
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
          <Typography className={classes.tooltipTitle} variant="h6">
            What is a Grouped Bar Chart?
          </Typography>
          <Typography>
            For comparison across categories, it is useful to show several
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
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12} sm={4}>
        <Card className={classes.card} elevation={1}>
          <CardHeader
            {...cardHeaderProps}
            title="Positive/Negative"
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
            title="Category Totals"
            subheader="by percentage of votes"
            action={groupedBarTooltip}
          />
          <CardContent className={classes.cardContent}>
            <GroupedBarChart data={data} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card className={classes.card} elevation={1}>
          <CardHeader
            {...cardHeaderProps}
            title="Category Data"
            action={groupedBarTooltip}
          />
          <CardContent className={classes.cardContent}>
            <CategoryTable />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Metrics;
