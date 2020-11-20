/** @format */

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// import AuthNavigator from "./AuthNavigator";

import HomeScreen from "../screens/HomeScreen";
import TripScreen from "../screens/TripScreen";

const AppNavigator = createStackNavigator(
  {
    // Auth: {
    //   screen: AuthNavigator,
    //   navigationOptions: {
    //     headerShown: false,
    //   },
    // },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Trip: {
      screen: TripScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  }
  // {
  //   initialRouteName: "Auth",
  // },
  // {
  //   mode: "modal",
  // }
);

export default createAppContainer(AppNavigator);
