// @flow
import React, { lazy } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import 'babel-polyfill';
import CssBaseline from '@material-ui/core/CssBaseline';

import AuthorizedRoute from './components/routing/AuthorizedRoute';
import Header from './components/header/Header';
import { routes } from './constants';
import store from './state';

const UserProfile = lazy(() => import('./components/user-profile/UserProfile'));
const Home = lazy(() => import('./components/home/Home'));
const NewSessionForm = lazy(() => import('./components/session/NewSessionFormContainer'));
const Session = lazy(() => import('./components/session/SessionContainer'));
const SessionSummary = lazy(() => import('./components/session/SessionSummaryContainer'));
const SignIn = lazy(() => import('./components/sign-in/SignIn'));

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <CssBaseline />
      <Header />
      <AuthorizedRoute path="/" exact component={Home} />
      <Route path={routes.SIGN_IN} exact component={SignIn} />
      <AuthorizedRoute path={routes.HOME} exact component={Home} />
      <AuthorizedRoute path={routes.SESSION_BY_ID} exact component={Session} />
      <AuthorizedRoute path={routes.SESSION_SUMMARY_BY_ID} exact component={SessionSummary} />
      <AuthorizedRoute path={routes.NEW_SESSION} exact component={NewSessionForm} />
      <AuthorizedRoute path={routes.USER_PROFILE} exact component={UserProfile} />
    </HashRouter>
  </Provider>
);

render(<App />, document.getElementById('app'));
