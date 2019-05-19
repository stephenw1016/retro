import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyASAcPifftsP0YjNYBoTKD1jTTEaVkEZ9Y',
  authDomain: 'retro-e3924.firebaseapp.com',
  databaseURL: 'https://retro-e3924.firebaseio.com',
  projectId: 'retro-e3924',
  storageBucket: 'retro-e3924.appspot.com',
  messagingSenderId: '49424125955',
  appId: '1:49424125955:web:4c30565b0c864698',
};

export const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/#/home>',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  tosUrl: '/#/tos',
  privacyPolicyUrl: () => {
    window.location.assign('/#/privacy-policy');
  },
};

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth();
