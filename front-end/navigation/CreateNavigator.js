import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import CreateScreen from '../scenes/Create';
import CreatePet from '../scenes/Create/CreatePet';
import { NAVIGATION_OPTIONS } from './NavigationOptions';
import { COLORS } from '../constants/theme';

const CreateNavigator = createStackNavigator({
  Create: {
    screen: CreateScreen,
    navigationOptions: NAVIGATION_OPTIONS
  },
  CreatePet: {
    screen: CreatePet,
    navigationOptions: {
      headerTitle: 'Create Pet',
      headerTitleStyle: {
        color: COLORS.PURPLE
      },
      headerTintColor: COLORS.PURPLE
    }
  }
});

export default CreateNavigator;
