if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './scenes/Home';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import SheltersScreen from './scenes/Shelters';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import BlogScreen from './scenes/Blog';
import ProfileScreen from './scenes/Profile';
import { Icon, Button } from 'react-native-elements';
import { StyleSheet, AsyncStorage } from 'react-native';
import './i18n';
import _ from 'lodash';
import { COLORS, SIZES } from './constants/theme';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import NewPostScreen from './scenes/NewPost/NewPostScreen';
import SheltyCamera from './components/SheltyCamera';
import TakenPhoto from './components/TakenPhoto';
import LoginScreen from './scenes/Login';
import RegisterScreen from './scenes/Register';
import AuthLoadingScreen from './scenes/AuthLoading';

const openSearch = async navigation => {
  await AsyncStorage.removeItem('userToken');
  navigation.navigate('Login');
};

const openDonate = () => {
  console.log('donate');
};
const openSettings = () => {
  console.log('settings');
};

const screensWithHiddenBottomBar = ['SheltyCamera', 'TakenPhoto'];

const NAVIGATION_OPTIONS = ({ navigation }) => ({
  headerTitle: navigation.state.routeName,
  headerLeft: (
    <Button
      icon={
        <Icon
          name="camera"
          type="feather"
          color={COLORS.PRIMARY}
          size={SIZES.MENU_ICON}
        />
      }
      type="clear"
      containerStyle={styles.headerLeftButton}
      onPress={() => navigation.navigate('SheltyCamera')}
    />
  ),
  headerRight: (
    <>
      <Button
        icon={
          <Icon
            name="search"
            type="feather"
            color={COLORS.TEXT}
            size={SIZES.MENU_ICON}
          />
        }
        type="clear"
        onPress={() => openSearch(navigation)}
      />
      <Button
        icon={
          <Icon
            name="credit-card"
            type="feather"
            color={COLORS.TEXT}
            size={SIZES.MENU_ICON}
          />
        }
        type="clear"
        onPress={openDonate}
      />
      <Button
        icon={
          <Icon
            name="more-vertical"
            type="feather"
            color={COLORS.TEXT}
            size={SIZES.MENU_ICON}
          />
        }
        type="clear"
        containerStyle={styles.headerRightButton}
        onPress={openSettings}
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
    }
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

const SheltersStack = createStackNavigator({
  Shelters: {
    screen: SheltersScreen,
    navigationOptions: NAVIGATION_OPTIONS
  }
});

const NewPostStack = createStackNavigator({
  NewPost: {
    screen: NewPostScreen,
    navigationOptions: NAVIGATION_OPTIONS
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
    Login: {
      screen: LoginScreen
    },
    Register: {
      screen: RegisterScreen
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
    NewPost: {
      screen: NewPostStack,
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
        } else if (routeName === 'NewPost') {
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
            size={
              routeName === 'NewPost' ? SIZES.NEW_POST_ICON : SIZES.MENU_ICON
            }
            color={routeName === 'NewPost' ? COLORS.ORANGE : tintColor}
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

const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      AuthStack: AuthStack,
      MainTabs: MainTabs
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://192.168.1.4:8080/graphql'
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

const styles = StyleSheet.create({});

export default App;
