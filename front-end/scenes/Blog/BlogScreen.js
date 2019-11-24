import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
  Platform,
  ActivityIndicator
} from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Image, Icon, Button } from 'react-native-elements';
import { AppLoading } from 'expo';
import moment from 'moment';

import { POSTS } from '../../constants';
import { COLORS } from '../../constants/theme';
import { CAROUSEL_ITEMS } from '../../constants';
import SinglePost from '../../components/SinglePost/SinglePost';
import SheltyCarousel from '../../components/SheltyCarousel/SheltyCarousel';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const BlogScreen = ({ posts }) => {
  return !POSTS ? (
    <AppLoading />
  ) : (
    <ScrollView>
      <SheltyCarousel data={CAROUSEL_ITEMS} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={POSTS}
        renderItem={({ item }) => <SinglePost item={item} key={item.id} />}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
};

export default BlogScreen;
