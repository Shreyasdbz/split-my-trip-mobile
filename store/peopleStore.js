/** @format */

import AsyncStorage from "@react-native-community/async-storage";
import uuid from "react-uuid";

// ------------------------------------------------------------------------
// ADD NEW PERSON
// ------------------------------------------------------------------------
export const addPerson = async (input_tripID, input_name) => {
  const PEOPLE_KEY = "@people_list@" + input_tripID;
  try {
    var currentList = await AsyncStorage.getItem(PEOPLE_KEY);
    if (currentList === null) {
      //   CASE 1 - New List
      currentList = [];
      var person = {
        id: uuid(),
        tripID: input_tripID,
        name: input_name,
      };
      currentList.push(person);
      const sendValue = JSON.stringify(currentList);
      return await AsyncStorage.setItem(PEOPLE_KEY, sendValue);
    } else {
      //   CASE 2 - Add to existing List
      currentList = JSON.parse(currentList);
      var person = {
        id: uuid(),
        tripID: input_tripID,
        name: input_name,
      };
      currentList.push(person);
      const sendValue = JSON.stringify(currentList);
      return await AsyncStorage.setItem(PEOPLE_KEY, sendValue);
    }
  } catch (err) {
    console.log("PS - addPerson - Err[1]: ", err);
  }
};

// ------------------------------------------------------------------------
// GET PEOPLE LIST
// ------------------------------------------------------------------------
export const getPeople = async (input_tripID) => {
  const PEOPLE_KEY = "@people_list@" + input_tripID;
  try {
    var currentList = await AsyncStorage.getItem(PEOPLE_KEY);
    if (currentList === null) {
      return null;
    } else {
      currentList = JSON.parse(currentList);
      return currentList;
    }
  } catch (err) {
    console.log("PS - getPeople - ERR[1]: ", err);
  }
};

// ------------------------------------------------------------------------
// EDIT A PERSON
// ------------------------------------------------------------------------
export const editPerson = async (
  input_tripID,
  input_personID,
  input_personName
) => {
  const PEOPLE_KEY = "@people_list@" + input_tripID;
  try {
    var currentList = await AsyncStorage.getItem(PEOPLE_KEY);
    if (currentList === null) {
      console.log("PS -- editPerson -- null list");
    } else {
      currentList = JSON.parse(currentList);
      for (let i = 0; i < currentList.length; i++) {
        if (currentList[i].id === input_personID) {
          currentList[i].name = input_personName;
        }
      }
      const sendValue = JSON.stringify(currentList);
      return await AsyncStorage.setItem(PEOPLE_KEY, sendValue);
    }
  } catch (err) {
    console.log("PS - editPerson - ERR[1]: ", err);
  }
};

// ------------------------------------------------------------------------
// REMOVE A PERSON
// ------------------------------------------------------------------------
export const removePerson = async (input_tripID, input_personID) => {
  const PEOPLE_KEY = "@people_list@" + input_tripID;
  try {
    var currentList = await AsyncStorage.getItem(PEOPLE_KEY);
    if (currentList === null) {
      console.log("PS -- removePerson -- null list");
    } else {
      currentList = JSON.parse(currentList);
      var newList = [];
      for (let i = 0; i < currentList.length; i++) {
        if (currentList[i].id !== input_personID) {
          newList.push(currentList[i]);
        }
      }
      const sendValue = JSON.stringify(newList);
      return await AsyncStorage.setItem(PEOPLE_KEY, sendValue);
    }
  } catch (err) {
    console.log("PS - editPerson - ERR[1]: ", err);
  }
};
