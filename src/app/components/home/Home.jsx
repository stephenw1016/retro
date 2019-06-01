// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Button, Paper } from '@material-ui/core';

import { routes } from '../../constants';

type Props = {
  classes: any,
};

const Home = (props: Props) => {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Button
        className={classes.linkButton}
        color="secondary"
        component={Link}
        size="large"
        to={routes.NEW_SESSION}
        variant="contained"
      >
        New Session
      </Button>
      <Button
        className={classes.linkButton}
        color="secondary"
        component={Link}
        size="large"
        to={routes.SESSIONS}
        variant="contained"
      >
        Join Session
      </Button>
    </Paper>
  );
};

const styles = theme => ({
  root: {},
  linkButton: {
    margin: theme.spacing.unit,
  },
});

export default withStyles(styles)(Home);
