import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import LandingScreen from '../scenes/Landing';
import LoginScreen from '../scenes/Login';
import RegisterStepOneScreen from '../scenes/Register/StepOne';
import RegisterStepTwoScreen from '../scenes/Register/StepTwo';

const AuthNavigator = createStackNavigator(
  {
    Landing: {
      screen: LandingScreen
    },
    Login: {
      screen: LoginScreen
    },
    RegisterStepOne: {
      screen: RegisterStepOneScreen
    },
    RegisterStepTwo: {
      screen: RegisterStepTwoScreen
    }
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

export default AuthNavigator;
