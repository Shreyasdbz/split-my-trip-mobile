/** @format */

import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Dimensions, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";

import {
  handleLoginWithGoogle,
  handleLoginWithOffline,
} from "../store/cloudStore";
import Modal_AppInfo from "../components/misc/Modal_AppInfo";

const windowHeight = Dimensions.get("window").height;

const LoginScreen = ({ loginAction }) => {
  const [infoModal_active, set_infoModal_active] = useState(false);
  const loginScreen_opacity = useRef(new Animated.Value(1)).current;
  const modal_appInfo_yPos = useRef(new Animated.Value(3000)).current;

  const handleLoginAction = (action) => {
    if (action === "GOOGLE") {
      handleLoginWithGoogle(loginAction);
    } else if (action === "OFFLINE") {
      handleLoginWithOffline();
      loginAction(action);
    }
  };

  const handleAppInfoModal = (action) => {
    if (action === "OPEN") {
      Animated.timing(modal_appInfo_yPos, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(loginScreen_opacity, {
        toValue: 0.15,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else if (action === "CLOSE") {
      Animated.timing(loginScreen_opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();

      Animated.timing(modal_appInfo_yPos, {
        toValue: 3000,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <Container>
      <Animated_Modal_AppInfo_View style={{ top: modal_appInfo_yPos }}>
        <Modal_AppInfo handleAppInfoModal={handleAppInfoModal} />
      </Animated_Modal_AppInfo_View>

      <Animated_LoginView style={{ opacity: loginScreen_opacity }}>
        <LinearGradient
          colors={["#F08080", "#FFD687"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: windowHeight,
          }}
        />
        <HeadingView>
          <Heading>
            <HeadingLine>$PLIT</HeadingLine>
            <HeadingLine>MY</HeadingLine>
            <HeadingLine>TRIP</HeadingLine>
          </Heading>
        </HeadingView>
        <ButtonsView>
          <TouchableOpacity onPress={() => handleLoginAction("GOOGLE")}>
            <Button>
              <LoginTextView>
                <LoginText>Login with Google</LoginText>
              </LoginTextView>
              <LoginLogoView>
                <LoginLogo
                  source={{
                    uri:
                      "https://img.icons8.com/color/96/000000/google-logo.png",
                  }}
                ></LoginLogo>
              </LoginLogoView>
            </Button>
          </TouchableOpacity>
          {/* <TouchableOpacity>
          <Button>
            <LoginTextView>
              <LoginText>Login with Apple</LoginText>
            </LoginTextView>
            <LoginLogoView>
              <LoginLogo
                source={{
                  uri:
                    "https://img.icons8.com/fluent-systems-filled/96/000000/mac-os.png",
                }}
              ></LoginLogo>
            </LoginLogoView>
          </Button>
        </TouchableOpacity> */}
          <TouchableOpacity onPress={() => handleLoginAction("OFFLINE")}>
            <Button>
              <LoginTextView>
                <LoginText>Use Offline</LoginText>
              </LoginTextView>
              <LoginLogoView>
                <LoginLogo
                  source={{
                    uri:
                      "https://img.icons8.com/material-sharp/96/000000/unavailable-cloud.png",
                  }}
                ></LoginLogo>
              </LoginLogoView>
            </Button>
          </TouchableOpacity>
        </ButtonsView>
        <InfoView>
          <TouchableOpacity onPress={() => handleAppInfoModal("OPEN")}>
            <InfoText>i</InfoText>
          </TouchableOpacity>
        </InfoView>
      </Animated_LoginView>
    </Container>
  );
};

export default LoginScreen;

const Container = styled.View`
  flex: 1;
`;

const LoginView = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Animated_LoginView = Animated.createAnimatedComponent(LoginView);

const HeadingView = styled.View`
  align-items: flex-start;
  margin-top: 50px;
`;

const Heading = styled.View``;

const HeadingLine = styled.Text`
  font-size: 50px;
  font-weight: 900;
  color: white;
  margin-bottom: 10px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
`;

const ButtonsView = styled.View`
  margin-top: 30px;
  width: 100%;
  padding-left: 15%;
  padding-right: 15%;
`;

const Button = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
`;

const LoginTextView = styled.View`
  width: 70%;
`;

const LoginLogoView = styled.View``;

const LoginText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
`;

const LoginLogo = styled.Image`
  border-radius: 100px;
  height: 30px;
  width: 30px;
  /* box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25); */
`;

const InfoView = styled.View`
  position: absolute;
  bottom: 50px;
`;

const InfoText = styled.Text`
  opacity: 0.35;
  border-radius: 20px;
  padding: 10px 17px;
  border: 1px solid black;
  font-weight: 600;
`;

const Modal_AppInfo_View = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
`;
const Animated_Modal_AppInfo_View = Animated.createAnimatedComponent(
  Modal_AppInfo_View
);

// Google Icon: <a href="https://icons8.com/icon/17949/google">Google icon by Icons8</a>
// Apple Icon: <a href="https://icons8.com/icon/w3W3iUSJe7St/apple-logo">Apple Logo icon by Icons8</a>
// Offline Cloud Icon: <a href="https://icons8.com/icon/103222/unavailable-cloud">Unavailable Cloud icon by Icons8</a>
