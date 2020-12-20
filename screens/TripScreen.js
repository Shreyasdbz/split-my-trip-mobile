/** @format */

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Animated } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import TripScreenHeader from "../components/trips/TripScreenHeader";
import Modal_EditTrip from "../components/trips/Modal_EditTrip";
import PersonListing from "../components/people/PersonListing";
import ActivityListing from "../components/activities/ActivityListing";
import Modal_AddPerson from "../components/people/Modal_AddPerson";
import Modal_EditPerson from "../components/people/Modal_EditPerson";
import Modal_AddActivity from "../components/activities/Modal_AddActivity";
import Modal_EditActivity from "../components/activities/Modal_EditActivity";
import Modal_Splits from "../components/split/Modal_Splits";

import {
  getColorByID,
  getColorBase,
  getColorSecondary,
} from "../store/colorStore";
import { editTrip, removeTrip } from "../store/tripStore";
import {
  getPeople,
  addPerson,
  editPerson,
  removePerson,
  getPersonName,
} from "../store/peopleStore";
import {
  addActivity,
  getActivities,
  removeActivity,
} from "../store/activityStore";
import {
  build_peopleList_newActivity,
  build_peopleList_editActivity,
} from "../helpers/listProcessors";

const TripScreen = ({ navigation }) => {
  const [trip, set_trip] = useState(navigation.state.params.trip);
  const [title, set_title] = useState(navigation.state.params.trip.title);
  const [date, set_date] = useState(navigation.state.params.trip.date);
  const [colorID, set_colorID] = useState(navigation.state.params.trip.colorID);
  const [colorBase, set_colorBase] = useState("");
  const [colorSecondary, set_colorSecondary] = useState("");

  const [peopleList, set_peopleList] = useState(null);
  const [currentPersonEdit, set_currentPersonEdit] = useState(null);

  const [activitiesList, set_activitiesList] = useState(null);
  const [peopleList_newActivity, set_peopleList_newActivity] = useState(null);
  const [peopleList_editActivity, set_peopleList_editActivity] = useState(null);
  const [currentEditActivity, set_currentEditActivity] = useState(null);

  // Modal Active States
  const [editTripModal_active, set_editTripModal_active] = useState(false);
  const [addPersonModal_active, set_addPersonModal_active] = useState(false);
  const [editPersonModal_active, set_editPersonModal_active] = useState(false);
  const [addActivityModal_active, set_addActivityModal_active] = useState(
    false
  );
  const [editActivityModal_active, set_editActivityModal_active] = useState(
    false
  );
  const [splitsModal_active, set_splitsModal_active] = useState(false);

  // Animate State Variables
  const tripScreen_opacity = useRef(new Animated.Value(1)).current;
  const modal_editTrip_yPos = useRef(new Animated.Value(-3000)).current;
  const modal_addPerson_yPos = useRef(new Animated.Value(3000)).current;
  const modal_editPerson_yPos = useRef(new Animated.Value(3000)).current;
  const modal_addActivity_yPos = useRef(new Animated.Value(3000)).current;
  const modal_editActivity_yPos = useRef(new Animated.Value(3000)).current;
  const modal_splits_yPos = useRef(new Animated.Value(3000)).current;

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

  // ----
  // --- handle -- EDIT TRIP MODAL ----
  // ----
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
      //----------
    } else if (action === "CLOSE") {
      Animated.timing(modal_editTrip_yPos, {
        toValue: -3000,
        duration: 200,
        useNativeDriver: false,
      }).start();
      animateTripScreen("CLOSE");
      setTimeout(() => {
        set_editTripModal_active((crr) => false);
      }, 500);
      //----------
    } else if (action === "DELETE") {
      // Delete Trip
      Animated.timing(modal_editTrip_yPos, {
        toValue: -3000,
        duration: 200,
        useNativeDriver: false,
      }).start();
      animateTripScreen("CLOSE");
      setTimeout(() => {
        navigation.navigate("Home");
        removeTrip(trip.id);
        set_editTripModal_active((crr) => false);
      }, 500);
      //----------
    } else if (action === "SAVE") {
      // Save Stuff in
      editTrip(trip.id, input_title, input_date, input_colorID);
      // Change current stuff
      set_title((crr) => input_title);
      set_date((crr) => input_date);
      set_colorID((crr) => input_colorID);
      set_colorBase(getColorBase(input_colorID));
      set_colorSecondary(getColorSecondary(input_colorID));
      Animated.timing(modal_editTrip_yPos, {
        toValue: -3000,
        duration: 200,
        useNativeDriver: false,
      }).start();
      animateTripScreen("CLOSE");
      setTimeout(() => {
        set_editTripModal_active((crr) => false);
      }, 500);
    }
    //----------
  };

  // ----
  // --- handle -- ADD PERSON MODAL ----
  // ----
  const handleAddPersonModal = (action, input_name) => {
    if (action === "OPEN") {
      set_addPersonModal_active((crr) => true);
      Animated.timing(modal_addPerson_yPos, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      animateTripScreen("OPEN");
      //
    } else if (action === "CLOSE") {
      Animated.timing(modal_addPerson_yPos, {
        toValue: 3000,
        duration: 200,
        useNativeDriver: false,
      }).start();
      animateTripScreen("CLOSE");
      setTimeout(() => {
        set_addPersonModal_active((crr) => false);
      }, 500);
      //
    } else if (action === "SAVE") {
      addPerson(trip.id, input_name).then((update) => {
        getPeople(trip.id).then((newPeople) => {
          set_peopleList((crr) => newPeople);
        });
      });
      Animated.timing(modal_addPerson_yPos, {
        toValue: 3000,
        duration: 200,
        useNativeDriver: false,
      }).start();
      animateTripScreen("CLOSE");
      setTimeout(() => {
        set_addPersonModal_active((crr) => false);
      }, 500);
      //
    }
  };

  // ----
  // --- handle -- EDIT PERSON MODAL ----
  // ----
  const handleEditPersonModal = (action, input_id, input_name) => {
    if (action === "OPEN") {
      set_editPersonModal_active((crr) => true);
      Animated.timing(modal_editPerson_yPos, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      animateTripScreen("OPEN");
      //
    } else if (action === "CLOSE") {
      Animated.timing(modal_editPerson_yPos, {
        toValue: 3000,
        duration: 200,
        useNativeDriver: false,
      }).start();
      animateTripScreen("CLOSE");
      setTimeout(() => {
        set_editPersonModal_active((crr) => false);
      }, 500);
      //
    } else if (action === "SAVE") {
      // Save to store
      editPerson(trip.id, input_id, input_name).then(() => {
        getPeople(trip.id).then((newPeople) => {
          set_peopleList(newPeople);
        });
      });
      // -------------------------------
      // TODO -- Triger update activity
      // -------------------------------
      Animated.timing(modal_editPerson_yPos, {
        toValue: 3000,
        duration: 200,
        useNativeDriver: false,
      }).start();
      animateTripScreen("CLOSE");
      setTimeout(() => {
        set_editPersonModal_active((crr) => false);
      }, 500);
      //
    } else if (action === "DELETE") {
      // Delete from store
      removePerson(trip.id, input_id).then((update) => {
        getPeople(trip.id).then((newPeople) => {
          set_peopleList(newPeople);
          getActivities(trip.id).then((newActivities) => {
            set_activitiesList(newActivities);
          });
        });
      });
      // -------------------------------
      // TODO -- Triger update activity
      // -------------------------------
      Animated.timing(modal_editPerson_yPos, {
        toValue: 3000,
        duration: 200,
        useNativeDriver: false,
      }).start();
      animateTripScreen("CLOSE");
      setTimeout(() => {
        set_editPersonModal_active((crr) => false);
      }, 500);
      //
    }
  };

  // ----
  // --- handle -- ADD ACTIVITY MODAL ----
  // ----
  const handleAddActivityModal = (
    action,
    input_name,
    input_cost,
    input_payerID,
    input_payerName,
    input_pickerList
  ) => {
    if (action === "OPEN") {
      if (peopleList === null) {
        // No action
      } else {
        set_peopleList_newActivity((crr) =>
          build_peopleList_newActivity(peopleList)
        );
        set_addActivityModal_active((crr) => true);
        Animated.timing(modal_addActivity_yPos, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
        animateTripScreen("OPEN");
      }
      //
    } else if (action === "CLOSE") {
      Animated.timing(modal_addActivity_yPos, {
        toValue: 3000,
        duration: 200,
        useNativeDriver: false,
      }).start();
      animateTripScreen("CLOSE");
      setTimeout(() => {
        set_addActivityModal_active((crr) => false);
      }, 500);
      //
    } else if (action === "SAVE") {
      addActivity(
        trip.id,
        input_name,
        input_cost,
        input_payerID,
        input_payerName,
        input_pickerList
      ).then((update) => {
        getActivities(trip.id).then((newTrips) => {
          set_activitiesList((crr) => newTrips);
        });
      });
      Animated.timing(modal_addActivity_yPos, {
        toValue: 3000,
        duration: 200,
        useNativeDriver: false,
      }).start();
      animateTripScreen("CLOSE");
      setTimeout(() => {
        set_addActivityModal_active((crr) => false);
      }, 500);
      //
    }
  };

  // ----
  // --- handle -- EDIT ACTIVITY MODAL ----
  // ----
  const handleEditActivityModal = (
    action,
    activityID,
    input_name,
    input_cost,
    input_payerID,
    input_payerName,
    input_pickerList
  ) => {
    if (action === "OPEN") {
      // open
      for (let i = 0; i < activitiesList.length; i++) {
        if (activitiesList[i].id === activityID) {
          // do stuff
          set_currentEditActivity((crr) => activitiesList[i]);
          set_peopleList_editActivity((crr) => {
            build_peopleList_editActivity(
              peopleList,
              activitiesList[i].pickerList
            );
          });
          // set_editActivityModal_active((crr) => true);
          // Animated.timing(modal_editActivity_yPos, {
          //   toValue: 0,
          //   duration: 300,
          //   useNativeDriver: false,
          // }).start();
          // animateTripScreen("OPEN");
          // --
        }
      }
    } else if (action === "CLOSE") {
      // close
    } else if (action === "DELETE") {
      // delete
    } else if (action === "SAVE") {
      // save
    }
  };

  // ----
  // --- handle -- SPLITS MODAL ----
  // ----
  const handleSplitsModal = (action) => {
    if (action === "OPEN") {
      set_splitsModal_active((crr) => true);
      Animated.timing(modal_splits_yPos, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      // animateTripScreen("OPEN");
      //
    } else if (action === "CLOSE") {
      Animated.timing(modal_splits_yPos, {
        toValue: 3000,
        duration: 300,
        useNativeDriver: false,
      }).start();
      // animateTripScreen("CLOSE");
      setTimeout(() => {
        set_splitsModal_active((crr) => false);
      }, 500);
      //
    }
  };

  useEffect(
    () => {
      set_colorBase(getColorBase(colorID));
      set_colorSecondary(getColorSecondary(colorID));
      getPeople(trip.id).then((newPeople) => {
        set_peopleList((crr) => newPeople);
      });
      getActivities(trip.id).then((trips) => {
        set_activitiesList((crr) => trips);
      });
    },
    [],
    [peopleList],
    [activitiesList]
  );

  return (
    <Trip>
      {/*  ---------------------------------- MODAL - SPLTS ---------------------------------- */}
      <Animated_Modal_SplitsView style={{ top: modal_splits_yPos }}>
        {splitsModal_active === true ? (
          <>
            <Modal_Splits
              handleSplitsModal={handleSplitsModal}
              colorBase={colorBase}
              colorSecondary={colorSecondary}
            />
          </>
        ) : (
          <></>
        )}
      </Animated_Modal_SplitsView>
      {/*  ---------------------------------- MODAL - SPLTS ---------------------------------- */}

      {/*  ---------------------------------- MODAL - EDIT TRIP ---------------------------------- */}
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
      {/*  ---------------------------------- MODAL - EDIT TRIP ---------------------------------- */}

      {/*  ---------------------------------- MODAL - ADD PERSON ---------------------------------- */}
      <Animated_Modal_AddPerson_View style={{ top: modal_addPerson_yPos }}>
        {addPersonModal_active === true ? (
          <Modal_AddPerson handleAddPersonModal={handleAddPersonModal} />
        ) : (
          <></>
        )}
      </Animated_Modal_AddPerson_View>
      {/*  ---------------------------------- MODAL - ADD PERSON ---------------------------------- */}

      {/*  ---------------------------------- MODAL - EDIT PERSON ---------------------------------- */}
      <Animated_Modal_EditPerson_View style={{ top: modal_editPerson_yPos }}>
        {editPersonModal_active === true ? (
          <Modal_EditPerson
            id={currentPersonEdit.id}
            name={currentPersonEdit.name}
            handleEditPersonModal={handleEditPersonModal}
          />
        ) : (
          <></>
        )}
      </Animated_Modal_EditPerson_View>
      {/*  ---------------------------------- MODAL - EDIT PERSON ---------------------------------- */}

      {/*  ---------------------------------- MODAL - ADD ACTIVITY ---------------------------------- */}
      <Animated_Modal_AddActivity_View style={{ top: modal_addActivity_yPos }}>
        {addActivityModal_active === true ? (
          <>
            <Modal_AddActivity
              handleAddActivityModal={handleAddActivityModal}
              input_pickerList={peopleList_newActivity}
              colorBase={colorBase}
            />
          </>
        ) : (
          <></>
        )}
      </Animated_Modal_AddActivity_View>
      {/*  ---------------------------------- MODAL - ADD ACTIVITY ---------------------------------- */}

      {/*  ---------------------------------- MODAL - EDIT ACTIVITY ---------------------------------- */}
      <Animated_Modal_EditActivity_View
        style={{ top: modal_editActivity_yPos }}
      >
        {editActivityModal_active === true ? (
          <>
            <Modal_EditActivity
              handleEditActivityModal={handleEditActivityModal}
              currentActivity={currentEditActivity}
              input_pickerList={peopleList_editActivity}
              colorBase={colorBase}
            />
          </>
        ) : (
          <></>
        )}
      </Animated_Modal_EditActivity_View>
      {/*  ---------------------------------- MODAL - EDIT ACTIVITY ---------------------------------- */}

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
                <TouchableOpacity onPress={() => handleAddPersonModal("OPEN")}>
                  <TitleBtnTextWrapper>
                    <TitleBtnText>+ ADD</TitleBtnText>
                  </TitleBtnTextWrapper>
                </TouchableOpacity>
              </TitleBtnView>
            </TitleRow>
            <PeopleListView>
              {peopleList === null ? (
                <AddPersonNoteView>
                  <AddPersonNoteText>
                    To get started, add a person
                  </AddPersonNoteText>
                  <AddPersonNoteText>
                    using the "+ ADD" button
                  </AddPersonNoteText>
                </AddPersonNoteView>
              ) : (
                <ScrollView
                  style={{
                    paddingTop: 20,
                    paddingBottom: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {Object.entries(peopleList).map((person) => {
                    return (
                      <TouchableOpacity
                        key={person[1].id}
                        onPress={() => {
                          handleEditPersonModal("OPEN");
                          set_currentPersonEdit((crr) => person[1]);
                        }}
                      >
                        <PersonListing
                          id={person[1].id}
                          name={person[1].name}
                          handleEditPersonModal={handleEditPersonModal}
                        />
                      </TouchableOpacity>
                    );
                  })}
                  <EmptyPersonListing />
                </ScrollView>
              )}
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
                <TouchableOpacity
                  onPress={() => handleAddActivityModal("OPEN")}
                >
                  <TitleBtnTextWrapper>
                    <TitleBtnText>+ ADD</TitleBtnText>
                  </TitleBtnTextWrapper>
                </TouchableOpacity>
              </TitleBtnView>
            </TitleRow>
            <ActivityListView>
              {activitiesList === null ? (
                <AddPersonNoteView>
                  <AddPersonNoteText>
                    Next, add an activity or event
                  </AddPersonNoteText>
                  <AddPersonNoteText>
                    using the other "+ ADD" button
                  </AddPersonNoteText>
                </AddPersonNoteView>
              ) : (
                <>
                  {Object.entries(activitiesList).map((act) => {
                    return (
                      <TouchableOpacity
                        key={act[1].id}
                        onPress={() =>
                          handleEditActivityModal("OPEN", act[1].id)
                        }
                      >
                        <ActivityListing
                          name={act[1].name}
                          cost={act[1].cost}
                          payerName={act[1].payerName}
                          // payerName={"PayerName"}
                          pickerList={act[1].pickerList}
                          colorBase={colorBase}
                          colorSecondary={colorSecondary}
                        />
                      </TouchableOpacity>
                    );
                  })}
                  <EmptyActivityListing />
                </>
              )}
            </ActivityListView>
          </ActivitySection>
          {/* Activity Section ------------------------ END */}
        </ScrollView>
        {activitiesList !== null ? (
          <>
            <ComputeBtnView>
              <TouchableOpacity onPress={() => handleSplitsModal("OPEN")}>
                <ComputeBtnWrapper>
                  <ComputeBtnWrapperInner>
                    <ComputeBtnText>Calculate Split</ComputeBtnText>
                  </ComputeBtnWrapperInner>
                </ComputeBtnWrapper>
              </TouchableOpacity>
            </ComputeBtnView>
          </>
        ) : (
          <></>
        )}
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

const EmptyPersonListing = styled.View`
  height: 20px;
  width: 50px;
`;

const AddPersonNoteView = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: 10px 0px;
`;

const AddPersonNoteText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  opacity: 0.3;
  margin: 2px 0px;
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
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.125);
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

const Modal_AddPerson_View = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
`;
const Animated_Modal_AddPerson_View = Animated.createAnimatedComponent(
  Modal_AddPerson_View
);

const Modal_EditPerson_View = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
`;
const Animated_Modal_EditPerson_View = Animated.createAnimatedComponent(
  Modal_EditPerson_View
);

const Modal_AddActivity_View = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
`;
const Animated_Modal_AddActivity_View = Animated.createAnimatedComponent(
  Modal_AddActivity_View
);

const Modal_EditActivity_View = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
`;
const Animated_Modal_EditActivity_View = Animated.createAnimatedComponent(
  Modal_EditActivity_View
);

const Modal_SplitsView = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
`;
const Animated_Modal_SplitsView = Animated.createAnimatedComponent(
  Modal_SplitsView
);
