/** @format */
import * as firebase from "firebase";
import "firebase/firestore";
import AsyncStorage from "@react-native-community/async-storage";

import { getUserInfo } from "./loginStore";

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

// ------------------------------------------------------------------------
// Initialize firebase
// ------------------------------------------------------------------------
export const initializeFirestore = () => {
  // Initialize Firebase
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};

// ------------------------------------------------------------------------
// Add user to 'users' collection if doesn't exist
// ------------------------------------------------------------------------
export const checkUserDB = (user) => {
  var userRef = firebase.firestore().collection("users").doc(user.id);
  try {
    var getUser = userRef.get().then((doc) => {
      if (!doc.exists) {
        // New User --- Add to DB
        firebase.firestore().collection("users").doc(user.id).set({
          name: user.name,
          email: user.email,
          photoSrc: user.photoSrc,
          loginType: user.loginType,
          tripData: "",
        });
      } else {
        // Existing User --- Update DB
        firebase.firestore().collection("users").doc(user.id).set({
          name: user.name,
          email: user.email,
          photoSrc: user.photoSrc,
          loginType: user.loginType,
        });
      }
    });
  } catch (err) {
    alert("LOGIN DATABASE ERROR");
  }

  return user;
};

// ------------------------------------------------------------------------
// Packup and send data to firestore
// ------------------------------------------------------------------------
export const packUpAndSend = async () => {
  const TRIPS_KEY = "@trips_list";

  var sendList = [];

  try {
    var tripsList = await AsyncStorage.getItem(TRIPS_KEY);
    if (tripsList === null) {
      // console.log("PackupSend -- tripsList null")
      return null;
    } else {
      tripsList = JSON.parse(tripsList);
      for (let t = 0; t < tripsList.length; t++) {
        //   For each trip, build out its data
        var tripData = {
          trip: tripsList[t],
          peopleList: [],
          activitiesList: [],
        };

        const PEOPLE_KEY = "@people_list@" + tripsList[t].id;
        var peopleList = await AsyncStorage.getItem(PEOPLE_KEY);
        if (peopleList !== null) {
          tripData.peopleList = JSON.parse(peopleList);
        }

        const ACTIVITY_KEY = "@activitiesList@" + tripsList[t].id;
        var activitiesList = await AsyncStorage.getItem(ACTIVITY_KEY);
        if (activitiesList !== null) {
          tripData.activitiesList = JSON.parse(activitiesList);
        }

        sendList.push(tripData);
      }
    }
  } catch (err) {
    console.log("PACKUP ERR: ", err);
  }

  //   Packup and send to db
  const sendData = JSON.stringify(sendList);
  getUserInfo().then((user) => {
    var userRef = firebase.firestore().collection("users").doc(user.id);
    try {
      var getUser = userRef.get().then((doc) => {
        if (!doc.exists) {
          console.log(
            "Incorrect user ID -- doc doesnt't exist to packup and send"
          );
        } else {
          firebase.firestore().collection("users").doc(user.id).set({
            name: user.name,
            email: user.email,
            photoSrc: user.photoSrc,
            loginType: user.loginType,
            tripData: sendData,
          });
        }
      });
    } catch (err) {
      console.log("PACKUP --  send ERR: ", err);
    }
  });
};
