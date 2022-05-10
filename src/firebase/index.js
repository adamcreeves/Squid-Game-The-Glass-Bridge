import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdmG_oYg6d7ba7KUSiapJjfweAoexInwg",
  authDomain: "squid-game-bd099.firebaseapp.com",
  projectId: "squid-game-bd099",
  storageBucket: "squid-game-bd099.appspot.com",
  messagingSenderId: "928483326466",
  appId: "1:928483326466:web:2777ff54db67d95981c51b",
  measurementId: "G-12L313ZNZX",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

export const db = app.firestore();
