/** @format */

import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";

const TripScreenHeader = ({
  title,
  colorBase,
  colorSecondary,
  goHome,
  handleEditTripModal,
}) => {
  return (
    <Container
      style={{
        shadowColor: colorBase,
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
      }}
    >
      <LinearGradient
        colors={[colorBase, colorSecondary]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 120,
        }}
        start={{ x: 0.25, y: 0 }}
        end={{ x: 2.5, y: 0 }}
      />
      <Header>
        <BackButtonView>
          <TouchableOpacity onPress={goHome}>
            <BackBtn
              source={{
                uri:
                  "https://img.icons8.com/android/96/000000/circled-left-2.png",
              }}
            />
          </TouchableOpacity>
        </BackButtonView>
        <TitleView>
          <TouchableOpacity onPress={() => handleEditTripModal("OPEN")}>
            <TitleText>{title}</TitleText>
          </TouchableOpacity>
        </TitleView>
      </Header>
    </Container>
  );
};

export default TripScreenHeader;

const Container = styled.View`
  width: 100%;
  height: 120px;
`;

const Header = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: flex-end;
  flex-direction: row;
  padding: 25px 20px;
`;

const BackButtonView = styled.View`
  height: 100%;
  align-items: flex-start;
  justify-content: flex-end;
  width: 30%;
  /* border: 1px solid black; */
`;

const BackBtn = styled.Image`
  height: 40px;
  width: 40px;
  opacity: 0.75;
  border-radius: 50px;
`;

const TitleView = styled.View`
  height: 100%;
  align-items: flex-end;
  justify-content: flex-end;
  width: 70%;
  /* border: 1px solid black; */
`;

const TitleText = styled.Text`
  font-size: 34px;
  font-weight: 800;
  color: white;
  text-transform: uppercase;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
`;

// Icons8 ref for back arrow logo: <a href="https://icons8.com/icon/70778/back-arrow">Back Arrow icon by Icons8</a>
