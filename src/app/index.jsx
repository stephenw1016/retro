// @flow
import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import 'babel-polyfill';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './components/header/Header';
import Home from './components/home/Home';
import NewSessionForm from './components/session/NewSessionForm';
import Session from './components/session/Session';
import SignIn from './components/sign-in/SignIn';
import Firebase, { FirebaseContext } from './context/firebase-context';

const App = () => (
  <FirebaseContext.Provider value={new Firebase()}>
    <HashRouter>
      <CssBaseline />
      <Header />
      <Route path="/sign-in" exact component={SignIn} />
      <Route path="/home" exact component={Home} />
      <Route path="/sessions" exact component={Session} />
      <Route path="/new-session" exact component={NewSessionForm} />
    </HashRouter>
  </FirebaseContext.Provider>
);

render(<App />, document.getElementById('app'));
