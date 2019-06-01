// @flow
import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import 'babel-polyfill';
import CssBaseline from '@material-ui/core/CssBaseline';

import AuthorizedRoute from './components/routing/AuthorizedRoute';
import Header from './components/header/Header';
import Home from './components/home/Home';
import NewSessionForm from './components/session/NewSessionForm';
import Session from './components/session/Session';
import SignIn from './components/sign-in/SignIn';
import UserProfile from './components/user-profile/UserProfile';
import { routes } from './constants';

const App = () => (
  <HashRouter>
    <CssBaseline />
    <Header />
    <Route path={routes.SIGN_IN} exact component={SignIn} />
    <AuthorizedRoute path={routes.HOME} exact component={Home} />
    <AuthorizedRoute path={routes.SESSIONS} exact component={Session} />
    <AuthorizedRoute path={routes.NEW_SESSION} exact component={NewSessionForm} />
    <AuthorizedRoute path={routes.USER_PROFILE} exact component={UserProfile} />
  </HashRouter>
);

render(<App />, document.getElementById('app'));
