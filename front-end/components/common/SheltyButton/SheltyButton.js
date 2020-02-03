import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import { SIZES, COLORS } from '../../../constants/theme';

const SheltyButton = (
  {
    buttonStyles,
    gradientStyles,
    textStyles,
    activeOpacity,
    onPressFunction,
    colors,
    text,
    icon,
    subText,
    subTextStyle
  },
  props
) => {
  return (
    <>
      <View style={styles.shadow}></View>
      <TouchableOpacity style={buttonStyles} activeOpacity={0.8} onPress={onPressFunction}>
        <LinearGradient colors={colors} start={[0, 0]} end={[1, 1]} style={gradientStyles}>
          <Text style={textStyles}>{text}</Text>
          {subText && <Text style={subTextStyle}>{subText}</Text>}
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
};

SheltyButton.propTypes = {
  buttonStyles: PropTypes.object,
  textStyles: PropTypes.object,
  buttonStyles: PropTypes.object,
  activeOpacity: PropTypes.number,
  colors: PropTypes.arrayOf(PropTypes.string),
  text: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  onPressFunction: PropTypes.func,
  subText: PropTypes.string,
  subTextStyle: PropTypes.object
};

SheltyButton.defaultProps = {
  buttonStyles: {},
  textStyles: {
    fontSize: SIZES.NORMAL_TEXT,
    color: COLORS.WHITE_F9,
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: 35
  },
  gradientStyles: {},
  colors: ['#A653B3', '#6834A5'],
  activeOpacity: 0.8,
  onPressFunction: () => {},
  subText: null
};

const styles = StyleSheet.create({
  shadow: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 105,
    left: 5,
    backgroundColor: COLORS.MASK
  }
});

export default SheltyButton;
