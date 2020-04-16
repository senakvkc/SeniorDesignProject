import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { View, StyleSheet, Text } from 'react-native';

const LogoText = ({ text }) => {
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>{text}</Text>
    </View>
  );
};

LogoText.propTypes = {
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  logoText: {
    fontSize: 60,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Rancho',
    textTransform: 'lowercase',
  },
});

export default withTranslation()(LogoText);
