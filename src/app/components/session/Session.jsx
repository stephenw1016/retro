// @flow
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Button, Divider, Grid, Paper, Toolbar, Typography } from '@material-ui/core';

import Vote from '../vote/Vote';
import SessionNotFound from './SessionNotFound';
import CategoryStepper from './CategoryStepper';
import { routes } from '../../constants';
import type { Session as SessionType } from '../../types';
import SessionInfo from './SessionInfo';

type Props = {
  history: any,
  match: any,
  session: SessionType,
  submitVote: any,
};

const useStyles = makeStyles(theme => ({
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
  const classes = useStyles();
  const { history, match: { params }, session, submitVote } = props;
  const [categoryIndex, setCategoryIndex] = useState(0);

  if (!session) {
    return <SessionNotFound sessionId={params.id} />;
  }

  const { categories } = session;

  const handleGoBack = () => {
    setCategoryIndex(categoryIndex - 1);
  };

  const handleSubmitVote = (vote) => {
    const { id: categoryId } = categories[categoryIndex];
    submitVote(session.id, categoryId, vote);

    const votingNotDone = categoryIndex !== categories.length - 1;
    if (votingNotDone) {
      setCategoryIndex(categoryIndex + 1);
    } else {
      console.log('DONE:', session);
      history.push(`${routes.SESSION_SUMMARY}/${session.id}`);
    }
  };

  const category = categories[categoryIndex];

  return (
    <Paper square elevation={0}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6">Voting</Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SessionInfo session={session} />
          <CategoryStepper activeStep={categoryIndex} session={session} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box p={8}>
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
          <div className={classes.voteContainer}>
            <Vote
              key={category.id}
              category={category}
              onSubmit={handleSubmitVote}
            />
            <Button
              className={classes.button}
              color="secondary"
              disabled={!categoryIndex}
              onClick={handleGoBack}
            >
              Go Back
            </Button>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Session;
