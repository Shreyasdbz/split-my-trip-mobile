/** @format */

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Animated, Keyboard, Switch, Dimensions } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const Modal_EditActivity = ({
  handleEditActivityModal,
  currentActivity,
  input_pickerList,
  colorBase,
}) => {
  const [title, set_title] = useState(currentActivity.name);
  const [cost, set_cost] = useState(currentActivity.cost);
  const [payerID, set_payerID] = useState(currentActivity.payerID);
  const [pickerList, set_pickerList] = useState(input_pickerList);

  const name_error_height = useRef(new Animated.Value(0)).current;
  const cost_error_height = useRef(new Animated.Value(0)).current;
  const costInput = useRef();

  const maxScrollHeight = Dimensions.get("window").height - 600;
  const payerPickPadding = useRef(new Animated.Value(0)).current; //

  const handlePickerPadding = (action, item) => {
    var openLength = pickerList.length * 20 + 60;
    if (pickerList.length > 5) {
      openLength = 150;
    }
    if (action === "open") {
      Keyboard.dismiss();
      Animated.timing(payerPickPadding, {
        toValue: openLength,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    if (action === "close") {
      Animated.timing(payerPickPadding, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    if (action === "pick") {
      set_payerID((crr) => item.value);
      Animated.timing(payerPickPadding, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleParticipantToggle = (personID) => {
    var tempList = [];
    for (let i = 0; i < pickerList.length; i++) {
      if (pickerList[i].id === personID) {
        pickerList[i].isParticipating = !pickerList[i].isParticipating;
      }
      tempList.push(pickerList[i]);
    }
    set_pickerList((crr) => tempList);
  };

  const handleSave = () => {
    // bad name
    if (title === "" || title === null) {
      Animated.timing(name_error_height, {
        toValue: 20,
        duration: 200,
        useNativeDriver: false,
      }).start();
      setTimeout(() => {
        Animated.timing(name_error_height, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }, 3000);
    }
    // bad cost
    else if (cost === "" || cost === null || cost === 0) {
      Animated.timing(cost_error_height, {
        toValue: 20,
        duration: 200,
        useNativeDriver: false,
      }).start();
      setTimeout(() => {
        Animated.timing(cost_error_height, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }, 3000);
    } else {
      var payerName = "";
      for (let i = 0; i < pickerList.length; i++) {
        if (pickerList[i].id === payerID) {
          payerName = pickerList[i].name;
        }
      }
      handleEditActivityModal(
        "SAVE",
        currentActivity.id,
        title,
        cost,
        payerID,
        payerName,
        pickerList
      );
    }
  };

  useEffect(
    () => {
      set_pickerList((crr) => input_pickerList);
    },
    [],
    [pickerList]
  );

  return (
    <ModalContainer>
      <ModalBox>
        <TitleView>
          <TitleText>Edit Activity</TitleText>
        </TitleView>
        {/* <CaptionView>
          <CaptionText>Update/Edit an activity you've added</CaptionText>
        </CaptionView> */}
        <InputLabelView>
          <InputLabelText>Activity Name</InputLabelText>
        </InputLabelView>
        <InputViewBox>
          <InputText
            onChangeText={(txt) => set_title((crr) => txt)}
            value={title}
            onSubmitEditing={() => costInput.current.focus()}
          />
        </InputViewBox>
        <Animated_InputErrorBox style={{ height: name_error_height }}>
          <InputErrorText>Please enter a valid name</InputErrorText>
        </Animated_InputErrorBox>
        <InputLabelView>
          <InputLabelText>Activity Cost $</InputLabelText>
        </InputLabelView>
        <InputViewBox>
          <InputText
            keyboardType={"number-pad"}
            onChangeText={(txt) => set_cost((crr) => txt)}
            value={cost}
            onSubmitEditing={() => Keyboard.dismiss()}
            ref={costInput}
            returnKeyType={"done"}
          />
        </InputViewBox>
        <Animated_InputErrorBox style={{ height: cost_error_height }}>
          <InputErrorText>Please enter a valid cost</InputErrorText>
        </Animated_InputErrorBox>
        <InputLabelView>
          <InputLabelText>Select who paid</InputLabelText>
        </InputLabelView>
        <InputViewBox>
          <Animated_PickerContainer style={{ paddingBottom: payerPickPadding }}>
            <DropDownPicker
              items={input_pickerList}
              containerStyle={{ height: 40, borderRadius: 8 }}
              style={{
                backgroundColor: "#ebebeb",
                zIndex: 2,
                borderColor: "#ebebeb",
              }}
              itemStyle={{
                justifyContent: "flex-start",
                // borderColor: "#fff",
              }}
              selectedtLabelStyle={{
                color: "#39739d",
              }}
              placeholderStyle={{
                textAlign: "left",
              }}
              dropDownStyle={{ backgroundColor: "white" }}
              // placeholder="Select who paid"
              defaultValue={payerID}
              onChangeItem={(item) => handlePickerPadding("pick", item)}
              onOpen={() => handlePickerPadding("open")}
              onClose={() => handlePickerPadding("close")}
            />
          </Animated_PickerContainer>
        </InputViewBox>
        <InputLabelView>
          <InputLabelText>Select who participated</InputLabelText>
        </InputLabelView>
        <InputViewBox style={{ paddingTop: 10 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ maxHeight: maxScrollHeight + 25 }}
          >
            {pickerList.map((per) => {
              return (
                <ParticipantLine key={per.id}>
                  <ParticipantName>{per.name}</ParticipantName>
                  <SwitchView>
                    <Switch
                      trackColor={{ false: "#ebebeb", true: colorBase }}
                      thumbColor={per.isParticipating ? "white" : "white"}
                      ios_backgroundColor="#ebebeb"
                      onValueChange={() => handleParticipantToggle(per.id)}
                      value={per.isParticipating}
                    />
                  </SwitchView>
                </ParticipantLine>
              );
            })}
          </ScrollView>
        </InputViewBox>
        <ButtonsView>
          <TouchableOpacity onPress={() => handleEditActivityModal("CLOSE")}>
            <BtnView>
              <BtnText>Cancel</BtnText>
            </BtnView>
          </TouchableOpacity>
          <DividerBar />
          <TouchableOpacity onPress={handleSave}>
            <BtnView>
              <BtnText>Save</BtnText>
            </BtnView>
          </TouchableOpacity>
          <DividerBar />
          <TouchableOpacity
            onPress={() =>
              handleEditActivityModal("DELETE", currentActivity.id)
            }
          >
            <BtnView>
              <BtnText_Delete>Delete</BtnText_Delete>
            </BtnView>
          </TouchableOpacity>
        </ButtonsView>
      </ModalBox>
    </ModalContainer>
  );
};

export default Modal_EditActivity;

const ModalContainer = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 40px;
  padding-top: 75px;
`;

const ModalBox = styled.View`
  width: 100%;
  background-color: white;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.125);
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  padding: 20px 0px;
`;

const TitleView = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const TitleText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 10px;
`;

const CaptionView = styled.View`
  width: 100%;
  padding: 0px 20px;
  align-items: center;
  padding-bottom: 15px;
`;

const CaptionText = styled.Text`
  font-weight: 500;
  font-size: 16px;
  opacity: 0.4;
`;

const InputViewBox = styled.View`
  width: 100%;
  padding: 10px 20px;
`;

const InputText = styled.TextInput`
  padding: 8px 8px;
  font-size: 22px;
  background-color: #ebebeb;
  width: 100%;
  border-radius: 8px;
  color: rgba(0, 0, 0, 0.7);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
`;

const InputLabelView = styled.View`
  width: 100%;
  align-items: flex-start;
  padding-top: 10px;
  padding-left: 20px;
  margin-bottom: -5px;
`;

const InputLabelText = styled.Text`
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  opacity: 0.6;
`;

const ParticipantsView = styled.View`
  width: 100%;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.05);
  /* border: 1px; */
  border-radius: 8px;
`;

const ParticipantLine = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 10px 10px;
  border-radius: 8px;
  margin-bottom: 2px;
  border: 1px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.025);
  border-color: #ececec;
`;

const ParticipantName = styled.Text`
  font-size: 18px;
`;

const SwitchView = styled.View`
  position: absolute;
  right: 10px;
`;

const ButtonsView = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const BtnView = styled.View`
  width: 100px;
  align-items: center;
  justify-content: center;
  /* border: 1px solid black; */
`;

const BtnText = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;
const BtnText_Delete = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: red;
`;

const DividerBar = styled.View`
  width: 2px;
  height: 25px;
  background-color: rgba(0, 0, 0, 0.125);
  border-radius: 10px;
  margin: 0px -20px;
`;

const InputErrorBox = styled.View`
  align-items: center;
  justify-content: center;
`;
const Animated_InputErrorBox = Animated.createAnimatedComponent(InputErrorBox);

const InputErrorText = styled.Text`
  font-weight: 300;
  color: red;
  opacity: 0.75;
`;

const PickerContainer = styled.View`
  /* padding: 50px 0px; */
  /* z-index: 4; */
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.05);
`;
const Animated_PickerContainer = Animated.createAnimatedComponent(
  PickerContainer
);
