import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { withTranslation } from 'react-i18next';
import Background from '../../assets/bg.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const LandingScreen = ({ t, navigation }) => {
  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const goToRegister = () => {
    navigation.navigate('RegisterStepOne');
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Background />
      </View>

      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Shelty</Text>
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.mainText}>Paylaş.</Text>
        <Text style={styles.mainText}>Sahiplen.</Text>
        <Text style={styles.mainText}>Sevgi göster.</Text>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={goToLogin} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToRegister} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Üye Ol</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  logoText: {
    fontSize: 32,
    color: COLORS.MAGNOLIA,
    textAlign: 'center'
  },
  mainText: {
    fontSize: 24,
    color: COLORS.WHITE_LIGHT,
    textAlign: 'center'
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: COLORS.WHITE_LIGHT,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 4 }
  },
  buttonText: {
    textAlign: 'center',
    color: COLORS.PIGMENT
  }
});

export default withTranslation()(LandingScreen);
