import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import { SIZES, COLORS } from '../../../constants/theme';
import { Icon, Button } from 'react-native-elements';

const BasicSheltyButton = ({ onPress, containerStyle, buttonContainerStyle, buttonStyle, text }) => {
  return (
    <LinearGradient
      colors={['#A653B3', '#6834A5']}
      start={[0, 0]}
      end={[1, 1]}
      style={[containerStyle, styles.profileContainer]}
    >
      <Button
        title={text}
        onPress={onPress}
        raised
        type="clear"
        containerStyle={[buttonContainerStyle, styles.profileButtonContainer]}
        buttonStyle={[buttonStyle, styles.profileButton]}
        titleStyle={styles.profileButtonText}
      />
    </LinearGradient>
  );
};

BasicSheltyButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  containerStyle: PropTypes.object,
  buttonContainerStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
};

BasicSheltyButton.defaultProps = {
  containerStyle: {},
  buttonContainerStyle: {},
  buttonStyle: {}
};

const styles = StyleSheet.create({
  profileContainer: {
  },
  profileButton: {
  },
  profileButtonText: {
    fontSize: SIZES.NORMAL_TEXT,
    color: COLORS.WHITE_F9,
    textAlign: 'center',
    alignSelf: 'center'
  }
});

export default BasicSheltyButton;
