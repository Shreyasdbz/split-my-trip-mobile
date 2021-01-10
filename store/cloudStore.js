/** @format */
import AsyncStorage from "@react-native-community/async-storage";
import NetInfo from "@react-native-community/netinfo";
import * as Google from "expo-google-app-auth";
import * as firebase from "firebase";
import "firebase/firestore";

import { getUserInfo, storeUser } from "./loginStore";
import { setTripStore } from "./tripStore";
import { setPeopleStore } from "./peopleStore";
import { setActivityStore } from "./activityStore";
import { firebaseConfig } from "./firebaseStore";

// ------------------------------------------------------------------------
// Initialize firebase
// ------------------------------------------------------------------------
export const initializeFirestore = () => {
  // Initialize Firebase
  NetInfo.fetch().then((connection) => {
    if (connection.isConnected) {
      if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
      }
    }
  });
};

// ------------------------------------------------------------------------
// Add user to 'users' collection if doesn't exist
// ------------------------------------------------------------------------
export const checkUserDB = (user) => {
  initializeFirestore();
  NetInfo.fetch().then((connection) => {
    if (connection.isConnected) {
      // Signed in
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.id)
        .catch(function (loginError) {
          alert("Login Error: ", loginError);
        })
        .then((userCred) => {
          var userRef = firebase
            .firestore()
            .collection("users")
            .doc(user.firebaseID);
          try {
            var getUser = userRef
              .get()
              .then((doc) => {
                if (!doc.exists) {
                  // New User --- Add to DB
                  firebase
                    .firestore()
                    .collection("users")
                    .doc(user.firebaseID)
                    .set({
                      name: user.name,
                      email: user.email,
                      photoSrc: user.photoSrc,
                      loginType: user.loginType,
                      tripData: "[]",
                    });
                } else {
                  // Existing User --- Update DB
                  firebase
                    .firestore()
                    .collection("users")
                    .doc(user.firebaseID)
                    .set(
                      {
                        name: user.name,
                        email: user.email,
                        photoSrc: user.photoSrc,
                        loginType: user.loginType,
                      },
                      { merge: true }
                    );
                }
              })
              .catch(function (dbError) {
                console.log("cloudStore Database Error: Code: ", dbError.code);
                console.log(
                  "cloudStore Database Error: Message: ",
                  dbError.message
                );
              });
          } catch (err) {
            alert("LOGIN DATABASE ERROR: ", err);
          }
        });
    }
  });
};

// ------------------------------------------------------------------------
// Log in with Google Auth (WebView)
// ------------------------------------------------------------------------
export const handleLoginWithGoogle = async (loginAction) => {
  initializeFirestore();
  try {
    const { type, accessToken, user } = await Google.logInAsync(firebaseConfig);

    if (type === "success") {
      let userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const googleUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        photoSrc: user.photoUrl,
        loginType: "GOOGLE",
        firebaseID: "",
      };
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.id)
        .catch(function (signInError) {
          //
          // New User -- create new account
          if (signInError.code === "auth/user-not-found") {
            //
            firebase
              .auth()
              .createUserWithEmailAndPassword(user.email, user.id)
              .catch(function (signUpError) {
                alert("SignUp Error: ", signUpError);
              })
              .then((userCredential_signUp) => {
                // User is now signed up --
                googleUser.firebaseID = userCredential_signUp.user.uid;
                checkUserDB(googleUser);
                storeUser(googleUser).then(() => {
                  getUserInfo().then((newInfo) => {
                    unpackFirestore(newInfo);
                    loginAction("GOOGLE");
                  });
                });
              });
          }
        })
        .then((userCredential_signIn) => {
          // User is now signed in --
          try {
            googleUser.firebaseID = userCredential_signIn.user.uid;
            checkUserDB(googleUser);
            storeUser(googleUser).then(() => {
              getUserInfo().then((newInfo) => {
                unpackFirestore(newInfo);
                loginAction("GOOGLE");
              });
            });
          } catch (userCredSignInError) {
            // ####### TODO: Fix ############
            // Happnens when user is signing up
            // ##############################
            console.log("userCredSignInError: -- ", userCredSignInError);
          }
        });
    } else {
      alert("Could not log in with Google");
    }
  } catch ({ message }) {
    alert("Google Login Error: " + message);
  }
};

