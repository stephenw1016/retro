// @flow
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
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

import { useAuth } from '../../hooks/useAuth';
import { FirebaseContext } from '../../context/FirebaseContext';
import { routes } from '../../constants';

const useStyles = makeStyles((theme) => {
  const avatarSize = 35;

  return {
    avatar: {
      cursor: 'pointer',
      marginLeft: theme.spacing(2),
      height: avatarSize,
      width: avatarSize,
    },
    branding: {
      flexGrow: 1,
      textDecoration: 'none',
    },
    userName: {
      cursor: 'pointer',
    },
  };
});

const Header = () => {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useAuth();

  const handleAvatarClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    firebase.auth().signOut();
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          className={classes.branding}
          color="inherit"
          variant="h6"
          component={Link}
          to={routes.HOME}
        >
          Team Health Check
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
              <MenuItem onClick={handleMenuClose} component={Link} to={routes.USER_PROFILE}>
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
        ) : <Button component={Link} color="inherit" to={routes.SIGN_IN}>Sign In</Button>}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
