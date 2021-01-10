/** @format */

import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Linking } from "react-native";

const Modal_AppInfo = ({ handleAppInfoModal }) => {
  return (
    <ModalContainer>
      <ModalBox>
        <TitleView>
          <TitleText>App Information</TitleText>
        </TitleView>
        <CaptionView>
          <CaptionText>!!</CaptionText>
          <CaptionText>
            Data stored with this app is not distributed anywhere or to anyone
          </CaptionText>
          <CaptionText>App Licenses:</CaptionText>
          <CaptionText
            style={{ color: "blue" }}
            onPress={() =>
              Linking.openURL("https://icons8.com/icon/17949/google")
            }
          >
            Google Icon: Icons8
          </CaptionText>
          <CaptionText
            style={{ color: "blue" }}
            onPress={() =>
              Linking.openURL(
                "https://icons8.com/icon/103222/unavailable-cloud"
              )
            }
          >
            Cloud Icon: Icons8
          </CaptionText>
          <CaptionText
            style={{ color: "blue" }}
            onPress={() => Linking.openURL("https://icons8.com/icon/3220/plus")}
          >
            "+" Icon: Icons8
          </CaptionText>
          <CaptionText
            style={{ color: "blue" }}
            onPress={() =>
              Linking.openURL("https://icons8.com/icon/68064/trash")
            }
          >
            Trash Icon: Icons8
          </CaptionText>
        </CaptionView>
        <ButtonsView>
          <TouchableOpacity onPress={() => handleAppInfoModal("CLOSE")}>
            <BtnView>
              <BtnText>Close</BtnText>
            </BtnView>
          </TouchableOpacity>
        </ButtonsView>
      </ModalBox>
    </ModalContainer>
  );
};

export default Modal_AppInfo;

const ModalContainer = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 20px 40px;
`;

const ModalBox = styled.View`
  width: 100%;
  background-color: white;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.125);
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  padding: 25px 15px;
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
  padding-bottom: 5px;
`;

const ButtonsView = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding-top: 10px;
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
