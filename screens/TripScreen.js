/** @format */

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Animated } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import TripScreenHeader from "../components/trips/TripScreenHeader";
import Modal_EditTrip from "../components/trips/Modal_EditTrip";
import PersonListing from "../components/people/PersonListing";
import ActivityListing from "../components/activities/ActivityListing";

import { getColorByID } from "../store/colorStore";
import { editTrip } from "../store/tripStore";

const TripScreen = ({ navigation }) => {
  const [trip, set_trip] = useState(navigation.state.params.trip);
  const [title, set_title] = useState(navigation.state.params.trip.title);
  const [date, set_date] = useState(navigation.state.params.trip.date);
  const [colorID, set_colorID] = useState(navigation.state.params.trip.colorID);
  const [colorBase, set_colorBase] = useState("");
  const [colorSecondary, set_colorSecondary] = useState("");

  // Modal Active States
  const [editTripModal_active, set_editTripModal_active] = useState(false);

  // Animate State Variables
  const tripScreen_opacity = useRef(new Animated.Value(1)).current;
  const modal_editTrip_yPos = useRef(new Animated.Value(-3000)).current;

  function animateTripScreen(action) {
    if (action === "OPEN") {
      Animated.timing(tripScreen_opacity, {
        toValue: 0.15,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else if (action === "CLOSE") {
      Animated.timing(tripScreen_opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }

  const handleEditTripModal = (
    action,
    input_title,
    input_date,
    input_colorID
  ) => {
    if (action === "OPEN") {
      set_editTripModal_active((crr) => true);
      Animated.timing(modal_editTrip_yPos, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      animateTripScreen("OPEN");
      //
    } else if (action === "CLOSE") {
      Animated.timing(modal_editTrip_yPos, {
        toValue: -3000,
        duration: 200,
        useNativeDriver: false,
      }).start();
      animateTripScreen("CLOSE");
      set_editTripModal_active((crr) => false);
      //
    } else if (action === "DELETE") {
      Animated.timing(modal_editTrip_yPos, {
        toValue: -3000,
        duration: 200,
        useNativeDriver: false,
      }).start();
      animateTripScreen("CLOSE");
      set_editTripModal_active((crr) => false);
      //
    } else if (action === "SAVE") {
      // Save Stuff in
      editTrip(trip.id, input_title, input_date, input_colorID);
      // Change current stuff
      set_title((crr) => input_title);
      set_date((crr) => input_date);
      set_colorID((crr) => input_colorID);
      getGradient();
      Animated.timing(modal_editTrip_yPos, {
        toValue: -3000,
        duration: 200,
        useNativeDriver: false,
      }).start();
      animateTripScreen("CLOSE");
      set_editTripModal_active((crr) => false);
    }
  };

  function getGradient() {
    var color = getColorByID(colorID);
    set_colorBase((crr) => color.base);
    set_colorSecondary((crr) => color.secondary);
  }

  useEffect(() => {
    getGradient();
  }, []);

  return (
    <Trip>
      <Animated_Modal_EditTrip_View style={{ top: modal_editTrip_yPos }}>
        {editTripModal_active === true ? (
          <Modal_EditTrip
            handleEditTripModal={handleEditTripModal}
            trip={trip}
          />
        ) : (
          <></>
        )}
      </Animated_Modal_EditTrip_View>

      {/*  Trip View ------------------------ BEGIN ------------------------  */}
      <Animated_TripView style={{ opacity: tripScreen_opacity }}>
        <TripScreenHeader
          title={title}
          colorBase={colorBase}
          colorSecondary={colorSecondary}
          goHome={() => navigation.navigate("Home")}
          handleEditTripModal={handleEditTripModal}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* People Section ------------------------ BEGIN */}
          <PeopleSection>
            <TitleRow>
              <TitleView>
                <TitleText>People</TitleText>
              </TitleView>
              <TitleBtnView>
                <TouchableOpacity>
                  <TitleBtnTextWrapper>
                    <TitleBtnText>+ ADD</TitleBtnText>
                  </TitleBtnTextWrapper>
                </TouchableOpacity>
              </TitleBtnView>
            </TitleRow>
            <PeopleListView>
              <ScrollView
                style={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 20 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <TouchableOpacity>
                  <PersonListing name="Shreyas" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <PersonListing name="Soham" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <PersonListing name="Abhishek" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <PersonListing name="Gaurav" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <PersonListing name="Vaibhav" />
                </TouchableOpacity>
              </ScrollView>
            </PeopleListView>
            {/* People Section ------------------------ BEGIN */}
            {/* Activity Section ------------------------ BEGIN */}
          </PeopleSection>
          <ActivitySection>
            <TitleRow>
              <TitleView>
                <TitleText>Activities</TitleText>
              </TitleView>
              <TitleBtnView>
                <TouchableOpacity>
                  <TitleBtnTextWrapper>
                    <TitleBtnText>+ ADD</TitleBtnText>
                  </TitleBtnTextWrapper>
                </TouchableOpacity>
              </TitleBtnView>
            </TitleRow>
            <ActivityListView>
              <TouchableOpacity>
                <ActivityListing
                  colorBase={colorBase}
                  colorSecondary={colorSecondary}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <ActivityListing
                  colorBase={colorBase}
                  colorSecondary={colorSecondary}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <ActivityListing
                  colorBase={colorBase}
                  colorSecondary={colorSecondary}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <ActivityListing
                  colorBase={colorBase}
                  colorSecondary={colorSecondary}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <ActivityListing
                  colorBase={colorBase}
                  colorSecondary={colorSecondary}
                />
              </TouchableOpacity>
              <EmptyActivityListing />
            </ActivityListView>
          </ActivitySection>
          {/* Activity Section ------------------------ END */}
        </ScrollView>
        <ComputeBtnView>
          <TouchableOpacity>
            <ComputeBtnWrapper>
              <ComputeBtnWrapperInner>
                <ComputeBtnText>Calculate Split</ComputeBtnText>
              </ComputeBtnWrapperInner>
            </ComputeBtnWrapper>
          </TouchableOpacity>
        </ComputeBtnView>
      </Animated_TripView>
    </Trip>
  );
};

export default TripScreen;

const Trip = styled.View`
  flex: 1;
`;

const TripView = styled.View`
  height: 100%;
  width: 100%;
  flex: 1;
`;
const Animated_TripView = Animated.createAnimatedComponent(TripView);

const TitleRow = styled.View`
  width: 100%;
  flex-direction: row;
  height: 70px;
  padding: 0px 20px;
`;

const TitleView = styled.View`
  align-items: flex-start;
  justify-content: center;
  width: 50%;
  height: 100%;
  padding-top: 20px;
`;

const TitleText = styled.Text`
  font-size: 28px;
  font-weight: 700;
`;

const TitleBtnView = styled.View`
  padding-top: 20px;
  justify-content: center;
  align-items: flex-end;
  width: 50%;
  height: 100%;
`;

const TitleBtnTextWrapper = styled.View`
  opacity: 0.75;
  padding: 5px 10px;
  border-radius: 20px;
  background-color: #d0d0d0;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
  border: 2px solid rgba(0, 0, 0, 0.015);
`;

const TitleBtnText = styled.Text`
  font-size: 18px;
  font-weight: 800;
  opacity: 0.75;
`;

const PeopleSection = styled.View`
  width: 100%;
  /* border: 1px solid black; */
`;

const PeopleListView = styled.View`
  width: 100%;
`;

const ActivitySection = styled.View`
  width: 100%;
`;

const ActivityListView = styled.View`
  padding: 20px 20px;
`;

const EmptyActivityListing = styled.View`
  width: 100%;
  height: 90px;
`;

const ComputeBtnView = styled.View`
  width: 100%;
  position: absolute;
  bottom: 50px;
  /* bottom: 200px; */
  align-items: center;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
`;

const ComputeBtnWrapper = styled.View`
  padding: 10px 20px;
  border-radius: 20px;
  overflow: hidden;
  background-color: white;
`;

const ComputeBtnWrapperInner = styled.View`
  width: 100%;
`;

const ComputeBtnText = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: black;
  opacity: 0.7;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.125);
`;

// --------------- Modals ------------------------------------------------------------

const Modal_EditTrip_View = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
`;
const Animated_Modal_EditTrip_View = Animated.createAnimatedComponent(
  Modal_EditTrip_View
);
