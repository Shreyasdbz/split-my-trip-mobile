/** @format */

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Animated, Keyboard, Switch, Dimensions } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const temp_pickerList = [
  {
    value: "27b13df-1238-a13f-b35d-6561bed40f50",
    label: "Sam",
  },
  {
    value: "c4343d-ee34-d8a-8aa1-113a2d0f80db",
    label: "Alice",
  },
  {
    value: "8a11be5-e635-e0ed-b62b-7f30f4f25eeb",
    label: "Beth",
  },
];

const Modal_AddActivity = ({ handleAddActivityModal, input_pickerList }) => {
  const [title, set_title] = useState("");
  const [cost, set_cost] = useState("");

  const [pickerList, set_pickerList] = useState([
    {
      value: "27b13df-1238-a13f-b35d-6561bed40f50",
      label: "Sam",
    },
    {
      value: "c4343d-ee34-d8a-8aa1-113a2d0f80db",
      label: "Alice",
    },
    {
      value: "8a11be5-e635-e0ed-b62b-7f30f4f25eeb",
      label: "Beth",
    },
  ]);
  const [payerID, set_payerID] = useState(null);
  const [payerName, set_payerName] = useState(null);

  const name_error_height = useRef(new Animated.Value(0)).current;
  const cost_error_height = useRef(new Animated.Value(0)).current;
  const costInput = useRef();

  const maxScrollHeight = Dimensions.get("window").height - 500;
  const payerPickPadding = useRef(new Animated.Value(0)).current; //

  const handlePickerPadding = (action, item) => {
    var openLength = pickerList.length * 20 + 80;
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
      set_payerName((crr) => item.label);

      Animated.timing(payerPickPadding, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
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
          <TitleText>Add Activity</TitleText>
        </TitleView>
        <CaptionView>
          <CaptionText>Add a new activity/event to your trip</CaptionText>
        </CaptionView>
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
            onChangeText={(txt) => set_cost((crr) => txt)}
            value={cost}
            onSubmitEditing={() => Keyboard.dismiss()}
            ref={costInput}
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
              items={pickerList}
              containerStyle={{ height: 40, borderRadius: 8 }}
              style={{
                backgroundColor: "#ebebeb",
                zIndex: 2,
              }}
              itemStyle={{ justifyContent: "flex-start" }}
              selectedtLabelStyle={{
                color: "#39739d",
              }}
              placeholderStyle={{
                textAlign: "left",
              }}
              dropDownStyle={{ backgroundColor: "white" }}
              placeholder="Select who paid"
              // onChangeItem={(item) => handlePickerPadding("pick", item)}
              onOpen={() => handlePickerPadding("open")}
              onClose={() => handlePickerPadding("close")}
            />
          </Animated_PickerContainer>
        </InputViewBox>
        <ButtonsView>
          <TouchableOpacity onPress={() => handleAddActivityModal("CLOSE")}>
            <BtnView>
              <BtnText>Cancel</BtnText>
            </BtnView>
          </TouchableOpacity>
          <DividerBar />
          <TouchableOpacity>
            <BtnView>
              <BtnText>Save</BtnText>
            </BtnView>
          </TouchableOpacity>
        </ButtonsView>
      </ModalBox>
    </ModalContainer>
  );
};

export default Modal_AddActivity;

const ModalContainer = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 40px;
  padding-top: 85px;
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
