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
import SearchBox from '../../components/SearchBox';
import PetCard from '../../components/PetCard';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const HomeScreen = (props, { navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [searchValue, setSearchValue] = useState('');

  async function loadFonts() {
    await Font.loadAsync({
      Quicksand_light: require('../../assets/fonts/Quicksand-Light.ttf'),
      Quicksand: require('../../assets/fonts/Quicksand-Regular.ttf'),
      Quicksand_medium: require('../../assets/fonts/Quicksand-Medium.ttf'),
      Quicksand_bold: require('../../assets/fonts/Quicksand-SemiBold.ttf'),
      ...Ionicons.font
    });
  }

  useEffect(() => {
    loadFonts().then(() => {
      setIsLoading(false);
    });
  }, []);

  handleSearch = value => {
    console.log(value);
    setSearchValue(value);
  };

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
      <ScrollView style={styles.scrollContainer}>
        <StoryPanel stories={STORIES} />
        <View style={styles.feedContainer}>
          <SearchBox filterIcon value={searchValue} onSearch={handleSearch} />
          {_.map(ANIMALS, pet => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  feedContainer: {
    flex: 1,
    flexGrow: 1,
    minHeight: 100,
    alignSelf: 'stretch',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.WHITE_FB,
    padding: 20,
    alignItems: 'center',
    elevation: 2
  }
});

export default HomeScreen;
