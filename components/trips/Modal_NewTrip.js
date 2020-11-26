/** @format */

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Animated, Keyboard } from "react-native";

const Modal_NewTrip = ({ handleNewTripModal }) => {
  const [inputText, set_inputText] = useState("");
  const titleInput = useRef();
  const error_opacity = useRef(new Animated.Value(0)).current;

  const checkIfValid = () => {
    if (inputText === "" || inputText === null) {
      Animated.timing(error_opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
      setTimeout(() => {
        Animated.timing(error_opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }, 3000);
    } else {
      // valid text
      set_inputText((crr) => "");
      handleNewTripModal("SAVE", inputText);
    }
  };

  const handleClose = () => {
    set_inputText((crr) => "");
    Keyboard.dismiss();
    handleNewTripModal("CLOSE");
  };

  useEffect(() => {
    titleInput.current.focus;
  }, []);

  return (
    <ModalContainer>
      <ModalBox>
        <TitleView>
          <TitleText>Add a New Trip</TitleText>
        </TitleView>
        <CaptionView>
          <CaptionText>Enter a name for the trip</CaptionText>
        </CaptionView>
        <InputViewBox>
          <InputText
            onChangeText={(txt) => set_inputText((crr) => txt)}
            ref={titleInput}
            Value={inputText}
            onSubmitEditing={handleClose}
          />
        </InputViewBox>
        <Animated_InputErrorBox style={{ opacity: error_opacity }}>
          <InputErrorText>Please enter a valid name</InputErrorText>
        </Animated_InputErrorBox>
        <ButtonsView>
          <TouchableOpacity onPress={handleClose}>
            <BtnView_cancel>
              <BtnText_cancel>Cancel</BtnText_cancel>
            </BtnView_cancel>
          </TouchableOpacity>
          <DividerBar />
          <TouchableOpacity onPress={checkIfValid}>
            <BtnView_logOut>
              <BtnText_logOut>Save</BtnText_logOut>
            </BtnView_logOut>
          </TouchableOpacity>
        </ButtonsView>
      </ModalBox>
    </ModalContainer>
  );
};

export default Modal_NewTrip;

const ModalContainer = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 40px;
  padding-top: 200px;
`;

const ModalBox = styled.View`
  width: 100%;
  background-color: white;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.125);
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  padding: 20px 10px;
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

const CaptionView = styled.View``;

const CaptionText = styled.Text`
  font-weight: 500;
  font-size: 16px;
  opacity: 0.4;
`;

const InputViewBox = styled.View`
  width: 100%;
  padding: 20px 10px;
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

const ButtonsView = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding-top: 10px;
`;

const BtnView_cancel = styled.View`
  width: 100px;
  align-items: center;
  justify-content: center;
  /* border: 1px solid black; */
`;

const BtnText_cancel = styled.Text`
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

const BtnView_logOut = styled.View`
  width: 100px;
  align-items: center;
  justify-content: center;
  /* border: 1px solid black; */
`;

const BtnText_logOut = styled.Text`
  font-size: 18px;
  font-weight: 600;
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
