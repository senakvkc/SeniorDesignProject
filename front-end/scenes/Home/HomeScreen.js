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
  ScrollView,
  AsyncStorage
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
  LAST_ITEMS,
  ANIMALS
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

  useEffect(() => {
    loadFonts().then(() => {
      setIsLoading(false);
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
            data={ANIMALS}
            renderItem={({ item }) => <AnimalCard item={item} key={item.id} />}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
    </>
  );
};

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
