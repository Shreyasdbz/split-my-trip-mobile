/** @format */

import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components";

const Modal_UserSettings = ({ userInfo, handleUserSettingsModal }) => {
  return (
    <ModalContainer>
      <ModalBox>
        <TitleView>
          <TitleText>User Settings</TitleText>
        </TitleView>
        <SettingsView>
          <Line_name>Hi {userInfo.name},</Line_name>
          <Line_caption>You are logged in as: </Line_caption>
          <Line_email>{userInfo.email}</Line_email>
        </SettingsView>
        <ButtonsView>
          <TouchableOpacity onPress={() => handleUserSettingsModal("CLOSE")}>
            <BtnView_cancel>
              <BtnText_cancel>Cancel</BtnText_cancel>
            </BtnView_cancel>
          </TouchableOpacity>
          <DividerBar />
          <TouchableOpacity onPress={() => handleUserSettingsModal("LOGOUT")}>
            <BtnView_logOut>
              <BtnText_logOut>Log Out</BtnText_logOut>
            </BtnView_logOut>
          </TouchableOpacity>
        </ButtonsView>
      </ModalBox>
    </ModalContainer>
  );
};

export default Modal_UserSettings;

const ModalContainer = styled.View`
  z-index: 5;
  position: absolute;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0px 40px;
  /* background-color: rgba(0, 0, 0, 0.125); */
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

const SettingsView = styled.View`
  width: 100%;
  padding: 15px 10px;
  justify-content: center;
`;

const Line_name = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

const Line_caption = styled.Text`
  font-size: 18px;
  padding: 5px 0px;
`;

const Line_email = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

const ButtonsView = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding-top: 10px;
`;

const BtnView_cancel = styled.View``;

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

const BtnView_logOut = styled.View``;

const BtnText_logOut = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: red;
`;
