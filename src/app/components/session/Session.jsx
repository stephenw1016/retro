// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Button, Divider, Grid, Paper, Toolbar, Typography } from '@material-ui/core';

import CategoryStepper from './CategoryStepper';
import SessionInfo from './SessionInfo';
import SessionNotFound from './SessionNotFound';
import Vote from '../vote/Vote';
import { routes } from '../../constants';
import type { Session as SessionType } from '../../types';

type Props = {
  history: any,
  match: any,
  nextCategory: any,
  previousCategory: any,
  session: SessionType,
  submitVote: any,
  user: any,
};

const useStyles = makeStyles(theme => ({
  categoryContent: {
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  question: {
    marginBottom: theme.spacing(1),
  },
  voteContainer: {
    margin: '0 auto',
    maxWidth: 500,
  },
}));

const Session = (props: Props) => {
  const {
    user: { uid }, history, match: { params }, nextCategory,
    previousCategory, session, submitVote,
  } = props;

  const participantCount = 1;

  if (!session) {
    return <SessionNotFound sessionId={params.id} />;
  }

  if (session.isComplete) {
    history.push(`${routes.SESSION_SUMMARY}/${session.id}`);
  }

  const classes = useStyles();
  const { categoryIndex, categories } = session;
  const category = categories[categoryIndex];
  const hasAllVotes = Object.values(category.votes || {}).length === participantCount;
  const isLastCategory = categoryIndex === categories.length - 1;
  const currentVote = (category.votes || {})[uid];

  const handleSubmitVote = (vote) => {
    const { id: categoryId } = categories[categoryIndex];
    submitVote(uid, categoryId, vote);
  };

  const handleViewResults = () => {
    history.push(`${routes.SESSION_SUMMARY}/${session.id}`);
  };

  return (
    <Paper square elevation={0}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6">Voting</Typography>
        </Toolbar>
      </AppBar>
      <SessionInfo session={session} />
      <CategoryStepper activeStep={categoryIndex} session={session} />
      <Grid container className={classes.categoryContent}>
        <Grid item xs={12} sm={6}>
          <Box p={3}>
            <Typography variant="h6" className={classes.question} color="textPrimary">
              Which sentiment to you most agree with?
            </Typography>
            <Typography variant="subtitle1">Positive</Typography>
            <Typography>{category.description.positive}</Typography>
            <Divider className={classes.divider} component="hr" light />
            <Typography variant="subtitle1">Negative</Typography>
            <Typography>{category.description.negative}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box p={3}>
            <Vote
              key={category.id}
              category={category}
              vote={currentVote}
              onSubmit={handleSubmitVote}
            />
          </Box>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" p={3}>
        <Button
          className={classes.button}
          color="secondary"
          disabled={!categoryIndex}
          onClick={previousCategory}
        >
          Go Back
        </Button>
        <Button
          className={classes.button}
          color="primary"
          onClick={isLastCategory ? handleViewResults : nextCategory}
          disabled={!hasAllVotes}
          variant="contained"
        >
          {isLastCategory ? 'View Results' : 'Next Category'}
        </Button>
      </Box>
    </Paper>
  );
};

export default Session;
