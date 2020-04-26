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
      navigationOptions: ({ navigation }) => ({
        title: i18n.t('createPet'),
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
    CreateAdditional: {
      screen: CreateAdditional,
      navigationOptions: ({ navigation }) => ({
        title: i18n.t('createPet'),
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
    CreateFinal: {
      screen: CreateFinal,
      navigationOptions: ({ navigation }) => ({
        title: i18n.t('createPet'),
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
    SheltyPicker: {
      screen: SheltyPicker
    }
  }, 
);

export default CreateNavigator;
