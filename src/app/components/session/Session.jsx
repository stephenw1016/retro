// @flow
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper, Typography } from '@material-ui/core';

import Vote from '../vote/Vote';
import { Session as SessionType } from '../../types';
import SessionNotFound from './SessionNotFound';

type Props = {
  classes: any,
  match: any,
  session: SessionType,
  submitVote: any,
};

const Session = (props: Props) => {
  const { classes, match: { params }, session, submitVote } = props;
  const [categoryIndex, setCategoryIndex] = useState(0);

  if (!session) {
    return <SessionNotFound sessionId={params.id} />;
  }

  const handleGoBack = () => {
    setCategoryIndex(categoryIndex - 1);
  };

  const handleSubmitVote = (vote) => {
    const { id: categoryId } = session.categories[categoryIndex];
    submitVote(session.id, categoryId, vote);

    const votingNotDone = categoryIndex !== session.categories.length - 1;
    if (votingNotDone) {
      setCategoryIndex(categoryIndex + 1);
    }
  };

  const category = session.categories[categoryIndex];

  return (
    <Paper className={classes.root} square elevation={0}>
      <Typography variant="title">{session.name}</Typography>
      <Typography variant="subtitle1">
        Session ID:
        {session.id}
      </Typography>
      <Grid
        alignItems="center"
        container
        direction="column"
      >
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
    </Paper>
  );
};

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
});
export default withStyles(styles)(Session);
