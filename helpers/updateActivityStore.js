/** @format */

import AsyncStorage from "@react-native-community/async-storage";
import { editActivity, removeActivity } from "../store/activityStore";

export const remove_person_action = async (tripID, personID) => {
  const ACTIVITY_KEY = "@activitiesList@" + input_tripID;
  try {
    var activitiesList = await AsyncStorage.getItem(ACTIVITY_KEY);
    if (activitiesList === null) {
      // No action
    } else {
      activitiesList = JSON.parse(activitiesList);
      for (let a = 0; a < activitiesList.length; a++) {
        // Go through payers & delete if found
        if (activitiesList[i].payerID === personID) {
          removeActivity(tripID, activitiesList[i].id).then((update) => {
            //   removed activity
          });
        }
        // Go through participants and delete participant if found
        var crrPickerList = activitiesList[i].pickerList;
        var newPickerList = [];
        for (let p = 0; p < crrPickerList.length; p++) {
          if (crrPickerList[p].id !== personID) {
            newPickerList.push(crrPickerList[p]);
          }
        }
        activitiesList[i].pickerList = newPickerList;
        //   TODO: Edit activity
      }
    }
  } catch (err) {
    console.log("remove_person_action ERR: ", err);
  }
};
