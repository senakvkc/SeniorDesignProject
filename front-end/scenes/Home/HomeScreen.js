import React, { useState, useEffect, useRef } from 'react';
import { AppLoading } from 'expo';
import {
  FlatList,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  View,
  ScrollView
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

import _ from 'lodash';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import {
  BOTTOM_NAV_TABS,
  STORIES,
  CAROUSEL_ITEMS,
  MENU_ITEMS,
  LAST_ITEMS
} from '../../constants';

import BlogScreen from '../Blog';
import ProfileScreen from '../Profile';
import SheltersScreen from '../Shelters';
import AnimalCard from '../../components/AnimalCard/AnimalCard';
import StoryPanel from '../../components/StoryPanel';

const { width: screenWidth } = Dimensions.get('window');

const HomeScreen = (props, { navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  const carouselRef = useRef(null);

  async function loadFonts() {
    await Font.loadAsync({
      Roboto: require('../../assets/fonts/Roboto-Regular.ttf'),
      Roboto_medium: require('../../assets/fonts/Roboto-Medium.ttf'),
      ...Ionicons.font
    });
  }

  const openCamera = () => {
    console.log('openCamera');
  };

  const showSettings = () => {
    console.log('showSettings');
  };

  const makeDonate = () => {
    console.log('makeDonate');
  };

  const openSearch = () => {
    console.log('openSearch');
  };

  useEffect(() => {
    loadFonts().then(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    props.navigation.setParams({
      openCamera,
      makeDonate,
      openSearch,
      showSettings
    });
  }, []);

  const renderIcon = icon => ({ isActive }) => (
    <Icon
      style={{
        fontSize: icon === 'add' ? 40 : 24,
        color: icon === 'add' ? '#d6402c' : '#504746'
      }}
      name={icon}
    />
  );

  const renderCarouselItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.carouselItem}>
        <ParallaxImage
          source={{ uri: item.thumbnail }}
          containerStyle={styles.carouselImageContainer}
          style={styles.carouselImage}
          parallaxFactor={0.4}
          {...parallaxProps}
          key={item.id}
        />
        <Text style={styles.carouselTitle} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    );
  };

  return isLoading ? (
    <AppLoading />
  ) : (
    <>
      <ScrollView>
        <StoryPanel stories={STORIES} />
        <View>
          <Carousel
            ref={carouselRef}
            sliderWidth={screenWidth}
            sliderHeight={150}
            itemWidth={screenWidth - 60}
            data={CAROUSEL_ITEMS}
            renderItem={renderCarouselItem}
            hasParallaxImages={true}
          />
        </View>
        {/* Animal Cards */}
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={LAST_ITEMS}
            renderItem={({ item }) => <AnimalCard item={item} key={item.id} />}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
    </>
  );
};

HomeScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Shelty',
  headerLeft: (
    <Button
      icon={<Icon name="camera" type="feather" color="#b89685" size={20} />}
      type="clear"
      containerStyle={styles.headerLeftButton}
      onPress={navigation.getParam('openCamera')}
    />
  ),
  headerRight: (
    <>
      <Button
        icon={<Icon name="search" type="feather" color="#504746" size={20} />}
        type="clear"
        onPress={navigation.getParam('openSearch')}
      />
      <Button
        icon={
          <Icon name="credit-card" type="feather" color="#504746" size={20} />
        }
        type="clear"
        onPress={navigation.getParam('makeDonate')}
      />
      <Button
        icon={
          <Icon name="more-vertical" type="feather" color="#504746" size={20} />
        }
        type="clear"
        containerStyle={styles.headerRightButton}
        onPress={navigation.getParam('showSettings')}
      />
    </>
  )
});

const styles = StyleSheet.create({
  carouselItem: {
    width: screenWidth - 60,
    height: 150
  },
  carouselImageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8
  },
  carouselImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain'
  },
  carouselTitle: {
    fontSize: 14,
    position: 'relative',
    top: -30,
    left: 20,
    marginBottom: 10,
    color: '#f0f0f0'
  }
});

export default HomeScreen;