/** @format */

import React from "react";
import styled from "styled-components";
import { SwipeableModal } from "react-native-swipeable-modal";
import { TouchableOpacity } from "react-native-gesture-handler";

const Modal_Splits = ({ handleSplitsModal }) => {
  return (
    <ModalContainer>
      <ModalBox>
        <TitleView>
          <TitleText>Splits Roundup</TitleText>
        </TitleView>
        <CaptionView>
          <CaptionText>Total trip expense: $85</CaptionText>
        </CaptionView>
        <ButtonsView>
          <TouchableOpacity onPress={() => handleSplitsModal("CLOSE")}>
            <BtnView>
              <BtnText>Cancel</BtnText>
            </BtnView>
          </TouchableOpacity>
        </ButtonsView>
      </ModalBox>
    </ModalContainer>
  );
};

export default Modal_Splits;

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
