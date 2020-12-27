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
      // -----------------------------
      // TODO --- Update Activity Store store
      // -----------------------------
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
      // If list is empty, return nulll
      if (newList.length === 0) {
        return await AsyncStorage.removeItem(PEOPLE_KEY);
      } else {
        const sendValue = JSON.stringify(newList);
        return await AsyncStorage.setItem(PEOPLE_KEY, sendValue);
      }
    }
  } catch (err) {
    console.log("PS - remove - ERR[1]: ", err);
  }
};

// ------------------------------------------------------------------------
// GET PERSON NAME BY ID
// ------------------------------------------------------------------------
export const getPersonName = async (input_tripID, input_personID) => {
  const PEOPLE_KEY = "@people_list@" + input_tripID;
  try {
    var currentList = await AsyncStorage.getItem(PEOPLE_KEY);
    if (currentList === null) {
      console.log("PS -- getPersonName -- null list");
    } else {
      currentList = JSON.parse(currentList);
      console.log(currentList);
      // console.log("Current list: ", currentList);
      // console.log("PayerID: ", input_personID);
      for (let i = 0; i < currentList.length; i++) {
        if (currentList[i].id === input_personID) {
          return currentList[i].name;
        }
      }
    }
  } catch (err) {
    console.log("PS - getPersonName - ERR[1]: ", err);
  }
};

// ------------------------------------------------------------------------
// SET FULL LIST
// ------------------------------------------------------------------------
export const setPeopleStore = async (input_tripID, input_peopleStore) => {
  const PEOPLE_KEY = "@people_list@" + input_tripID;
  try {
    //
    return await AsyncStorage.setItem(
      PEOPLE_KEY,
      JSON.stringify(input_peopleStore)
    );
  } catch (err) {
    console.log("SET PEOPLE STORE ERR: ", err);
  }
};
