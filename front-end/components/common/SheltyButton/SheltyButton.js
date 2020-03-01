import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import { SIZES, COLORS } from '../../../constants/theme';
import { Icon } from 'react-native-elements';

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
    subTextStyle,
    shadow,
    shadowHeight,
    shadowWidth,
    shadowBorderRadius,
    iconRight
  },
  props
) => {
  return (
    <TouchableOpacity style={buttonStyles} activeOpacity={0.8} onPress={onPressFunction}>
      {shadow && (
        <View
          style={{ borderRadius: shadowBorderRadius, height: shadowHeight, width: shadowWidth, ...styles.shadow }}
        ></View>
      )}
      <LinearGradient colors={colors} start={[0, 0]} end={[1, 1]} style={[gradientStyles, styles.buttonContainer]}>
        <View style={styles.buttonTextContainer}>
          <Text style={textStyles}>{text}</Text>
          {subText && <Text style={subTextStyle}>{subText}</Text>}
        </View>
        {iconRight && icon && icon}
      </LinearGradient>
    </TouchableOpacity>
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
  subTextStyle: PropTypes.object,
  shadow: PropTypes.bool,
  shadowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  shadowWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  shadowBorderRadius: PropTypes.number,
  iconRight: PropTypes.bool,
  icon: PropTypes.element
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
  subText: null,
  shadowHeight: '100%',
  shadowWidth: '100%',
  borderRadius: 10,
  shadow: false,
  iconRight: false,
  icon: null
};

const styles = StyleSheet.create({
  shadow: {
    position: 'absolute',
    top: 3,
    left: 3,
    backgroundColor: COLORS.MASK
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  buttonTextContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    position: 'absolute',
    right: 15,
    alignSelf: 'center'
  }
});

export default SheltyButton;
