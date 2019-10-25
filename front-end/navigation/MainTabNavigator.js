import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { Icon } from 'react-native-elements';

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from '../scenes/Home';
import SheltersScreen from '../scenes/Shelters';
import NewPostScreen from '../scenes/NewPost/NewPostScreen';
import BlogScreen from '../scenes/Blog';
import ProfileScreen from '../scenes/Profile';

import { COLORS, SIZES } from '../constants/theme';

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: 'Anasayfa'
    })
  }
});

HomeStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Icon
      type="feather"
      name="home"
      size={SIZES.MENU_ICON}
      color={focused ? COLORS.PRIMARY : COLORS.TEXT}
      key="Anasayfa"
    />
  )
};

const SheltersStack = createStackNavigator({
  Shelters: {
    screen: SheltersScreen,
    navigationOptions: () => ({
      title: 'Barınaklar'
    })
  }
});

SheltersStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Icon
      type="feather"
      name="heart"
      size={SIZES.MENU_ICON}
      color={focused ? COLORS.PRIMARY : COLORS.TEXT}
      key="shelters"
    />
  )
};

const NewPostStack = createStackNavigator({
  NewPost: {
    screen: NewPostScreen,
    navigationOptions: () => ({
      title: 'Yeni İçerik'
    })
  }
});

NewPostStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Icon
      type="feather"
      name="plus-circle"
      size={SIZES.NEW_POST_ICON}
      color={COLORS.ORANGE}
      key="new-post"
    />
  )
};

const BlogStack = createStackNavigator({
  Blog: {
    screen: BlogScreen,
    navigationOptions: () => ({
      title: 'Blog'
    })
  }
});

BlogStack.navigationOptions = {
  title: 'Blog',
  tabBarIcon: ({ focused }) => (
    <Icon
      type="feather"
      name="align-left"
      size={SIZES.MENU_ICON}
      color={focused ? COLORS.PRIMARY : COLORS.TEXT}
      key="blog"
    />
  )
};

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      title: 'Profil'
    })
  }
});

ProfileStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Icon
      type="feather"
      name="user"
      size={SIZES.MENU_ICON}
      color={focused ? COLORS.PRIMARY : COLORS.TEXT}
      key="profile"
    />
  )
};

export default createBottomTabNavigator(
  {
    HomeStack,
    SheltersStack,
    NewPostStack,
    BlogStack,
    ProfileStack
  },
  {
    tabBarOptions: {
      showLabel: false
    }
  }
);
