import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { NAVIGATION_OPTIONS } from './NavigationOptions';
import HomeScreen from '../scenes/Home';
import SheltyCamera from '../components/SheltyCamera';
import TakenPhoto from '../components/TakenPhoto';
import SettingsScreen from '../scenes/Settings';
import CreateScreen from '../scenes/Create';
import _ from 'lodash';
import { COLORS } from '../constants/theme';
import CameraTrigger from '../components/CameraTrigger';
import SettingsTrigger from '../components/SettingsTrigger';


const screensWithHiddenBottomBar = ['SheltyCamera', 'TakenPhoto'];

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitleStyle: {
          flex: 1,
          textAlign: 'center',
          alignSelf: 'center',
          color: COLORS.PURPLE
        },
        headerStyle: {
          shadowColor: 'transparent',
          backgroundColor: COLORS.WHITE,
          elevation: 1
        },
        headerLeft: <CameraTrigger navigation={navigation} />,
        headerRight: <SettingsTrigger navigation={navigation} />
      }),
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
      navigationOptions: {
        header: null
      }
    },
  },
  {
    navigationOptions: ({ navigation }) => {
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
