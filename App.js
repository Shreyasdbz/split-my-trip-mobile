/** @format */
// @refresh state

import React from "react";
import * as firebase from "firebase";
import "firebase/firestore";

import AppNavigator from "./controller/AppNavigator";

var firebaseConfig = {
  apiKey: "AIzaSyAi_Uixv3JUeBLI0uC9gcspuPfvGNUJwsY",
  authDomain: "split-my-trip.firebaseapp.com",
  databaseURL: "https://split-my-trip.firebaseio.com",
  projectId: "split-my-trip",
  storageBucket: "split-my-trip.appspot.com",
  messagingSenderId: "945902506805",
  appId: "1:945902506805:web:70334d5baa16bf4667327c",
  measurementId: "G-3LWTHGB014",
};

// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const getUser = async () => {
  return firebase
    .firestore()
    .collection("users")
    .doc("WKPvhu70NTSfzyEFn1A2")
    .get();
};

const App = () => {
  getUser().then((gUser) => {
    console.log(gUser);
  });
  return <AppNavigator></AppNavigator>;
};

export default App;
