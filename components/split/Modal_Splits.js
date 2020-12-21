/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

const Modal_Splits = ({
  handleSplitsModal,
  splits,
  colorBase,
  colorSecondary,
}) => {
  // const [splitList, set_splitList] = useEffect(splits);
  const [splitList, set_splitList] = useState(splits);
  console.log("Splits: ", splitList);

  return (
    <ModalContainer>
      <ModalBox>
        <TitleView>
          <TitleText>Splits Roundup</TitleText>
        </TitleView>
        <CaptionView>
          <CaptionText>Total Trip Expenses: $85</CaptionText>
        </CaptionView>
        <PaymentBox>
          <TopRow>
            <LinearGradient
              colors={[colorBase, colorSecondary]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: 120,
              }}
              start={{ x: 0.25, y: 0 }}
              end={{ x: 2.5, y: 0 }}
            />

            <NameTitle_View>
              <NameTitle_Text>John</NameTitle_Text>
            </NameTitle_View>
          </TopRow>
          <BottomRow>
            <TransactionRow>
              <ActionText>Pay</ActionText>
              <TransactionPersonName style={{ color: colorBase }}>
                Abby
              </TransactionPersonName>
              <TransactionAmount_Neg>$50</TransactionAmount_Neg>
            </TransactionRow>
            <TransactionRow>
              <ActionText>Receive from</ActionText>
              <TransactionPersonName style={{ color: colorBase }}>
                Sampson
              </TransactionPersonName>
              <TransactionAmount_Pos>$50</TransactionAmount_Pos>
            </TransactionRow>
          </BottomRow>
        </PaymentBox>
        <PaymentBox>
          <TopRow>
            <LinearGradient
              colors={[colorBase, colorSecondary]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: 120,
              }}
              start={{ x: 0.25, y: 0 }}
              end={{ x: 2.5, y: 0 }}
            />

            <NameTitle_View>
              <NameTitle_Text>John</NameTitle_Text>
            </NameTitle_View>
          </TopRow>
          <BottomRow>
            <TransactionRow>
              <ActionText>Pay</ActionText>
              <TransactionPersonName style={{ color: colorBase }}>
                Abby
              </TransactionPersonName>
              <TransactionAmount_Neg>$50</TransactionAmount_Neg>
            </TransactionRow>
            <TransactionRow>
              <ActionText>Receive from</ActionText>
              <TransactionPersonName style={{ color: colorSecondary }}>
                Sampson
              </TransactionPersonName>
              <TransactionAmount_Pos>$50</TransactionAmount_Pos>
            </TransactionRow>
          </BottomRow>
        </PaymentBox>
        <ButtonsView>
          <TouchableOpacity onPress={() => handleSplitsModal("CLOSE")}>
            <BtnView>
              <BtnText>Close</BtnText>
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
  padding: 0px 0px;
  padding-top: 50px;
`;

const ModalBox = styled.View`
  width: 100%;
  height: 100%;
  background-color: white;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.125);
  border-radius: 20px;
  align-items: center;
  /* justify-content: center; */
  padding: 20px 20px;
`;

const TitleView = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const TitleText = styled.Text`
  font-size: 28px;
  font-weight: 700;
`;

const CaptionView = styled.View`
  margin-bottom: 20px;
`;

const CaptionText = styled.Text`
  font-weight: 600;
  font-size: 16px;
  opacity: 0.4;
`;

const ButtonsView = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  bottom: 50px;
`;

const BtnView = styled.View`
  width: 100px;
  padding: 10px 20px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  /* border: 1px solid black; */
  background-color: white;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.125);
`;

const BtnText = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

const PaymentBox = styled.View`
  width: 100%;
  background-color: white;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.125);
  margin-bottom: 20px;
  border-radius: 15px;
  padding: 0px 0px;
`;

const TopRow = styled.View`
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  overflow: hidden;
  padding: 10px 10px;
`;

const NameTitle_View = styled.View``;

const NameTitle_Text = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: white;
`;

const HorizontalDivider_Wrapper = styled.View`
  padding: 10px 0px;
`;

const HorizontalDivider = styled.View`
  height: 2px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.125);
`;

const BottomRow = styled.View`
  padding: 10px 10px;
`;

const TransactionRow = styled.View`
  width: 100%;
  flex-direction: row;
  margin-bottom: 8px;
`;

const ActionText = styled.Text`
  font-size: 20px;
`;

const TransactionPersonName = styled.Text`
  font-size: 20px;
  margin: 0px 8px;
  font-weight: 700;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.025);
`;

const TransactionAmount_Pos = styled.Text`
  font-size: 20px;
  margin-right: 5px;
`;

const TransactionAmount_Neg = styled.Text`
  font-size: 20px;
  margin-right: 5px;
`;
