// @flow
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

import Vote from '../vote/Vote';
import { endpoints } from '../../constants';

type Props = {
  classes: {},
  match: any,
  name: string,
};

const Session = (props: Props) => {
  const { classes, match, name } = props;
  const [session, setSession] = useState(null);
  const sessionId = match.params.id;

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const { data } = await axios(endpoints.SESSIONS);

        if (!ignore) {
          setSession(data.find(({ id }) => id === sessionId));
        }
      } catch (error) {
        console.error(error);
      }
    })();

    return () => { ignore = true; };
  }, [sessionId]);

  return (
    session && (
      <Paper className={classes.root} square elevation={0}>
        <Typography variant="h3">{name}</Typography>
        {[].map(category => <Vote key={category.id} category={category} />)}
      </Paper>
    )
  );
};

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
});

export default withStyles(styles)(Session);
