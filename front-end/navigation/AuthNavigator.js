import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import LandingScreen from '../scenes/Landing';
import LoginScreen from '../scenes/Login';
import RegisterStepOneScreen from '../scenes/Register/StepOne';
import RegisterStepTwoScreen from '../scenes/Register/StepTwo';
import RegisterStepThreeScreen from '../scenes/Register/StepThree';
import PasswordResetStepOneScreen from '../scenes/PasswordReset/StepOne';
import PasswordResetStepTwoScreen from '../scenes/PasswordReset/StepTwo';
import PasswordResetStepThreeScreen from '../scenes/PasswordReset/StepThree';
import ActivateAccountStepOneScreen from '../scenes/ActivateAccount/StepOne';
import ActivateAccountStepTwoScreen from '../scenes/ActivateAccount/StepTwo';

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
    },
    RegisterStepThree: {
      screen: RegisterStepThreeScreen
    },
    PasswordResetStepOne: {
      screen: PasswordResetStepOneScreen
    },
    PasswordResetStepTwo: {
      screen: PasswordResetStepTwoScreen
    },
    PasswordResetStepThree: {
      screen: PasswordResetStepThreeScreen
    },
    ActivateAccountStepOne: {
      screen: ActivateAccountStepOneScreen
    },
    ActivateAccountStepTwo: {
      screen: ActivateAccountStepTwoScreen
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
