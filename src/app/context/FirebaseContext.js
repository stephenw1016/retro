import React from 'react';
import * as fb from 'firebase';

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
    fb.initializeApp(firebaseConfig);
    this.auth = fb.auth;
    this.db = fb.firestore();
  }
}

export const firebase = new Firebase();

export const FirebaseContext = React.createContext(firebase);
