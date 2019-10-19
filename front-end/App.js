import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './scenes/Home';
import { createAppContainer } from 'react-navigation';
import SheltersScreen from './scenes/Shelters';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import BlogScreen from './scenes/Blog';
import ProfileScreen from './scenes/Profile';
import { Icon, Button } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import NewPostScreen from './scenes/NewPost/NewPostScreen';
import './i18n';

const openCamera = () => {
  console.log("camera");
}

const openSearch = () => {
  console.log("search");
}

const openDonate = () => {
  console.log("donate");
}
const openSettings = () => {
  console.log("settings");
}

const NAVIGATION_OPTIONS = ({ navigation }) => ({
  headerTitle: navigation.state.routeName,
  headerLeft: (
    <Button
      icon={<Icon name="camera" type="feather" color="#b89685" size={20} />}
      type="clear"
      containerStyle={styles.headerLeftButton}
      onPress={openCamera}
    />
  ),
  headerRight: (
    <>
      <Button
        icon={<Icon name="search" type="feather" color="#504746" size={20} />}
        type="clear"
        onPress={openSearch}
      />
      <Button
        icon={
          <Icon name="credit-card" type="feather" color="#504746" size={20} />
        }
        type="clear"
        onPress={openDonate}
      />
      <Button
        icon={
          <Icon name="more-vertical" type="feather" color="#504746" size={20} />
        }
        type="clear"
        containerStyle={styles.headerRightButton}
        onPress={openSettings}
      />
    </>
  )
});

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: NAVIGATION_OPTIONS
  }
});

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
            size={routeName === 'NewPost' ? 35 : 20}
            color={routeName === 'NewPost' ? '#D6692C' : tintColor}
            key={routeName}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: '#b89685',
      inactiveTintColor: '#504746',
      showLabel: false
    }
  }
);

const AppNavigator = createAppContainer(MainTabs);

class App extends Component {
  render() {
    return <AppNavigator />;
  }
}

const styles = StyleSheet.create({
  customIcon: {
    fontSize: 30,
    color: '#D6692C'
  },
  bottomTab: {}
});

export default App;
