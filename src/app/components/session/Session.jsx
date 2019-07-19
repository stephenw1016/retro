// @flow
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, Toolbar, Typography } from '@material-ui/core';

import Vote from '../vote/Vote';
import SessionNotFound from './SessionNotFound';
import CategoryStepper from './CategoryStepper';
import { routes } from '../../constants';
import type { Session as SessionType } from '../../types';

type Props = {
  history: any,
  match: any,
  session: SessionType,
  submitVote: any,
};

const useStyles = makeStyles(theme => ({
  root: {
    // padding: theme.spacing(2),
  },
}));

const Session = (props: Props) => {
  const classes = useStyles();
  const { history, match: { params }, session, submitVote } = props;
  const [categoryIndex, setCategoryIndex] = useState(0);

  if (!session) {
    return <SessionNotFound sessionId={params.id} />;
  }

  const { id, categories, name, organization } = session;

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
    <Paper className={classes.root} square elevation={0}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6">Voting</Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="subtitle1">{`Session ID: ${id}`}</Typography>
          <Typography variant="subtitle1">{`Organization: ${organization}`}</Typography>
          <Typography variant="subtitle1">{`Progress: ${categoryIndex + 1} of ${categories.length}`}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CategoryStepper activeStep={categoryIndex} session={session} />
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
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Session;
