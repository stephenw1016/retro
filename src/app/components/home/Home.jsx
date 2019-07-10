// @flow
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Button, Paper } from '@material-ui/core';

import JoinSessionDialog from '../session/JoinSessionDialog';
import { routes } from '../../constants';

type Props = {
  history: any,
};

const useStyles = makeStyles(theme => ({
  root: {},
  linkButton: {
    margin: theme.spacing(1),
  },
}));

const Home = (props: Props) => {
  const { history } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleJoinDialogOpen = () => {
    setOpen(true);
  };

  const handleJoinDialogClose = () => {
    setOpen(false);
  };

  const handleJoinDialogSubmit = (sessionId) => {
    history.push(`${routes.SESSION}/${sessionId}`);
  };

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
        Start a new Session
      </Button>
      <Button
        className={classes.linkButton}
        color="secondary"
        size="large"
        variant="contained"
        onClick={handleJoinDialogOpen}
      >
        Join an existing Session
      </Button>
      <JoinSessionDialog
        open={open}
        onClose={handleJoinDialogClose}
        onSubmit={handleJoinDialogSubmit}
      />
    </Paper>
  );
};

export default Home;
