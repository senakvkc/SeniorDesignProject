import React, { useRef } from 'react';
import { View, Text, Dimensions, StyleSheet, Platform } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { CAROUSEL_ITEMS } from '../../constants';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SheltyCarousel = ({ data }) => {
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

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={150}
        itemWidth={screenWidth - 60}
        data={data}
        renderItem={renderCarouselItem}
        hasParallaxImages={true}
      />
    </View>
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
  }
});

export default SheltyCarousel;
