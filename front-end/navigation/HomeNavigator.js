import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Icon } from 'react-native-elements';

import HomeScreen from '../scenes/Home';
import SheltyCamera from '../components/SheltyCamera';
import TakenPhoto from '../components/TakenPhoto';
import SettingsScreen from '../scenes/Settings';
import CreateScreen from '../scenes/Create';
import _ from 'lodash';

import i18n from '../i18n';
import { COLORS } from '../constants/theme';
import { NO_SHADOW } from '../constants';
import CameraTrigger from '../components/CameraTrigger';
import SettingsTrigger from '../components/SettingsTrigger';
import BackHandler from '../components/common/BackHandler';


const screensWithHiddenBottomBar = ['SheltyCamera', 'TakenPhoto'];

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
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
      navigationOptions: ({ navigation }) => ({
        title: i18n.t('settings'),
        headerTitleStyle: {
          flex: 1,
          textAlign: 'center',
          alignSelf: 'center',
          color: '#FE9595',
          fontFamily: 'Raleway',
          fontSize: 18
        },
        headerStyle: {
          ...NO_SHADOW
        },
        headerLeft: <BackHandler navigation={navigation} />,
      })
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
