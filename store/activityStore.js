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
    var newID = uuid();
    var currentList = await AsyncStorage.getItem(ACTIVITY_KEY);
    if (currentList === null) {
      // New Activity List
      currentList = [];
      var activity = {
        id: newID,
        tripID: input_tripID,
        name: input_activityName,
        cost: input_activityCost,
        payerID: input_activityPayerID,
        payerName: input_activityPayerName,
        pickerList: input_activityPickerList,
      };
      currentList.push(activity);

      const sendValue = JSON.stringify(currentList);
      return await AsyncStorage.setItem(ACTIVITY_KEY, sendValue);
    } else {
      // Add to Activity List
      currentList = JSON.parse(currentList);
      var activity = {
        id: newID,
        tripID: input_tripID,
        name: input_activityName,
        cost: input_activityCost,
        payerID: input_activityPayerID,
        payerName: input_activityPayerName,
        pickerList: input_activityPickerList,
      };
      currentList.push(activity);

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
  input_activityPayerID,
  input_activityPayerName,
  input_activityPickerList
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
          currentList[i].payerID = input_activityPayerID;
          currentList[i].payerName = input_activityPayerName;
          currentList[i].pickerList = input_activityPickerList;
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

// ------------------------------------------------------------------------
// UPDATE ACTIVITIES -- PEOPLE NAMES
// ------------------------------------------------------------------------
export const updateActivities_peopleNames = async (
  input_tripID,
  peopleList
) => {
  try {
    const ACTIVITY_KEY = "@activitiesList@" + input_tripID;
    var currentList = await AsyncStorage.getItem(ACTIVITY_KEY);
    if (currentList === null) {
      return null;
    } else {
      currentList = JSON.parse(currentList);
      // Update the payer's name
      for (let i = 0; i < peopleList.length; i++) {
        for (let j = 0; j < currentList.length; j++) {
          var person = peopleList[i];
          var act = currentList[j];
          if (act.payerID === person.id) {
            if (act.payerName !== person.name) {
              act.payerName = person.name;
            }
          }
        }
      }
      // Update pickerList names
      for (let i = 0; i < currentList.length; i++) {
        var act = currentList[i];
        for (let j = 0; j < act.pickerList.length; j++) {
          // cycle through each name in participant list for each name in pickerList
          var per = act.pickerList[j];
          for (let k = 0; k < peopleList.length; k++) {
            var par = peopleList[k];
            if (par.id === per.id) {
              per.name = par.name;
              per.value = par.id;
              per.label = par.name;
            }
          }
        }
      }

      // Pack up the data
      const sendValue = JSON.stringify(currentList);
      return await AsyncStorage.setItem(ACTIVITY_KEY, sendValue);
    }
  } catch (err) {
    console.log("AS - updateActivities_newPeople - ERR: ", err);
  }

  //
};

// ------------------------------------------------------------------------
// UPDATE ACTIVITIES -- FULL LIST
// ------------------------------------------------------------------------
export const updateActivities_fullList = async (
  input_tripID,
  newActivities
) => {
  try {
    const ACTIVITY_KEY = "@activitiesList@" + input_tripID;
    const sendData = JSON.stringify(newActivities);

    return await AsyncStorage.setItem(ACTIVITY_KEY, sendData);
  } catch (err) {
    console.log("AS - updateActivities_fullList - ERR: ", err);
  }

  //
};
