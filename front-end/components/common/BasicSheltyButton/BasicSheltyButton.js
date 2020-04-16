import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import { SIZES, COLORS } from '../../../constants/theme';
import { Icon, Button } from 'react-native-elements';

const BasicSheltyButton = ({ onPress, disabled, containerStyle, buttonContainerStyle, buttonStyle, text, titleStyle }) => {
  return (
    <LinearGradient
      colors={['#A653B3', '#6834A5']}
      start={[0, 0]}
      end={[1, 1]}
      style={[containerStyle]}
    >
      <Button
        title={text}
        onPress={onPress}
        raised
        type="clear"
        disabled={disabled}
        containerStyle={[buttonContainerStyle]}
        buttonStyle={[buttonStyle]}
        titleStyle={[styles.profileButtonText, titleStyle]}
      />
    </LinearGradient>
  );
};

BasicSheltyButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  containerStyle: PropTypes.shape({}),
  buttonContainerStyle: PropTypes.shape({}),
  buttonStyle: PropTypes.shape({}),
  disabled: PropTypes.bool,
  titleStyle: PropTypes.shape({})
};

BasicSheltyButton.defaultProps = {
  containerStyle: {},
  buttonContainerStyle: {},
  buttonStyle: {},
  disabled: false,
  titleStyle: {}
};

const styles = StyleSheet.create({
  profileButtonText: {
    fontSize: SIZES.NORMAL_TEXT,
    color: COLORS.WHITE_F9,
    textAlign: 'center',
    alignSelf: 'center'
  },
});

export default BasicSheltyButton;
