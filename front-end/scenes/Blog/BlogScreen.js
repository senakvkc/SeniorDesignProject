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

import { POSTS } from '../../constants';
import { AppLoading } from 'expo';
import { withTranslation } from 'react-i18next';
import { COLORS } from '../../constants/theme';
import { CAROUSEL_ITEMS } from '../../constants';
import moment from 'moment';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const BlogScreen = ({ t }) => {
  const carouselRef = useRef(null);

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

  const SinglePost = ({ item }) => {
    console.log(item.featuredImage);
    return (
      <View style={styles.postContainer}>
        <View style={styles.postImageContainer}>
          <Image
            resizeMode="cover"
            source={{ uri: item.featuredImage }}
            containerStyle={styles.featuredImage}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <View style={styles.postDetailContainer}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <View style={styles.postSubDetail}>
            <Icon
              iconStyle={styles.postDetailIcon}
              type="feather"
              name="clock"
              color={COLORS.PRIMARY}
              size={12}
            />
            <Text style={styles.postSubDetailText}>
              {moment().fromNow(item.createdAt)}
            </Text>
            <Icon
              iconStyle={styles.postDetailIcon}
              type="feather"
              name="user"
              color={COLORS.PRIMARY}
              size={12}
            />
            <Text style={styles.postSubDetailText}>{item.fullName}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.descriptionContainer}>
            <Text>{item.description.substring(0, 100) + '...'}</Text>
            <Button
              icon={
                <Icon
                  type="feather"
                  name="chevron-right"
                  size={12}
                  iconStyle={styles.moreButtonIcon}
                />
              }
              iconRight={true}
              title={'Devamını Oku'}
              containerStyle={styles.moreButtonContainer}
              buttonStyle={styles.moreButton}
              titleStyle={styles.moreButtonTitle}
            />
          </View>
        </View>
      </View>
    );
  };

  return !POSTS ? (
    <AppLoading />
  ) : (
    <ScrollView>
      <View style={styles.carouselContainer}>
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
      <FlatList
        showsVerticalScrollIndicator={false}
        data={POSTS}
        renderItem={({ item }) => <SinglePost item={item} key={item.id} />}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 30
  },
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
  },
  postContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 200,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15
  },
  postImageContainer: {
    flex: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    marginRight: 15
  },
  postDetailContainer: {
    flex: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    backgroundColor: COLORS.WHITE_LIGHT,
    padding: 15
  },
  featuredImage: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY
  },
  line: {
    width: 50,
    height: 1,
    marginVertical: 10,
    backgroundColor: COLORS.PRIMARY
  },
  postTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.PRIMARY,
    marginBottom: 5
  },
  postSubDetail: {
    flexDirection: 'row'
  },
  postSubDetailText: {
    fontSize: 12,
    lineHeight: 12,
    fontStyle: 'italic',
    color: COLORS.TEXT,
    fontWeight: '400',
    marginRight: 15,
    alignSelf: 'center'
  },
  postDetailIcon: {
    marginRight: 5,
    alignSelf: 'center'
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  moreButton: {
    backgroundColor: COLORS.PRIMARY,
    width: 120,
    height: 30,
    alignSelf: 'flex-end'
  },
  moreButtonTitle: {
    fontSize: 12,
    alignSelf: 'center'
  },
  moreButtonIcon: {
    color: COLORS.WHITE,
    alignSelf: 'center'
  }
});

export default withTranslation()(BlogScreen);
