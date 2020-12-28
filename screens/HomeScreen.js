/** @format */

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Animated, Keyboard } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import LoginScreen from "./LoginScreen";
import HomeScreenHeader from "../components/misc/HomeScreenHeader";
import Modal_UserSettings from "../components/misc/Modal_UserSettings";
import TripListing from "../components/trips/TripListing";
import Modal_NewTrip from "../components/trips/Modal_NewTrip";
import Modal_DeleteTrips from "../components/trips/Modal_DeleteTrips";

import {
  storeUser,
  getUserInfo,
  logoutUser,
  deleteAllData,
} from "../store/loginStore";
import { getTrips, addTrip, removeTrips } from "../store/tripStore";
import { packFirestore, unpackFirestore } from "../store/cloudStore";
import { getColorBase, getColorSecondary } from "../store/colorStore";

const HomeScreen = ({ navigation }) => {
  const [userInfo, set_userInfo] = useState(null);
  const [tripsList, set_tripsList] = useState(null);

  // Animate State Variables
  const [newTripModal_visible, set_newTripModal_visible] = useState(false);
  const homeScreen_opacity = useRef(new Animated.Value(1)).current;
  const modal_userSettings_yPos = useRef(new Animated.Value(-3000)).current;
  const modal_newTrip_yPos = useRef(new Animated.Value(3000)).current;
  const modal_deleteTrips_yPos = useRef(new Animated.Value(3000)).current;

  function animateHomeScreen(action) {
    if (action === "OPEN") {
      Animated.timing(homeScreen_opacity, {
        toValue: 0.15,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else if (action === "CLOSE") {
      Animated.timing(homeScreen_opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }

  function handleUserSettingsModal(action) {
    if (action === "OPEN") {
      Animated.timing(modal_userSettings_yPos, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      animateHomeScreen("OPEN");
    } else if (action === "CLOSE") {
      Animated.timing(modal_userSettings_yPos, {
        toValue: -3000,
        duration: 200,
        useNativeDriver: false,
      }).start();
      animateHomeScreen("CLOSE");
    } else if (action === "LOGOUT") {
      Animated.timing(modal_userSettings_yPos, {
        toValue: -3000,
        duration: 200,
        useNativeDriver: false,
      }).start();
      animateHomeScreen("CLOSE");
      setTimeout(() => {
        logoutUser().then((update) => {
          getUserInfo().then((newInfo) => {
            set_userInfo((crr) => newInfo);
            deleteAllData().then((update) => {
              //
            });
          });
        });
      }, 500);
    }
  }

  const handleNewTripModal = (action, newTripName) => {
    if (action === "OPEN") {
      set_newTripModal_visible((crr) => true);
      Animated.timing(modal_newTrip_yPos, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      animateHomeScreen("OPEN");
    } else if (action === "CLOSE") {
      Keyboard.dismiss();
      Animated.timing(modal_newTrip_yPos, {
        toValue: 3000,
        duration: 200,
        useNativeDriver: false,
      }).start();
      animateHomeScreen("CLOSE");
      setTimeout(() => {
        set_newTripModal_visible((crr) => false);
      }, 500);
    } else if (action === "SAVE") {
      // Store trip
      Keyboard.dismiss();
      addTrip(newTripName).then((update) => {
        getTrips().then((newTrips) => {
          set_tripsList((crr) => newTrips);
        });
        packFirestore().then((cloudUpload) => {
          // console.log("Data uploaded to cloud")
        });
      });
      Animated.timing(modal_newTrip_yPos, {
        toValue: 3000,
        duration: 200,
        useNativeDriver: false,
      }).start();
      animateHomeScreen("CLOSE");
      setTimeout(() => {
        set_newTripModal_visible((crr) => false);
      }, 500);
    }
  };

  const handleDeleteTripsModal = (action) => {
    if (action === "OPEN") {
      if (tripsList !== null) {
        Animated.timing(modal_deleteTrips_yPos, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
        animateHomeScreen("OPEN");
      }
    } else if (action === "CLOSE") {
      Animated.timing(modal_deleteTrips_yPos, {
        toValue: 3000,
        duration: 200,
        useNativeDriver: false,
      }).start();
      animateHomeScreen("CLOSE");
    } else if (action === "DELETE") {
      // delete all trips
      removeTrips().then((update) => {
        set_tripsList((crr) => null);
        packFirestore().then((cloudUpload) => {
          // console.log("Data uploaded to cloud")
        });
      });
      Animated.timing(modal_deleteTrips_yPos, {
        toValue: 3000,
        duration: 200,
        useNativeDriver: false,
      }).start();
      animateHomeScreen("CLOSE");
    }
  };

  const handleLogIn = (userInfo) => {
    storeUser(userInfo).then((update) => {
      getUserInfo().then((newInfo) => {
        unpackFirestore(newInfo.id);
        set_userInfo((crr) => newInfo);
      });
    });
  };

  var _subscribe = navigation.addListener("didFocus", () => {
    // The screen is focused
    // Call any action
    getTrips().then((newTrips) => {
      set_tripsList(newTrips);
    });
    _subscribe.remove();
  });

  useEffect(
    () => {
      // Setup user
      getUserInfo().then((newInfo) => {
        set_userInfo((crr) => newInfo);
        unpackFirestore(newInfo.id);
        // Setup trips
        getTrips().then((newTrips) => {
          set_tripsList((crr) => newTrips);
        });
      });
    },
    [],
    [tripsList]
  );

  return (
    <RootView>
      <StatusBar style="light" />

      {userInfo === null ? (
        <LoginScreen handleLogIn={handleLogIn} />
      ) : (
        <Container>
          <Animated_Modal_UserSettings_View
            style={{ top: modal_userSettings_yPos }}
          >
            <Modal_UserSettings
              userInfo={userInfo}
              handleUserSettingsModal={handleUserSettingsModal}
            />
          </Animated_Modal_UserSettings_View>

          <Animated_Modal_NewTrip_View style={{ top: modal_newTrip_yPos }}>
            {newTripModal_visible === true ? (
              <Modal_NewTrip handleNewTripModal={handleNewTripModal} />
            ) : (
              <></>
            )}
          </Animated_Modal_NewTrip_View>

          <Animated_Modal_DeleteTrips_View
            style={{ top: modal_deleteTrips_yPos }}
          >
            <Modal_DeleteTrips
              handleDeleteTripsModal={handleDeleteTripsModal}
            />
          </Animated_Modal_DeleteTrips_View>

          <Animated_HomeScreenView style={{ opacity: homeScreen_opacity }}>
            <HomeScreenHeader
              userInfo={userInfo}
              handleUserSettingsModal={handleUserSettingsModal}
            />
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ paddingBottom: 100 }}
            >
              {tripsList === null ? (
                <AddListing>
                  <EmptyListingText>To add a new trip</EmptyListingText>
                  <EmptyListingText>tap the + icon</EmptyListingText>
                  <EmptyListingText>in the bottom right.</EmptyListingText>
                </AddListing>
              ) : (
                <>
                  {Object.entries(tripsList).map((trip) => {
                    return (
                      <TouchableOpacity
                        key={trip[1].id}
                        onPress={() =>
                          navigation.navigate("Trip", {
                            trip: trip[1],
                          })
                        }
                      >
                        <TripListing
                          tripTitle={trip[1].title}
                          tripDate={trip[1].date}
                          tripBase={getColorBase(trip[1].colorID)}
                          tripSecondary={getColorSecondary(trip[1].colorID)}
                        />
                      </TouchableOpacity>
                    );
                  })}
                  <EmptyListing />
                </>
              )}
            </ScrollView>

            <BtnView_Add>
              <TouchableOpacity onPress={() => handleNewTripModal("OPEN")}>
                <BtnBg_Add>
                  <LinearGradient
                    colors={["#F08080", "#FFD687"]}
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: 0,
                      height: 100,
                    }}
                    start={{ x: 0.25, y: 0 }}
                    end={{ x: 2.5, y: 0 }}
                  />
                  <BtnLogo_Add
                    source={{
                      uri: "https://img.icons8.com/android/240/000000/plus.png",
                    }}
                  />
                </BtnBg_Add>
              </TouchableOpacity>
            </BtnView_Add>
            <BtnView_Delete>
              <TouchableOpacity onPress={() => handleDeleteTripsModal("OPEN")}>
                <BtnBg_Delete>
                  <LinearGradient
                    colors={["#76E4FC", "#FFFB94"]}
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: 0,
                      height: 100,
                    }}
                    start={{ x: 0.25, y: 0 }}
                    end={{ x: 2.5, y: 0 }}
                  />
                  <BtnLogo_Delete
                    source={{
                      uri:
                        "https://img.icons8.com/ios-glyphs/192/000000/trash--v1.png",
                    }}
                  />
                </BtnBg_Delete>
              </TouchableOpacity>
            </BtnView_Delete>
          </Animated_HomeScreenView>
        </Container>
      )}
    </RootView>
  );
};

export default HomeScreen;

const RootView = styled.View`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
`;

const HomeScreenView = styled.View`
  height: 100%;
  width: 100%;
`;
const Animated_HomeScreenView = Animated.createAnimatedComponent(
  HomeScreenView
);

const BtnView_Add = styled.View`
  /* opacity: 0.9; */
  position: absolute;
  bottom: 125px;
  right: 20px;
  box-shadow: 0px 5px 15px rgba(237, 106, 94, 0.5);
`;

const BtnBg_Add = styled.View`
  border-radius: 50px;
  padding: 10px;
  overflow: hidden;
`;

const BtnLogo_Add = styled.Image`
  height: 50px;
  width: 50px;
  opacity: 0.75;
  /* box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25); */
  border-radius: 50px;
`;

const BtnView_Delete = styled.View`
  /* opacity: 0.9; */
  position: absolute;
  bottom: 50px;
  right: 30px;
  box-shadow: 0px 5px 15px rgba(118, 228, 252, 0.5);
`;

const BtnBg_Delete = styled.View`
  border-radius: 50px;
  padding: 10px;
  overflow: hidden;
`;

const BtnLogo_Delete = styled.Image`
  height: 30px;
  width: 30px;
  opacity: 0.75;
  /* box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25); */
  border-radius: 50px;
`;

const EmptyListing = styled.View`
  width: 100%;
  height: 200px;
  padding: 40px 50px;
  align-items: center;
  justify-content: flex-start;
`;

const AddListing = styled.View`
  width: 100%;
  height: 200px;
  padding: 40px 50px;
  align-items: center;
  justify-content: flex-start;
`;
const EmptyListingText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  opacity: 0.3;
  margin: 2px 0px;
`;

const Modal_UserSettings_View = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
`;
const Animated_Modal_UserSettings_View = Animated.createAnimatedComponent(
  Modal_UserSettings_View
);

const Modal_NewTrip_View = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
`;
const Animated_Modal_NewTrip_View = Animated.createAnimatedComponent(
  Modal_NewTrip_View
);

const Modal_DeleteTrips_View = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
`;
const Animated_Modal_DeleteTrips_View = Animated.createAnimatedComponent(
  Modal_DeleteTrips_View
);

// Icons8 Ref for "+" icon: <a href="https://icons8.com/icon/3220/plus">Plus icon by Icons8</a>
// Icons8 Ref for trash icon: <a href="https://icons8.com/icon/68064/trash">Trash icon by Icons8</a>
