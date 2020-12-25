/** @format */

import AsyncStorage from "@react-native-community/async-storage";

import { getActivities } from "../store/activityStore";

function alreadyExists(inputID, pickerList) {
  var exists = false;
  for (let i = 0; i < pickerList.length; i++) {
    if (inputID === pickerList[i].id) {
      exists = true;
    }
  }
  return exists;
}

//
// Build a picker list for an activity
export const build_peopleList_newActivity = (peopleList) => {
  var list = [];
  for (var i = 0; i < peopleList.length; i++) {
    var p = peopleList[i];
    var item = {
      id: p.id,
      name: p.name,
      value: p.id,
      label: p.name,
      isParticipating: true,
    };
    list.push(item);
  }
  return list;
};

//
// Combine new people and add them to the picker list of an existing activity
export const build_peopleList_editActivity = (
  current_peopleList,
  activity_pickerList
) => {
  // add in new people that aren't in current_peopleList
  for (let i = 0; i < current_peopleList.length; i++) {
    // if found, update
    if (alreadyExists(current_peopleList[i].id, activity_pickerList)) {
      // update
      for (let a = 0; a < activity_pickerList.length; a++) {
        if (current_peopleList[i].id === activity_pickerList[a].id) {
          activity_pickerList[a].name = current_peopleList[i].name;
          activity_pickerList[a].value = current_peopleList[i].id;
          activity_pickerList[a].label = current_peopleList[i].name;
        }
      }
    }
    // else: if doesn't exist: new
    else {
      var item = {
        id: current_peopleList[i].id,
        name: current_peopleList[i].name,
        value: current_peopleList[i].id,
        label: current_peopleList[i].name,
        isParticipating: false,
      };
      activity_pickerList.push(item);
    }
  }

  return activity_pickerList;
};

//
// After a person is deleted, delete any activity they paid for / participated in
export const build_activitiesList_removePerson = async (
  input_tripID,
  input_personID
) => {
  const ACTIVITY_KEY = "@activitiesList@" + input_tripID;
  try {
    var activitiesList = await AsyncStorage.getItem(ACTIVITY_KEY);
    if (activitiesList === null) {
      return null;
    } else {
      activitiesList = JSON.parse(activitiesList);
      var tempList = [];
      // Remove activities with  input_personID == payerID
      for (let i = 0; i < activitiesList.length; i++) {
        var act = activitiesList[i];
        if (act.payerID !== input_personID) {
          tempList.push(act);
          //
        }
      }
      activitiesList = tempList;
      // Go through and edit activities to remove person from pickerList
      for (let i = 0; i < activitiesList.length; i++) {
        var tempPickerList = [];
        if (activitiesList[i].pickerList.length == 0) {
          //
        } else {
          for (let j = 0; j < activitiesList[i].pickerList.length; j++) {
            if (activitiesList[i].pickerList[j].id !== input_personID) {
              tempPickerList.push(activitiesList[i].pickerList[j]);
            }
          }
          activitiesList[i].pickerList = tempPickerList;
        }
      }

      return activitiesList;
    }
  } catch (err) {
    console.log("List Processors -- buildActL_rmPer -- ERR: ", err);
  }
  return activitiesList;
};
