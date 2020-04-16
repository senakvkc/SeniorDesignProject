import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { SIZES, COLORS } from '../../constants/theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  
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
