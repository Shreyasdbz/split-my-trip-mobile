/** @format */

import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";

const Modal_NewTrips = ({ handleDeleteTripsModal }) => {
  return (
    <ModalContainer>
      <ModalBox>
        <TitleView>
          <TitleText>Are you sure you want to delete all your trips?</TitleText>
        </TitleView>
        <ButtonsView>
          <TouchableOpacity onPress={() => handleDeleteTripsModal("CLOSE")}>
            <BtnView_cancel>
              <BtnText_cancel>Cancel</BtnText_cancel>
            </BtnView_cancel>
          </TouchableOpacity>
          <DividerBar />
          <TouchableOpacity onPress={() => handleDeleteTripsModal("DELETE")}>
            <BtnView_logOut>
              <BtnText_logOut>Delete</BtnText_logOut>
            </BtnView_logOut>
          </TouchableOpacity>
        </ButtonsView>
      </ModalBox>
    </ModalContainer>
  );
};

export default Modal_NewTrips;

const ModalContainer = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 20px;
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
  padding: 10px 20px;
`;

const TitleText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 10px;
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
  color: red;
`;
