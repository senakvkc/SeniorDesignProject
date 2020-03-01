import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { NAVIGATION_OPTIONS } from './NavigationOptions';
import HomeScreen from '../scenes/Home';
import SheltyCamera from '../components/SheltyCamera';
import TakenPhoto from '../components/TakenPhoto';
import SettingsScreen from '../scenes/Settings';
import CreateScreen from '../scenes/Create';
import _ from 'lodash';

const screensWithHiddenBottomBar = ['SheltyCamera', 'TakenPhoto'];

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: NAVIGATION_OPTIONS
    },
    SheltyCamera: {
      screen: SheltyCamera,
      navigationOptions: {
        header: null
      }
    },
    TakenPhoto: {
      screen: TakenPhoto,
      navigationOptions: {
        header: null
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: NAVIGATION_OPTIONS
    },
    Create: {
      screen: CreateScreen,
      navigationOptions: NAVIGATION_OPTIONS
    }
  },
  {
    navigationOptions: ({ navigation }) => {
      console.log(navigation);
      let tabBarVisible = !_.includes(
        screensWithHiddenBottomBar,
        navigation.state.routes[navigation.state.index].routeName
      );

      return {
        tabBarVisible
      };
    }
  }
);

export default HomeNavigator;
