import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';

import { validateField, validateFields, validateEmptyFields } from '../../../utils/Validator';
import Background from '../../../assets/bg.svg';
import { COLORS, SIZES } from '../../../constants/theme';
import LoginScreen from '../../Login';
import { fieldGenerator } from '../../../utils/Generator';

const { width: WIDTH } = Dimensions.get('window');

const RegisterStepOneScreen = ({ t, navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerData, setRegisterData] = useState({
    email: null,
    phone: null,
    password: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: null,
    phone: null,
    password: null
  });

  useEffect(() => {
    // for testing purposes
    // setEmail(fieldGenerator('email'));
    // setPhone(fieldGenerator('phone'));
  }, []);

  removeError = type => {
    setErrors({ ...errors, [type]: null });
  };

  handleFormChange = (value, type) => {
    setRegisterData({ ...registerData, [type]: value });
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const nextStep = () => {
    const errorResult = validateFields({ ...registerData });
    console.log('errorResult: ', errorResult);
    if (!_.some()) {
      console.log('validated!, going to next step');
      navigation.navigate('RegisterStepTwo', { registerData });
    } else {
      setErrors({ ...errorResult });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Background />
      </View>

      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Shelty</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>E-posta</Text>
          <View style={styles.input}>
            <Icon name="md-mail" size={SIZES.NORMAL_TEXT} color={COLORS.LAVENDER} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              value={registerData.email}
              underlineColorAndroid="transparent"
              onChangeText={text => handleFormChange(text, 'email')}
            />
          </View>
          <Text style={styles.errorText}>{errors && errors.email}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Telefon</Text>
          <View style={styles.input}>
            <Icon name="md-phone-portrait" size={SIZES.NORMAL_TEXT} color={COLORS.LAVENDER} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              value={registerData.phone}
              underlineColorAndroid="transparent"
              onChangeText={text => handleFormChange(text, 'phone')}
            />
          </View>
          <Text style={styles.errorText}>{errors && errors.phone}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Şifre</Text>
          <View style={styles.input}>
            <Icon name="md-lock" size={SIZES.NORMAL_TEXT} color={COLORS.LAVENDER} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              value={registerData.password}
              secureTextEntry={!showPassword}
              underlineColorAndroid="transparent"
              onChangeText={text => handleFormChange(text, 'password')}
            />
            <View style={styles.showPasswordButton}>
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} activeOpacity={0.8}>
                <Icon name={!showPassword ? 'md-eye' : 'md-eye-off'} size={SIZES.NORMAL_TEXT} color={COLORS.LAVENDER} />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.errorText}>{errors && errors.password}</Text>
        </View>

        <View style={styles.actionContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              disabled={validateEmptyFields({ ...registerData })}
              onPress={nextStep}
              activeOpacity={0.8}
            >
              <Text style={validateEmptyFields({ ...registerData }) ? styles.disabledButtonText : styles.buttonText}>
                Sonraki Adım
              </Text>
            </TouchableOpacity>
            <Icon
              name="md-arrow-forward"
              size={SIZES.NORMAL_TEXT}
              color={validateEmptyFields({ ...registerData }) ? COLORS.DARK_GREY : COLORS.PIGMENT}
              style={styles.nextIcon}
            />
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Üyeliğiniz var mı?</Text>
            <TouchableOpacity onPress={goToLogin} style={styles.basicButton} activeOpacity={0.8}>
              <Text style={styles.actionText}>Giriş Yap</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    color: COLORS.LAVENDER,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE_LIGHT,
    borderRadius: 5,
    width: 200,
    height: 40,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 4 }
  },
  showPasswordButton: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'center',
    alignContent: 'flex-end',
    marginHorizontal: 10
  },
  buttonText: {
    textAlign: 'center',
    color: COLORS.PIGMENT
  },
  disabledButtonText: {
    textAlign: 'center',
    color: COLORS.DARK_GREY
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 15
  },
  logoText: {
    color: COLORS.WHITE,
    fontSize: SIZES.TITLE_TEXT,
    marginVertical: 10,
    opacity: 0.7
  },
  inputContainer: {
    alignItems: 'flex-start',
    marginBottom: 25
  },
  inputText: {
    color: COLORS.WHITE_LIGHT,
    fontSize: SIZES.SMALL_TEXT,
    marginBottom: 10
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE_LIGHT,
    borderRadius: 5,
    width: 200,
    height: 40,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 4 }
  },
  inputIcon: {
    marginHorizontal: 10
  },
  textInput: {
    color: COLORS.TEXT,
    fontSize: SIZES.SMALL_TEXT,
    flex: 1
  },
  nextIcon: {
    alignSelf: 'center',
    marginLeft: 10
  },
  actionText: {
    color: COLORS.LAVENDER,
    fontSize: SIZES.SMALL_TEXT
  },
  loginContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10
  },
  loginText: {
    color: COLORS.WHITE_LIGHT,
    fontSize: SIZES.SMALL_TEXT,
    marginRight: 5
  },
  errorText: {
    fontSize: SIZES.SMALL_TEXT,
    color: COLORS.LAVENDER,
    fontWeight: '400',
    marginTop: 5
  }
});

export default withTranslation()(RegisterStepOneScreen);
