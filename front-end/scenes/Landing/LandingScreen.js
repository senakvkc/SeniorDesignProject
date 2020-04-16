import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import { COLORS } from '../../constants/theme';
import Background from '../../assets/bg.svg';
import LogoText from '../../components/common/LogoText';


const LandingScreen = ({ t, navigation }) => {
  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const goToRegister = () => {
    navigation.navigate('RegisterStepOne');
  };

  const Button = ({ onPress, text }) => (
    <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={0.8}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );

  Button.propTypes = {
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
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
        <Button onPress={goToLogin} text={t('login')} />
        <Button onPress={goToRegister} text={t('register')} />
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
    color: COLORS.WHITE,
    textAlign: 'center',
    fontFamily: 'Raleway',
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: COLORS.WHITE,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 40,
    marginTop: 2,
    color: '#FE9595',
    fontFamily: 'RalewayBold',
  },
});

LandingScreen.propTypes = {
  t: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired
}

export default withTranslation()(LandingScreen);
