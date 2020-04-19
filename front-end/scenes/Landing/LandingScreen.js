import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import Background from '../../assets/bg.svg';
import LogoText from '../../components/common/LogoText';
import MainButton from '../../components/common/MainButton';


const LandingScreen = ({ t, navigation }) => {
  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const goToRegister = () => {
    navigation.navigate('RegisterStepOne');
  };

  const MainText = ({ text }) => (
    <Text style={styles.mainText}>{text}</Text>
  );

  MainText.propTypes = {
    text: PropTypes.string.isRequired
  }

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Background />
      </View>

      <LogoText text={t('shelty')} />

      <View style={styles.mainContainer}>
        <MainText text={t('shareLanding')} />
        <MainText text={t('adoptLanding')} />
        <MainText text={t('showLoveLanding')} />
      </View>
      
      <View style={styles.actionContainer}>
        <MainButton onPress={goToLogin} text={t('login')} />
        <MainButton onPress={goToRegister} text={t('register')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  mainText: {
    fontSize: 30,
    color: "#fff",
    textAlign: 'center',
    fontFamily: 'Raleway',
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  actionContainer: {
    width: 120
  }
});

LandingScreen.propTypes = {
  t: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired
}

export default withTranslation()(LandingScreen);
