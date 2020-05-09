import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import CreateScreen from '../scenes/Create';
import CreatePet from '../scenes/Create/CreatePet';
import CreateAdditional from '../scenes/Create/CreateAdditional';
import CreateFinal from '../scenes/Create/CreateFinal';
import { NO_SHADOW } from '../constants';
import i18n from '../i18n';
import BackHandler from '../components/common/BackHandler';
import SheltyPicker from '../components/common/SheltyPicker';

const CreateNavigator = createStackNavigator(
  {
    Create: {
      screen: CreateScreen,
      headerMode: 'none',
      navigationOptions: {
        header: null,
        headerVisible: 'false'
      }
    },
    CreatePet: {
      screen: CreatePet,
      navigationOptions: {
        header: null,
        headerVisible: 'false'
      }
    },
    CreateAdditional: {
      screen: CreateAdditional,
      navigationOptions: {
        header: null,
        headerVisible: 'false'
      }
    },
    CreateFinal: {
      screen: CreateFinal,
      navigationOptions: {
        header: null,
        headerVisible: 'false'
      }
    },
    SheltyPicker: {
      screen: SheltyPicker
    }
  }, 
);

export default CreateNavigator;
