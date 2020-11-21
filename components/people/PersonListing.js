/** @format */

import React from "react";
import styled from "styled-components";

const PersonListing = ({ name }) => {
  return (
    <PersonView>
      <PersonName>{name}</PersonName>
    </PersonView>
  );
};

export default PersonListing;

const PersonView = styled.View`
  background-color: #e0e0e0;
  border-radius: 8px;
  margin-right: 15px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
`;

const PersonName = styled.Text`
  padding: 10px 15px;
  color: black;
  font-size: 20px;
  font-weight: 600;
`;
