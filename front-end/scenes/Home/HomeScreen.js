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

import { BOTTOM_NAV_TABS, STORIES, CAROUSEL_ITEMS, MENU_ITEMS, LAST_ITEMS, ANIMALS } from '../../constants';

import BlogScreen from '../Blog';
import ProfileScreen from '../Profile';
import SheltersScreen from '../Shelters';
import AnimalCard from '../../components/AnimalCard/AnimalCard';
import StoryPanel from '../../components/StoryPanel';
import { COLORS } from '../../constants/theme';
import SheltyCarousel from '../../components/SheltyCarousel';

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

  return isLoading ? (
    <AppLoading />
  ) : (
    <View style={styles.container}>
      <ScrollView>
        <StoryPanel stories={STORIES} />
        <View>
          <SheltyCarousel data={CAROUSEL_ITEMS} />
        </View>
        {/* Animal Cards */}
        <View style={styles.animalCardContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={ANIMALS}
            renderItem={({ item }) => <AnimalCard item={item} key={item.id} />}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE_SOFTER
  },
  carouselItem: {
    width: screenWidth - 60,
    height: 150,
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden'
  },
  carouselImageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white'
  },
  carouselImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden'
  },
  carouselTitle: {
    fontSize: 14,
    position: 'relative',
    top: -30,
    left: 20,
    marginBottom: 10,
    color: '#f0f0f0'
  },
  animalCardContainer: {
    paddingHorizontal: 10
  }
});

export default HomeScreen;
