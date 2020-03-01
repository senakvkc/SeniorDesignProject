if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';
import { StyleSheet, AsyncStorage, View } from 'react-native';
import _ from 'lodash';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import HomeScreen from './scenes/Home';
import SheltersScreen from './scenes/Shelters';
import BlogScreen from './scenes/Blog';
import ProfileScreen from './scenes/Profile';
import SettingsScreen from './scenes/Settings';
import SheltyCamera from './components/SheltyCamera';
import TakenPhoto from './components/TakenPhoto';
import LoginScreen from './scenes/Login';
import AuthLoadingScreen from './scenes/AuthLoading';
import CreateScreen from './scenes/Create';
import CreatePet from './scenes/Create/CreatePet';
import LandingScreen from './scenes/Landing';

import './i18n';
import { COLORS, SIZES } from './constants/theme';
import { LAN_ADDRESS } from './constants';
import RegisterStepOneScreen from './scenes/Register/StepOne';
import RegisterStepTwoScreen from './scenes/Register/StepTwo';
import AppNavigator from './navigation/AppNavigator';

const openSearch = async navigation => {
  console.log('search');
};

const openDonate = () => {
  console.log('donate');
};
const openSettings = navigation => {
  navigation.navigate('Settings');
};

const screensWithHiddenBottomBar = ['SheltyCamera', 'TakenPhoto'];

const NAVIGATION_OPTIONS = ({ navigation }) => ({
  headerTitle: navigation.state.routeName,
  headerLeft: (
    <Button
      icon={<Icon name="camera" type="feather" color={COLORS.PRIMARY} size={SIZES.MENU_ICON} />}
      type="clear"
      containerStyle={styles.headerLeftButton}
      onPress={() => navigation.navigate('SheltyCamera')}
    />
  ),
  headerRight: (
    <>
      <Button
        icon={<Icon name="search" type="feather" color={COLORS.TEXT} size={SIZES.MENU_ICON} />}
        type="clear"
        onPress={() => openSearch(navigation)}
      />
      <Button
        icon={<Icon name="credit-card" type="feather" color={COLORS.TEXT} size={SIZES.MENU_ICON} />}
        type="clear"
        onPress={openDonate}
      />
      <Button
        icon={<Icon name="settings" type="feather" color={COLORS.TEXT} size={SIZES.MENU_ICON} />}
        type="clear"
        containerStyle={styles.headerRightButton}
        onPress={() => openSettings(navigation)}
      />
    </>
  )
});

const HomeStack = createStackNavigator(
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
      navigationOptions: {
        headerTitle: 'Settings'
      }
    },
    Create: {
      screen: CreateScreen,
      navigationOptions: {
        headerTitle: 'Create'
      }
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

const SheltersStack = createStackNavigator({
  Shelters: {
    screen: SheltersScreen,
    navigationOptions: NAVIGATION_OPTIONS
  }
});

const CreateStack = createStackNavigator({
  Create: {
    screen: CreateScreen,
    navigationOptions: NAVIGATION_OPTIONS
  },
  CreatePet: {
    screen: CreatePet
  }
});

const BlogStack = createStackNavigator({
  Blog: {
    screen: BlogScreen,
    navigationOptions: NAVIGATION_OPTIONS
  }
});

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: NAVIGATION_OPTIONS
  }
});

const AuthStack = createStackNavigator(
  {
    Landing: {
      screen: LandingScreen
    },
    Login: {
      screen: LoginScreen
    },
    RegisterStepOne: {
      screen: RegisterStepOneScreen
    },
    RegisterStepTwo: {
      screen: RegisterStepTwoScreen
    }
  },

  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

const MainTabs = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {}
    },
    Shelters: {
      screen: SheltersStack,
      navigationOptions: {}
    },
    Create: {
      screen: CreateStack,
      navigationOptions: {}
    },
    Blog: {
      screen: BlogStack,
      navigationOptions: {}
    },
    Profile: {
      screen: ProfileStack,
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
            color={routeName === 'Create' ? COLORS.ORANGE : tintColor}
            key={routeName}
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: COLORS.PRIMARY,
      inactiveTintColor: COLORS.TEXT,
      showLabel: false
    }
  }
);

// const AppNavigator = createAppContainer(
//   createSwitchNavigator(
//     {
//       AuthLoading: AuthLoadingScreen,
//       AuthStack: AuthStack,
//       MainTabs: MainTabs
//     },
//     {
//       initialRouteName: 'AuthLoading'
//     }
//   )
// );

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `${LAN_ADDRESS}:8080/graphql`
});

const client = new ApolloClient({
  cache,
  link
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppNavigator />
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  nextButton: {
    color: COLORS.PRIMARY
  }
});

export default App;
