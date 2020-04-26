import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import LogoText from '../../components/common/LogoText';
import MainButton from '../../components/common/MainButton';
import bgImage from '../../assets/bg.png';

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
      <ImageBackground source={bgImage} style={styles.bgImage}>
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
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-evenly',
    alignItems: 'center'
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
