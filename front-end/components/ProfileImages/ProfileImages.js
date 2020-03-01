import React from 'react';
import { View, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { SIZES, COLORS } from '../../constants/theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ProfileImages = () => {
  const goBack = () => {
    console.log('back');
  };

  const shareProfile = () => {
    console.log('share');
  };

  const prevImage = () => {
    console.log('prev image');
  };

  const nextImage = () => {
    console.log('next image');
  };

  return (
    <View style={styles.imagesContainer}>
      <ImageBackground source={{ uri: 'https://placedog.net/500/500' }} style={styles.image}>
        <View style={styles.actionContainer}>
          <Icon
            type="feather"
            name="arrow-left"
            size={SIZES.NORMAL_TEXT}
            color={COLORS.WHITE}
            onPress={goBack}
            style={styles.backIcon}
            activeOpacity={0}
          />
          <Icon
            type="feather"
            name="share"
            size={SIZES.NORMAL_TEXT}
            color={COLORS.WHITE}
            onPress={shareProfile}
            style={styles.shareIcon}
            activeOpacity={0}
          />
        </View>
        <View style={styles.imageActionContainer}>
          <Icon
            type="feather"
            name="chevron-left"
            size={SIZES.NORMAL_TEXT}
            color={COLORS.WHITE}
            onPress={prevImage}
            activeOpacity={0}
          />
          <Icon
            type="feather"
            name="chevron-right"
            size={SIZES.NORMAL_TEXT}
            color={COLORS.WHITE}
            onPress={nextImage}
            activeOpacity={0}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imagesContainer: {
    flex: 2,
    flexDirection: 'column'
  },
  actionContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    padding: 15
  },
  backIcon: {},
  shareIcon: {},
  image: {
    width: screenWidth,
    height: '100%'
  },
  imageActionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15
  }
});

export default ProfileImages;
