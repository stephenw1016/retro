// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import 'babel-polyfill';
import CssBaseline from '@material-ui/core/CssBaseline';

import AuthorizedRoute from './components/routing/AuthorizedRoute';
import Header from './components/header/Header';
import Home from './components/home/Home';
import NewSessionForm from './components/session/NewSessionFormContainer';
import Session from './components/session/SessionContainer';
import SignIn from './components/sign-in/SignIn';
import UserProfile from './components/user-profile/UserProfile';
import { routes } from './constants';
import { store } from './state';

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <CssBaseline />
      <Header />
      <AuthorizedRoute path="/" exact component={Home} />
      <Route path={routes.SIGN_IN} exact component={SignIn} />
      <AuthorizedRoute path={routes.HOME} exact component={Home} />
      <AuthorizedRoute path={routes.SESSIONS} exact component={Session} />
      <AuthorizedRoute path={routes.NEW_SESSION} exact component={NewSessionForm} />
      <AuthorizedRoute path={routes.USER_PROFILE} exact component={UserProfile} />
    </HashRouter>
  </Provider>
);

render(<App />, document.getElementById('app'));
