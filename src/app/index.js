import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Vote } from './components/vote';

const App = () => (
  <HashRouter>
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="title" color="inherit">
          Retro
        </Typography>
      </Toolbar>
    </AppBar>
    <Vote />
  </HashRouter>
);

render(<App />, document.getElementById('app'));
