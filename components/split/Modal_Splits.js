/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";

const Modal_Splits = ({
  handleSplitsModal,
  splits,
  totalCost,
  colorBase,
  colorSecondary,
}) => {
  const [splitList, set_splitList] = useState(splits);
  const windowWidth = Dimensions.get("window").width;

  return (
    <ModalContainer>
      <ModalBox>
        <ScrollView
          style={{
            width: windowWidth,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
        >
          <TitleView>
            <TitleText>Splits Roundup</TitleText>
          </TitleView>
          <CaptionView>
            <CaptionText>Total Trip Expenses: ${totalCost}</CaptionText>
          </CaptionView>
          {Object.entries(splitList).map((split) => {
            return (
              <PaymentBox key={split[1].id}>
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
                    <NameTitle_Text>{split[1].name}</NameTitle_Text>
                  </NameTitle_View>
                </TopRow>
                <BottomRow>
                  {split[1].transactions.map((transaction) => {
                    if (transaction.type === "PAY") {
                      return (
                        <TransactionRow key={transaction.spitPersonID}>
                          <ActionText>Pay</ActionText>
                          <TransactionPersonName style={{ color: colorBase }}>
                            {transaction.name}
                          </TransactionPersonName>
                          <TransactionAmount_Neg>
                            ${transaction.amount}
                          </TransactionAmount_Neg>
                        </TransactionRow>
                      );
                    } else if (transaction.type === "GET") {
                      return (
                        <TransactionRow key={transaction.spitPersonID}>
                          <ActionText>Receive from</ActionText>
                          <TransactionPersonName style={{ color: colorBase }}>
                            {transaction.name}
                          </TransactionPersonName>
                          <TransactionAmount_Pos>
                            ${transaction.amount}
                          </TransactionAmount_Pos>
                        </TransactionRow>
                      );
                    }
                  })}
                </BottomRow>
              </PaymentBox>
            );
          })}
          <EmptyPayBox />
        </ScrollView>
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
  padding: 00px 20px;
`;

const TitleView = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
`;

const TitleText = styled.Text`
  font-size: 28px;
  font-weight: 700;
`;

const CaptionView = styled.View`
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
  align-items: center;
  justify-content: center;
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

const EmptyPayBox = styled.Text`
  width: 100%;
  height: 100px;
`;
