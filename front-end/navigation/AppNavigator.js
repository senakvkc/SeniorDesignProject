import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthNavigator from './AuthNavigator';
import AuthLoadingScreen from '../scenes/AuthLoading';
import BottomTabNavigator from './BottomTabNavigator';

export default createAppContainer(
  createSwitchNavigator({
    // AuthLoading: AuthLoadingScreen,
    // Auth: AuthNavigator,
    MainTabs: BottomTabNavigator
  })
);
