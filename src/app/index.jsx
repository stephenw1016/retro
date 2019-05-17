import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import 'babel-polyfill';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Session from './components/session/Session';

const App = () => (
  <HashRouter>
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="title" color="inherit">
          Retro
        </Typography>
      </Toolbar>
    </AppBar>
    <Session name="Test Session" />
  </HashRouter>
);

render(<App />, document.getElementById('app'));
