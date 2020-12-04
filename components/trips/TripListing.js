/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";

const TripListing = ({ tripTitle, tripDate, tripBase, tripSecondary }) => {
  return (
    <TripListingView
      style={{
        shadowColor: tripBase,
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
      }}
    >
      <InnerView style={{ backgroundColor: tripBase }}>
        <LinearGradient
          colors={[tripBase, tripSecondary]}
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
          <DateText>{tripDate}</DateText>
        </TopRow>
        <BottomRow>
          <TitleText>{tripTitle}</TitleText>
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
