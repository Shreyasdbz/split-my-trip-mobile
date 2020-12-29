/** @format */

import React from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";

import { deleteAllData } from "../store/loginStore";
import {
  handleLoginWithGoogle,
  handleLoginWithOffline,
} from "../store/cloudStore";

const windowHeight = Dimensions.get("window").height;

const LoginScreen = ({ loginAction }) => {
  const handleLoginAction = (action) => {
    if (action === "GOOGLE") {
      handleLoginWithGoogle().then(() => {
        loginAction(action);
      });
    } else if (action === "OFFLINE") {
      handleLoginWithOffline();
      loginAction(action);
    }
  };

  return (
    <LoginView>
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
                  uri: "https://img.icons8.com/color/96/000000/google-logo.png",
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
        <TouchableOpacity onPress={deleteAllData}>
          <InfoText>i</InfoText>
        </TouchableOpacity>
      </InfoView>
    </LoginView>
  );
};

export default LoginScreen;

const LoginView = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
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

// Google Icon: <a href="https://icons8.com/icon/17949/google">Google icon by Icons8</a>
// Apple Icon: <a href="https://icons8.com/icon/w3W3iUSJe7St/apple-logo">Apple Logo icon by Icons8</a>
// Offline Cloud Icon: <a href="https://icons8.com/icon/103222/unavailable-cloud">Unavailable Cloud icon by Icons8</a>
