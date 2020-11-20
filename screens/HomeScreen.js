/** @format */

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import LoginScreen from "./LoginScreen";
import HomeScreen_Header from "../components/misc/HomeScreen_Header";
import { storeUser, getUserInfo, logoutUser } from "../store/loginStore";
import Modal_UserSettings from "../components/misc/Modal_UserSettings";
import TripListing from "../components/trips/TripListing";

const HomeScreen = ({ navigation }) => {
  const [userInfo, set_userInfo] = useState(null);

  // Animate State Variables
  const homeScreen_opacity = useRef(new Animated.Value(1)).current;
  const modal_userSettings_yPos = useRef(new Animated.Value(3000)).current;

  function handleUserSettingsModal(action) {
    if (action === "OPEN") {
      Animated.timing(modal_userSettings_yPos, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(homeScreen_opacity, {
        toValue: 0.15,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else if (action === "CLOSE") {
      Animated.timing(modal_userSettings_yPos, {
        toValue: 3000,
        duration: 200,
        useNativeDriver: false,
      }).start();
      Animated.timing(homeScreen_opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else if (action === "LOGOUT") {
      Animated.timing(modal_userSettings_yPos, {
        toValue: 3000,
        duration: 200,
        useNativeDriver: false,
      }).start();
      Animated.timing(homeScreen_opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
      setTimeout(() => {
        logoutUser().then((update) => {
          getUserInfo().then((newInfo) => {
            set_userInfo((crr) => newInfo);
          });
        });
      }, 500);
    }
  }

  const handleLogIn = (userInfo) => {
    storeUser(userInfo).then((update) => {
      getUserInfo().then((newInfo) => {
        set_userInfo((crr) => newInfo);
      });
    });
  };

  useEffect(() => {
    getUserInfo().then((newInfo) => {
      set_userInfo((crr) => newInfo);
    });
  }, []);

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
          <Animated_HomeScreenView style={{ opacity: homeScreen_opacity }}>
            <HomeScreen_Header
              userInfo={userInfo}
              handleUserSettingsModal={handleUserSettingsModal}
            />
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ paddingBottom: 100 }}
            >
              <TripListing title="Colorado" colorID={1} />
              <TripListing title="Hawaii" colorID={2} />
              <TripListing title="Alaska" colorID={3} />
              <TripListing title="Philadelphia" colorID={4} />
              <TripListing title="Dallas" colorID={5} />
              <TripListing title="Utah" colorID={6} />
              <TripListing title="Arizona" colorID={7} />
              <TripListing title="Pittsburgh" colorID={8} />
              <TripListing title="Maine" colorID={9} />
              <EmptyListing />
            </ScrollView>

            <BtnView_Add>
              <TouchableOpacity>
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
              <TouchableOpacity>
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
  right: 30px;
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
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
`;

const BtnView_Delete = styled.View`
  /* opacity: 0.9; */
  position: absolute;
  bottom: 50px;
  right: 40px;
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
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
`;

const EmptyListing = styled.View`
  width: 100%;
  height: 200px;
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

// Icons8 Ref for "+" icon: <a href="https://icons8.com/icon/3220/plus">Plus icon by Icons8</a>
// Icons8 Ref for trash icon: <a href="https://icons8.com/icon/68064/trash">Trash icon by Icons8</a>
