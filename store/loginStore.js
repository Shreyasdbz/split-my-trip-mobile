/** @format */

import AsyncStorage from "@react-native-community/async-storage";

const USER_KEY = "@user_";

// USER Object:
// id
// name
// email
// photoSrc
// loginType

// ------------------------------------------------------------------------
// Store User
// @[userID]: generated using uuid
// @[loginType]: "GOOGLE" or "APPLE" or "OFFLINE"
// ------------------------------------------------------------------------
export const storeUser = async (user) => {
  var sendObj = JSON.stringify(user);
  try {
    return AsyncStorage.setItem(USER_KEY, sendObj);
  } catch (sendErr) {
    console.log("LS - Send Error: ", sendErr);
  }
};

// ------------------------------------------------------------------------
// Get Login Info for user
// ------------------------------------------------------------------------
export const getUserInfo = async () => {
  try {
    var getInfo = await AsyncStorage.getItem(USER_KEY);

    if (getInfo === null) {
      return null;
    } else {
      var rtnInfo = JSON.parse(getInfo);
      return rtnInfo;
    }
  } catch (err) {
    console.log("LS - getUserInfo err: ", err);
  }
};

// ------------------------------------------------------------------------
// Logout User
// ------------------------------------------------------------------------
export const logoutUser = async () => {
  try {
    return AsyncStorage.removeItem(USER_KEY);
  } catch (err) {
    console.log("LS - remove error: ", err);
  }
};

// ------------------------------------------------------------------------
// Delete All Local data
// ------------------------------------------------------------------------
export const deleteAllData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return await AsyncStorage.multiRemove(keys);
  } catch (err) {
    console.log("LS - delete all: ", err);
  }
};

// ios person logo: <a href="https://icons8.com/icon/99268/person">Person icon by Icons8</a>
