// @flow
import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Avatar,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SignOutIcon from '@material-ui/icons/ExitToApp';

import { FirebaseContext } from '../../context/firebase-context';

type Props = {
  classes: any,
};

const Header = (props: Props) => {
  const { classes } = props;

  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSignedOut, setIsSignedOut] = useState(false);

  useEffect(() => {
    const authListener = firebase.auth().onAuthStateChanged((userChange) => {
      console.log('setting user:', user);
      setUser(userChange);
    });

    return authListener;
  }, [user]);

  const handleAvatarClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    firebase.auth().signOut();
    setAnchorEl(null);
    setIsSignedOut(true);
  };

  if (isSignedOut) {
    return <Redirect to="/sign-in" />;
  }

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography className={classes.grow} variant="title" color="inherit">
          Retro
        </Typography>
        {user ? (
          <>
            <Typography
              className={classes.userName}
              variant="subtitle1"
              color="inherit"
              onClick={handleAvatarClick}
            >
              {user.displayName}
            </Typography>
            <Avatar
              className={classes.avatar}
              alt={user.displayName}
              src={user.photoURL}
              aria-owns={anchorEl ? 'user-menu' : undefined}
              aria-haspopup="true"
              onClick={handleAvatarClick}
            />
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose} component={Link} to="/sessions">
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </MenuItem>
              <MenuItem onClick={handleSignOut}>
                <ListItemIcon>
                  <SignOutIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Out" />
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button component={Link} color="inherit" to="/sign-in">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

const styles = (theme) => {
  const avatarSize = 35;

  return {
    avatar: {
      cursor: 'pointer',
      marginLeft: theme.spacing.unit * 2,
      height: avatarSize,
      width: avatarSize,
    },
    grow: {
      flexGrow: 1,
    },
    userName: {
      cursor: 'pointer',
    },
  };
};

export default withStyles(styles)(Header);
