/** @format */

import React from "react";
import styled from "styled-components";

const Modal_Loading = () => {
  return (
    <ModalContainer>
      <ModalBox>
        <TitleView>
          <TitleText>Loading ...</TitleText>
        </TitleView>
      </ModalBox>
    </ModalContainer>
  );
};

export default Modal_Loading;

const ModalContainer = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 40px;
  padding-top: 175px;
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
