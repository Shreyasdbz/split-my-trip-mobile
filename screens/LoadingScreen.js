/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "firebase";

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("Login");
      }
    });
  }, []);

  return (
    <Loading>
      <Text>Loading ...</Text>
    </Loading>
  );
};

export default LoadingScreen;

const Loading = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;
