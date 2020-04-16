import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import CreateScreen from '../scenes/Create';
import CreatePet from '../scenes/Create/CreatePet';
import CreateAdditional from '../scenes/Create/CreateAdditional';
import CreateFinal from '../scenes/Create/CreateFinal';

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
      headerTitle: 'Evcil Hayvan Ekle',
      headerTitleStyle: {
        color: COLORS.PURPLE
      },
      headerTintColor: COLORS.PURPLE
    }
  },
  CreateAdditional: {
    screen: CreateAdditional,
    navigationOptions: {
      headerTitle: '',
      headerTitleStyle: {
        color: COLORS.PURPLE
      },
      headerTintColor: COLORS.PURPLE
    }
  },
  CreateFinal: {
    screen: CreateFinal,
    navigationOptions: {
      headerTitle: '',
      headerTitleStyle: {
        color: COLORS.PURPLE
      },
      headerTintColor: COLORS.PURPLE
    }
  },
});

export default CreateNavigator;
