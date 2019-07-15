// @flow
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, LinearProgress, Paper, Typography } from '@material-ui/core';

import Vote from '../vote/Vote';
import { useSession } from '../../hooks/useSessions';
import SessionNotFound from './SessionNotFound';
import { routes } from '../../constants';

type Props = {
  history: any,
  match: any,
  submitVote: any,
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  progressRoot: {
    height: 8,
    width: 200,
  },
}));

const Session = (props: Props) => {
  const classes = useStyles();
  const { history, match: { params }, submitVote } = props;
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [session] = useSession(params.id);

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
  const normalise = value => (value) * 100 / (categories.length);

  return (
    <Paper className={classes.root} square elevation={0}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="subtitle1">{`Session ID: ${id}`}</Typography>
          <Typography variant="subtitle1">{`Organization: ${organization}`}</Typography>
          <Typography variant="subtitle1">{`Progress: ${categoryIndex + 1} of ${categories.length}`}</Typography>
          <LinearProgress
            classes={{ root: classes.progressRoot }}
            className={classes.progress}
            color="secondary"
            variant="determinate"
            value={normalise(categoryIndex + 1)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
