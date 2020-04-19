import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements';

import SheltersScreen from '../scenes/Shelters';
import BlogScreen from '../scenes/Blog';
import ProfileScreen from '../scenes/Profile';
import { SIZES, COLORS } from '../constants/theme';

import HomeNavigator from './HomeNavigator';
import BlogNavigator from './BlogNavigator';
import CreateNavigator from './CreateNavigator';

const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {}
    },
    Shelters: {
      screen: SheltersScreen,
      navigationOptions: {}
    },
    Create: {
      screen: CreateNavigator,
      navigationOptions: {}
    },
    Blog: {
      screen: BlogNavigator,
      navigationOptions: {}
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {}
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
        } else if (routeName === 'Shelters') {
          iconName = 'heart';
        } else if (routeName === 'Create') {
          iconName = 'plus-circle';
        } else if (routeName === 'Blog') {
          iconName = 'align-left';
        } else if (routeName === 'Profile') {
          iconName = 'user';
        }

        return (
          <Icon
            type="feather"
            name={iconName}
            size={routeName === 'Create' ? SIZES.NEW_POST_ICON : SIZES.MENU_ICON}
            color={routeName === 'Create' ? '#FE9595' : tintColor}
            key={routeName}
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: '#FE9595',
      inactiveTintColor: COLORS.BLACK_A,
      showLabel: false
    }
  }
);

export default BottomTabNavigator;
