import React from 'react';
import * as firebase from 'firebase';

const firebaseConfig = {
  appId: process.env.APP_ID,
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  storageBucket: process.env.STORAGE_BUCKET,
};

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth;
  }
}

export const FirebaseContext = React.createContext(new Firebase());
