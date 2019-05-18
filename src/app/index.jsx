// @flow
import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Link } from 'react-router-dom';
import 'babel-polyfill';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Home from './components/home/Home';
import Login from './components/login/Login';
import Session from './components/session/Session';
import SignUp from './components/signup/SignUp';

type Props = {
  classes: any,
};

const App = (props: Props) => {
  const { classes } = props;

  return (
    <HashRouter>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography
            className={classes.grow}
            variant="title"
            color="inherit"
          >
            Retro
          </Typography>
          <Button component={Link} color="inherit" to="/login">Login</Button>
          <Button component={Link} color="inherit" to="/signup">Sign Up</Button>
        </Toolbar>
      </AppBar>
      <Route path="/" exact component={Login} />
      <Route path="/home" exact component={Home} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/sessions" exact component={Session} />
    </HashRouter>
  );
};

const styles = () => ({
  grow: {
    flexGrow: 1,
  },
});

const App1 = withStyles(styles)(App);
render(<App1 />, document.getElementById('app'));
