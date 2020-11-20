/** @format */

import React from "react";
// import firebase from "firebase";

import AppNavigator from "./controller/AppNavigator";

// const firebaseConfig = {
//   apiKey: `AIzaSyAi_Uixv3JUeBLI0uC9gcspuPfvGNUJwsY`,
//   authDomain: `split-my-trip.firebaseapp.com`,
//   databaseURL: `https://split-my-trip.firebaseio.com`,
//   projectId: `split-my-trip`,
//   storageBucket: `split-my-trip.appspot.com`,
//   messagingSenderId: `945902506805`,
//   appId: `1:945902506805:web:70334d5baa16bf4667327c`,
//   measurementId: `G-3LWTHGB014`,
// };
// if (firebase.apps.length === 0) {
//   firebase.initializeApp(firebaseConfig);
// }
const App = () => {
  return <AppNavigator></AppNavigator>;
};

export default App;
