// @flow
import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase';
import { render } from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import 'babel-polyfill';
import CssBaseline from '@material-ui/core/CssBaseline';

import { UserContext } from './context/user';
import Header from './components/header/Header';
import Home from './components/home/Home';
import NewSessionForm from './components/session/NewSessionForm';
import Session from './components/session/Session';
import SignIn from './components/sign-in/SignIn';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authListener = firebase.auth().onAuthStateChanged((userChange) => {
      console.log('setting user:', user);
      setUser(userChange);
    });

    return authListener;
  }, [user]);

  return (
    <UserContext.Provider value={user}>
      <HashRouter>
        <CssBaseline />
        <Header />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/home" exact component={Home} />
        <Route path="/sessions" exact component={Session} />
        <Route path="/new-session" exact component={NewSessionForm} />
      </HashRouter>
    </UserContext.Provider>
  );
};

render(<App />, document.getElementById('app'));
