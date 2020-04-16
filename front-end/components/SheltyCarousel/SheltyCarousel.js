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
      </View>
    );
  };

  return (
    <View>
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
  }
});

export default SheltyCarousel;
