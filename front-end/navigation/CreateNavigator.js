import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import CreateScreen from '../scenes/Create';
import CreatePet from '../scenes/Create/CreatePet';
import CreateAdditional from '../scenes/Create/CreateAdditional';
import CreateFinal from '../scenes/Create/CreateFinal';

const CreateNavigator = createStackNavigator(
  {
    Create: {
      screen: CreateScreen,
    },
    CreatePet: {
      screen: CreatePet,
    },
    CreateAdditional: {
      screen: CreateAdditional,
    },
    CreateFinal: {
      screen: CreateFinal,
    },
  }, 
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

export default CreateNavigator;
