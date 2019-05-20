// @flow
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import { withStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AppBar, Button, IconButton, Toolbar, Tooltip, Typography } from '@material-ui/core';

import { UserContext } from '../../context/user';

type Props = {
  classes: any,
};

const Header = (props: Props) => {
  const { classes } = props;
  const user = useContext(UserContext);

  const handleSignOut = () => {
    firebase.auth().signOut();
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          className={classes.grow}
          variant="title"
          color="inherit"
        >
          Retro
        </Typography>
        {user ? (
          <>
            <Typography variant="subtitle1" color="inherit">
              {user.displayName}
            </Typography>
            <Tooltip title="Sign Out">
              <IconButton color="inherit" onClick={handleSignOut}>
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Button component={Link} color="inherit" to="/sign-in">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

const styles = () => ({
  grow: {
    flexGrow: 1,
  },
});

export default withStyles(styles)(Header);
