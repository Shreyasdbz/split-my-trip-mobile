/** @format */

import React from "react";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;

const ActivityListing = ({ colorBase, colorSecondary }) => {
  return (
    <ActivityView
      style={{
        shadowColor: colorBase,
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
      }}
    >
      <Box>
        <LinearGradient
          colors={[colorBase, colorSecondary]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: windowHeight,
          }}
          start={{ x: 0.25, y: 0 }}
          end={{ x: 2.75, y: -0.5 }}
        />
        <Header>
          <TopRow>
            <TitleView>
              <TitleText>AirBnB</TitleText>
            </TitleView>
            <CostView>
              <CostTextWrapper>
                <CostText>$450</CostText>
              </CostTextWrapper>
            </CostView>
          </TopRow>
          <BottomRow>
            <PayerLabelText>Paid by: </PayerLabelText>
            <PayerNameText>Abhishek</PayerNameText>
          </BottomRow>
        </Header>
        <Attendance>
          <AttendanceList>
            <AttendeeText>Shreyas</AttendeeText>
            <AttendeeText>Abhishek</AttendeeText>
            <AttendeeText>Gaurav</AttendeeText>
          </AttendanceList>
        </Attendance>
      </Box>
    </ActivityView>
  );
};

export default ActivityListing;

const ActivityView = styled.View`
  width: 100%;
`;

const Box = styled.View`
  border-radius: 8px;
  margin-bottom: 15px;
  padding: 20px 10px;
  overflow: hidden;
  width: 100%;
`;

const Header = styled.View`
  width: 100%;
`;

const TopRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
`;

const TitleView = styled.View`
  height: 100%;
  width: 75%;
  justify-content: center;
`;

const TitleText = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: white;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
`;

const CostView = styled.View`
  height: 100%;
  justify-content: center;
`;

const CostTextWrapper = styled.View`
  background-color: white;
  border-radius: 50px;
  padding: 5px 10px;
`;

const CostText = styled.Text`
  font-weight: 700;
  font-size: 18px;
`;

const BottomRow = styled.View`
  width: 100%;
  /* border: 1px solid black; */
  flex-direction: row;
  height: 30px;
  align-items: center;
  padding: 0px 5px;
`;

const PayerLabelText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: black;
  opacity: 0.5;
`;

const PayerNameText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: black;
  opacity: 0.75;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
`;

const Attendance = styled.View`
  padding: 0px 5px;
`;

const AttendanceList = styled.View``;

const AttendeeText = styled.Text`
  font-size: 22px;
  color: white;
  font-weight: 600;
  padding: 3px 0px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
`;
