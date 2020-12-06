/** @format */

import AsyncStorage from "@react-native-community/async-storage";
import uuid from "react-uuid";

// ------------------------------------------------------------------------
// ADD NEW ACTIVITY
// ------------------------------------------------------------------------
export const addActivity = async (
  input_tripID,
  input_activityName,
  input_activityCost,
  input_activityPayerID,
  input_activityPayerName,
  input_activityPickerList
) => {
  const ACTIVITY_KEY = "@activitiesList@" + input_tripID;

  try {
    var currentList = await AsyncStorage.getItem(ACTIVITY_KEY);
    if (currentList === null) {
      // New Activity List
      currentList = [];
      var activity = {
        id: uuid(),
        tripID: input_tripID,
        name: input_activityName,
        cost: input_activityCost,
        payerID: input_activityPayerID,
        payerName: input_activityPayerName,
        pickerList: input_activityPickerList,
      };
      currentList.push(activity);
      // -----------------------------
      // TODO --- Update People store
      // -----------------------------
      const sendValue = JSON.stringify(currentList);
      return await AsyncStorage.setItem(ACTIVITY_KEY, sendValue);
    } else {
      // Add to Activity List
      currentList = JSON.parse(currentList);
      var activity = {
        id: uuid(),
        tripID: input_tripID,
        name: input_activityName,
        cost: input_activityCost,
        payerID: input_activityPayerID,
        payerName: input_activityPayerName,
        pickerList: input_activityPickerList,
      };
      currentList.push(activity);
      // -----------------------------
      // TODO --- Update People store
      // -----------------------------
      const sendValue = JSON.stringify(currentList);
      return await AsyncStorage.setItem(ACTIVITY_KEY, sendValue);
    }
  } catch (err) {
    console.log("TS -- addAcitivty -- ERR[1]: ", err);
  }
};

// ------------------------------------------------------------------------
// EDIT ACTIVITY
// ------------------------------------------------------------------------
export const editActivity = async (
  input_tripID,
  input_activityID,
  input_activityName,
  input_activityCost,
  input_activityPayer,
  input_activityParticipants
) => {
  const ACTIVITY_KEY = "@activitiesList@" + input_tripID;

  try {
    var currentList = await AsyncStorage.getItem(ACTIVITY_KEY);
    if (currentList === null) {
      console.log("AS -- editActivity -- null list");
      return null;
    } else {
      // Add to Activity List
      currentList = JSON.parse(currentList);
      for (let i = 0; i < currentList.length; i++) {
        if (currentList[i].id === input_activityID) {
          currentList[i].name = input_activityName;
          currentList[i].cost = input_activityCost;
          currentList[i].payer = input_activityPayer;
          currentList[i].participants = input_activityParticipants;
        }
      }
      const sendValue = JSON.stringify(currentList);
      return await AsyncStorage.setItem(ACTIVITY_KEY, sendValue);
    }
  } catch (err) {
    console.log("TS -- addAcitivty -- ERR[1]: ", err);
  }
};

// ------------------------------------------------------------------------
// REMOVE ACTIVITY
// ------------------------------------------------------------------------
export const removeActivity = async (input_tripID, input_activityID) => {
  const ACTIVITY_KEY = "@activitiesList@" + input_tripID;

  try {
    var currentList = await AsyncStorage.getItem(ACTIVITY_KEY);
    if (currentList === null) {
      console.log("AS -- removeActivity -- null list");
      return null;
    } else {
      currentList = JSON.parse(currentList);
      var newList = [];
      for (let i = 0; i < currentList.length; i++) {
        if (currentList[i].id !== input_activityID) {
          newList.push(currentList[i]);
        }
      }
      // If list empty, remove KEY
      if (newList.length === 0) {
        return AsyncStorage.removeItem(ACTIVITY_KEY);
      } else {
        const sendValue = JSON.stringify(newList);
        return await AsyncStorage.setItem(ACTIVITY_KEY, sendValue);
      }
    }
  } catch (err) {
    console.log("TS -- addAcitivty -- ERR[1]: ", err);
  }
};

// ------------------------------------------------------------------------
// GET ALL ACTIVITIES
// ------------------------------------------------------------------------
export const getActivities = async (input_tripID) => {
  const ACTIVITY_KEY = "@activitiesList@" + input_tripID;

  try {
    var currentList = await AsyncStorage.getItem(ACTIVITY_KEY);
    if (currentList === null) {
      return null;
    } else {
      currentList = JSON.parse(currentList);
      return currentList;
    }
  } catch (err) {
    console.log("TS -- addAcitivty -- ERR[1]: ", err);
  }
};
