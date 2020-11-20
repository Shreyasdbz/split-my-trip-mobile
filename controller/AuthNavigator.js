/** @format */

import { createSwitchNavigator } from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import LoadingScreen from "../screens/LoadingScreen";

const AuthNavigator = createSwitchNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Loading: {
      screen: LoadingScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  { initialRouteName: "Loading" }
  // {
  //   mode: "modal",
  // }
);

export default AuthNavigator;
