/** @format */

import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreenHeader = ({ userInfo, handleUserSettingsModal }) => {
  return (
    <Container>
      <LinearGradient
        colors={["#F08080", "#FFD687"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 140,
        }}
        start={{ x: 0.25, y: 0 }}
        end={{ x: 2.5, y: 0 }}
      />
      <TopRow>
        <CaptionText>$PLIT MY TRIP</CaptionText>
      </TopRow>
      <BottomRow>
        <TitleTextView>
          <TitleText>My Trips</TitleText>
        </TitleTextView>
        <UserIconView>
          <TouchableOpacity onPress={() => handleUserSettingsModal("OPEN")}>
            <UserIconWrapper>
              <UserIcon
                source={{
                  uri: userInfo.photoSrc,
                }}
              />
            </UserIconWrapper>
          </TouchableOpacity>
        </UserIconView>
      </BottomRow>
    </Container>
  );
};

export default HomeScreenHeader;

const Container = styled.View`
  height: 140px;
  width: 100%;
  justify-content: flex-end;
  background-color: lightcoral;
  box-shadow: 0px 5px 15px rgba(240, 128, 128, 0.5);
`;

const TopRow = styled.View`
  padding: 0px 20px;
`;

const CaptionText = styled.Text`
  font-weight: 700;
  opacity: 0.5;
  font-size: 18px;
`;

const BottomRow = styled.View`
  width: 100%;
  padding: 0px 20px;
  flex-direction: row;
  padding-bottom: 5px;
`;

const TitleTextView = styled.View`
  width: 80%;
  align-items: flex-start;
  justify-content: center;
`;

const TitleText = styled.Text`
  font-size: 42px;
  color: white;
  font-weight: 800;
  padding: 5px 0px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
`;

const UserIconView = styled.View`
  width: 20%;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 10px;
`;

const UserIconWrapper = styled.View`
  border: 4px solid rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
`;

const UserIcon = styled.Image`
  height: 35px;
  width: 35px;
  border-radius: 30px;
`;