// ------------------------------------------------------------------------
// Log in as Offline user
// ------------------------------------------------------------------------
export const handleLoginWithOffline = () => {
  const offlineUser = {
    id: 0,
    name: "",
    email: "~Offline~",
    photoSrc: "https://img.icons8.com/ios-glyphs/96/000000/person-male.png",
    loginType: "OFFLINE",
  };
  storeUser(offlineUser).then(() => {});
};

// ------------------------------------------------------------------------
// Unpack data from firestore
// ------------------------------------------------------------------------
export const unpackFirestore = async (inputUser) => {
  initializeFirestore();
  NetInfo.fetch().then((connection) => {
    if (connection.isConnected) {
      // Online -- fetch data
      // signed in
      if (inputUser.loginType !== "OFFLINE") {
        firebase
          .auth()
          .signInWithEmailAndPassword(inputUser.email, inputUser.id)
          .catch(function (signInError) {
            console.log("Unpack Firestore sign in error: ", signInError);
          })
          .then(() => {
            //
            var userRef = firebase
              .firestore()
              .collection("users")
              .doc(inputUser.firebaseID);
            try {
              var getUser = userRef
                .get()
                .catch(function (getDataError) {
                  console.log("UNPACK DATABASE GET DATA ERROR: ", getDataError);
                })
                .then((doc) => {
                  try {
                    var data = JSON.parse(doc.data().tripData);
                    const tripsList = [];
                    for (let i = 0; i < data.length; i++) {
                      tripsList.push(data[i].trip);
                      setPeopleStore(
                        data[i].trip.id,
                        data[i].peopleList
                      ).then(() => {});
                      setActivityStore(
                        data[i].trip.id,
                        data[i].activitiesList
                      ).then(() => {});
                    }
                    setTripStore(tripsList).then(() => {});
                  } catch (parseError) {
                    console.log("unpack parse error: ", parseError);
                  }
                });
            } catch (err) {
              console.log("UNPACK DATABASE ERROR: ", err);
            }
          });
      }
    } else {
      // Offline -- can't fetch data
    }
  });
};

// ------------------------------------------------------------------------
// Packup and send data to firestore
//
// Will be called at:
//
// addTrip          -- HomeScreen
// editTrip         -- TripScreen
// removeTrip       -- TripScreen
// deleteAllTrips   -- HomeScreen
//
// addPerson        -- TripScreen
// editPerson       -- TripScreen
// removePerson     -- TripScreen
//
// addActivity      -- TripScreen
// editActivity     -- TripScreen
// removeActivity   -- TripScreen
// ------------------------------------------------------------------------
export const packFirestore = async () => {
  if (user !== null) {
    try {
      const USER_KEY = "@user_";

      var user = await AsyncStorage.getItem(USER_KEY);

      if (user !== null) {
        user = JSON.parse(user);
        if (user.loginType !== "OFFLINE") {
          initializeFirestore();

          const TRIPS_KEY = "@trips_list";

          var sendList = [];

          try {
            var tripsList = await AsyncStorage.getItem(TRIPS_KEY);
            if (tripsList === null) {
              tripsList = [];
              // console.log("PackupSend -- tripsList null")
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

          NetInfo.fetch().then((connection) => {
            if (connection.isConnected) {
              //   Packup and send to db
              firebase
                .auth()
                .signInWithEmailAndPassword(user.email, user.id)
                .then(() => {
                  // signed in
                  const sendData = JSON.stringify(sendList);
                  getUserInfo().then((user) => {
                    var userRef = firebase
                      .firestore()
                      .collection("users")
                      .doc(user.firebaseID);
                    try {
                      var getUser = userRef.get().then((doc) => {
                        if (!doc.exists) {
                          console.log(
                            "Incorrect user ID -- doc doesnt't exist to packup and send"
                          );
                        } else {
                          firebase
                            .firestore()
                            .collection("users")
                            .doc(user.firebaseID)
                            .set({
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
                });
            }
          });
        }
      }
    } catch (getUserErr) {
      console.log("packFireStore() -- getUSerErr: ", getUserInfo);
    }
  }
};
