/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";

import { getColorByID } from "../../store/colorStore";

const TripListing = ({ title, colorID }) => {
  const [_colorID, set__colorID] = useState(0);
  const [base, set_base] = useState("");
  const [secondary, set_secondary] = useState("");

  useEffect(() => {
    var color = getColorByID(colorID);
    set__colorID((crr) => color.id);
    set_base((crr) => color.base);
    set_secondary((crr) => color.secondary);
  }, []);

  return (
    <TripListingView
      style={{
        shadowColor: base,
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
      }}
    >
      <InnerView style={{ backgroundColor: base }}>
        <LinearGradient
          colors={[base, secondary]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 100,
          }}
          start={{ x: 0.25, y: 0 }}
          end={{ x: 2.75, y: 0 }}
        />
        <TopRow>
          <DateText>2020-11-14</DateText>
        </TopRow>
        <BottomRow>
          <TitleText>{title}</TitleText>
        </BottomRow>
      </InnerView>
    </TripListingView>
  );
};

export default TripListing;

const TripListingView = styled.View`
  width: 100%;
  margin-top: 15px;
  height: 100px;
  padding: 0px 10px;
`;

const InnerView = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 10px 20px;
  justify-content: space-around;
  overflow: hidden;
`;

const TopRow = styled.View`
  width: 100%;
  align-items: flex-end;
  justify-content: center;
`;

const DateText = styled.Text`
  font-weight: 800;
  opacity: 0.75;
  font-size: 18px;
  color: white;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
`;

const BottomRow = styled.View`
  width: 100%;
  align-items: flex-end;
  justify-content: center;
`;

const TitleText = styled.Text`
  font-weight: 800;
  font-size: 34px;
  color: white;
  text-transform: uppercase;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
`;
