// @flow
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const response = await fetch(endpoints.SESSIONS);
        const data = await response.json();

        if (!ignore) {
          setSession(data.find(({ id }) => id === match.params.id));
        }
      } catch (error) {
        console.error(error);
      }
    })();

    return () => { ignore = true; };
  }, []);

  console.log(session);
  // TODO get categories from session.

  return (
    <Paper className={classes.root} square elevation={0}>
      <Typography variant="h3">{name}</Typography>
      {[].map(category => <Vote key={category.title} category={category} />)}
    </Paper>
  );
};

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
});

export default withStyles(styles)(Session);
