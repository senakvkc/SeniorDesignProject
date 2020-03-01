import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { SIZES, COLORS } from '../../constants/theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ProfileInfoCard = () => {
  return (
    <>
      <View style={styles.mainInfoMask} />

      <View style={styles.mainInfoContainer}>
        <View style={styles.mainLeft}>
          <Text style={styles.title}>Daisy</Text>
          <Text style={styles.breed}>Abnisian Cat</Text>
          <View style={styles.location}>
            <Icon type="feather" name="map-pin" size={SIZES.SMALL_TEXT} color={COLORS.SILVER_PINK} />
            <Text style={styles.locationText}>Sarıyer, İstanbul</Text>
          </View>
        </View>

        <View style={styles.mainRight}>
          <Icon type="ionicon" name="ios-female" size={SIZES.SMALL_TEXT} color={COLORS.BLACK_A} />
          <Text style={styles.age}>2 aylık</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainInfoMask: {
    position: 'absolute',
    left: 33,
    top: -37,
    width: screenWidth - 60,
    backgroundColor: COLORS.MASK,
    borderRadius: 10,
    height: 80
  },
  mainInfoContainer: {
    position: 'relative',
    bottom: 40,
    width: screenWidth - 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    height: 80
  },
  mainLeft: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'space-between'
  },
  title: {
    fontWeight: '600',
    fontSize: SIZES.BIG_TEXT
  },
  breed: {
    fontWeight: '400',
    fontSize: SIZES.SMALL_TEXT,
    color: COLORS.BLACK_63
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  locationText: {
    marginLeft: 5,
    fontSize: SIZES.SMALL_TEXT,
    fontWeight: '400',
    color: COLORS.BLACK_A
  },
  mainRight: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: 10,
    justifyContent: 'space-evenly'
  },
  age: {
    fontSize: SIZES.SMALL_TEXT,
    fontWeight: '400',
    color: COLORS.BLACK_63,
    alignContent: 'center',
    justifyContent: 'center'
  }
});

export default ProfileInfoCard;
