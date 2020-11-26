/** @format */

import AsyncStorage from "@react-native-community/async-storage";
import uuid from "react-uuid";

import { getRandomColorID } from "./colorStore";

const TRIPS_KEY = "@trips_list";

// ------------------------------------------------------------------------
// ADD NEW TRIP
// ------------------------------------------------------------------------
export const addTrip = async (inputTitle) => {
  try {
    var currentList = await AsyncStorage.getItem(TRIPS_KEY);
    if (currentList === null) {
      //   CASE 1: Make a new list
      const tripList = [];
      const tripObj = {
        id: uuid(),
        title: inputTitle,
        date: getFormattedDate(),
        colorID: getRandomColorID(),
      };
      tripList.push(tripObj);
      const sendValue = JSON.stringify(tripList);
      return await AsyncStorage.setItem(TRIPS_KEY, sendValue);
    } else {
      //   CASE 2: Add to existing list
      currentList = JSON.parse(currentList);
      const tripObj = {
        id: uuid(),
        title: inputTitle,
        date: getFormattedDate(),
        colorID: getRandomColorID(),
      };
      currentList.push(tripObj);
      const sendValue = JSON.stringify(currentList);
      return await AsyncStorage.setItem(TRIPS_KEY, sendValue);
    }
  } catch (err) {
    console.log("TS - addTrip - ERR[1]: ", err);
  }
};

// ------------------------------------------------------------------------
// GET ALL TRIPS
// ------------------------------------------------------------------------
export const getTrips = async () => {
  try {
    var currentList = await AsyncStorage.getItem(TRIPS_KEY);
    if (currentList === null) {
      return null;
    } else {
      currentList = JSON.parse(currentList);
      return currentList;
    }
  } catch (err) {
    console.log("TS - getTrips - ERR[1]: ", err);
  }
};

// ------------------------------------------------------------------------
// EDIT A TRIP
// ------------------------------------------------------------------------
export const editTrip = async (
  input_ID,
  input_title,
  input_date,
  input_colorID
) => {
  try {
    var currentList = await AsyncStorage.getItem(TRIPS_KEY);
    if (currentList === null) {
      return null;
    } else {
      currentList = JSON.parse(currentList);
      for (let i = 0; i < currentList.length; i++) {
        if (currentList[i].id == input_ID) {
          currentList[i].title = input_title;
          currentList[i].date = input_date;
          currentList[i].colorID = input_colorID;
        }
      }
      const sendValue = JSON.stringify(currentList);
      return await AsyncStorage.setItem(TRIPS_KEY, sendValue);
    }
  } catch (err) {
    console.log("TS - editTrip - ERR[1]: ", err);
  }
};

// ------------------------------------------------------------------------
// REMOVE A TRIP
// ------------------------------------------------------------------------
export const removeTrip = async (input_ID) => {
  try {
    var currentList = await AsyncStorage.getItem(TRIPS_KEY);
    if (currentList === null) {
      return null;
    } else {
      currentList = JSON.parse(currentList);
      var newList = [];
      for (let i = 0; i < currentList.lengthl; i++) {
        if (currentList[i].id !== input_ID) {
          newList.push(currentList[i]);
        }
      }

      const sendValue = JSON.stringify(newList);
      return await AsyncStorage.setItem(TRIPS_KEY, sendValue);
    }
  } catch (err) {
    console.log("TS - removeTrip - ERR[1]: ", err);
  }
};

// ------------------------------------------------------------------------
// DELTE ALL TRIPS
// ------------------------------------------------------------------------
export const removeTrips = async () => {
  try {
    return await AsyncStorage.removeItem(TRIPS_KEY);
  } catch (err) {
    console.log("TS - removeTrips - ERR[1]: ", err);
  }
};

// ------------------------------------------------------------------------
// Get a formatted date to add to the new Trip
// ------------------------------------------------------------------------
function getFormattedDate() {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = new Date();
  return (dt =
    d.getDate() + " " + monthNames[d.getMonth() + 1] + ", " + d.getFullYear());
}