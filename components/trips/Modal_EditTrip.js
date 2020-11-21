/** @format */

import React, { useState, useRef } from "react";
import styled from "styled-components";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Animated, Keyboard } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { colorPalette } from "../../store/colorStore";

const Modal_EditTrip = ({ handleEditTripModal, trip }) => {
  const [title, set_title] = useState(trip.title);
  const [date, set_date] = useState(trip.date);
  const [colorID, set_colorID] = useState(trip.colorID);

  const name_error_height = useRef(new Animated.Value(0)).current;
  const date_error_height = useRef(new Animated.Value(0)).current;
  const dateInput = useRef();

  const handleSave = () => {
    // Check for bad Name
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
    // Check for bad Date
    else if (date === "" || date === null) {
      Animated.timing(date_error_height, {
        toValue: 20,
        duration: 200,
        useNativeDriver: false,
      }).start();
      setTimeout(() => {
        Animated.timing(date_error_height, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }, 3000);
    } else {
      // all good to save
      handleEditTripModal("SAVE", title, date, colorID);
    }
  };

  return (
    <ModalContainer>
      <ModalBox>
        <TitleView>
          <TitleText>Edit Trip</TitleText>
        </TitleView>
        <CaptionView>
          <CaptionText>Edit the trip details</CaptionText>
        </CaptionView>
        <InputLabelView>
          <InputLabelText>Trip title</InputLabelText>
        </InputLabelView>
        <InputViewBox>
          <InputText
            onChangeText={(txt) => set_title((crr) => txt)}
            value={title}
            onSubmitEditing={() => dateInput.current.focus()}
          />
        </InputViewBox>
        <Animated_InputErrorBox style={{ height: name_error_height }}>
          <InputErrorText>Please enter a valid name</InputErrorText>
        </Animated_InputErrorBox>
        <InputLabelView>
          <InputLabelText>Trip date / caption</InputLabelText>
        </InputLabelView>
        <InputViewBox>
          <InputText
            onChangeText={(txt) => set_date((crr) => txt)}
            value={date}
            onSubmitEditing={() => Keyboard.dismiss()}
            ref={dateInput}
          />
        </InputViewBox>
        <Animated_InputErrorBox style={{ height: date_error_height }}>
          <InputErrorText>Please enter a valid date</InputErrorText>
        </Animated_InputErrorBox>
        <InputLabelView>
          <InputLabelText>Theme Color</InputLabelText>
        </InputLabelView>
        <ColorInputView>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
              paddingLeft: 20,
              paddingBottom: 15,
              paddingTop: 15,
            }}
          >
            {colorPalette.map((clr) => {
              return (
                <ColorWrapper
                  key={clr.id}
                  style={{
                    shadowColor: clr.base,
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.5,
                    shadowRadius: 5,
                    elevation: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => set_colorID((crr) => clr.id)}
                  >
                    {clr.id === colorID ? (
                      <ColorGradientLayer_bordered>
                        <LinearGradient
                          colors={[clr.base, clr.secondary]}
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
                        <ColorSwatch />
                      </ColorGradientLayer_bordered>
                    ) : (
                      <ColorGradientLayer>
                        <LinearGradient
                          colors={[clr.base, clr.secondary]}
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
                        <ColorSwatch />
                      </ColorGradientLayer>
                    )}
                  </TouchableOpacity>
                </ColorWrapper>
              );
            })}
            <ColorWrapper>
              <ColorGradientLayer>
                <ColorSwatch />
              </ColorGradientLayer>
            </ColorWrapper>
          </ScrollView>
        </ColorInputView>
        <ButtonsView>
          <TouchableOpacity onPress={() => handleEditTripModal("CLOSE")}>
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
          <TouchableOpacity onPress={() => handleEditTripModal("DELETE")}>
            <BtnView>
              <BtnText_Delete>Delete</BtnText_Delete>
            </BtnView>
          </TouchableOpacity>
        </ButtonsView>
      </ModalBox>
    </ModalContainer>
  );
};

export default Modal_EditTrip;

const ModalContainer = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 20px;
  padding-top: 125px;
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

const ColorInputView = styled.View`
  width: 100%;
  /* border: 1px solid black; */
`;

const ColorWrapper = styled.View`
  margin-right: 10px;
`;

const ColorGradientLayer = styled.View`
  border-radius: 50px;
  overflow: hidden;
`;
const ColorGradientLayer_bordered = styled.View`
  position: relative;
  border-radius: 50px;
  overflow: hidden;
  border: 4px solid white;
  bottom: 4px;
`;

const ColorSwatch = styled.View`
  border-radius: 50px;
  height: 50px;
  width: 50px;
`;
