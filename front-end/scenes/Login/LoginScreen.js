import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';

import bgImage from '../../assets/login.jpg';
import logo from '../../assets/logo.png';

import { COLORS, SIZES } from '../../constants/theme';
import { Button } from 'react-native-elements';

const { width: WIDTH } = Dimensions.get('window');

const LoginScreen = ({ t }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState(null);
  const [password, setPassword] = useState(null);

  handleLogin = () => {
    // validation -> if valid login -> if not error
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const phoneRegex = /(05|5)([0-9]){9}/;

    // validate fields.
    if (_.isEmpty(_.trim(password)) || _.isEmpty(_.trim(emailOrPhone))) {
      Alert.alert('Tüm alanları doldurun.');
      return;
    }

    // check if email or phone is valid.
    if (
      !_.isEqual(_.first(emailRegex.exec(emailOrPhone)), emailOrPhone) &&
      !_.isEqual(_.first(phoneRegex.exec(emailOrPhone)), emailOrPhone)
    ) {
      Alert.alert('Geçersiz e-posta/telefon.');
      return;
    }

    // now, send request to backend.
    const userLoginInput = {
      emailOrPhone,
      password,
      expiration: 60
    };

    const loginQuery = {
      query: `
        query login($userLoginInput: UserLoginInput){
          login(userLoginInput: $userLoginInput) {
            userId
            token
            expiration
          }
        }
      `,
      variables: {
        userLoginInput
      }
    };

    fetch(`http://192.168.56.1:8080/graphql`, {
      method: 'POST',
      body: JSON.stringify(loginQuery),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error(`Something went wrong.`);
        }

        return res.json();
      })
      .then(resData => {
        if (resData.data && resData.data.login && resData.data.login.token) {
          const { userId, token, expiration, user } = resData.data.login;
          console.log(resData);
        }
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  };

  return (
    <ImageBackground
      source={bgImage}
      style={styles.backgroundContainer}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.logoText}>{t('welcome')}</Text>
      </View>

      <View styles={styles.inputContainer}>
        <Icon
          name="md-person"
          size={SIZES.INPUT_TEXT}
          color={COLORS.INPUT}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          value={emailOrPhone}
          placeholder={t('emailInput')}
          placeholderTextColor={COLORS.INPUT}
          underlineColorAndroid="transparent"
          onChangeText={text => setEmailOrPhone(text)}
        />
      </View>

      <View styles={styles.inputContainer}>
        <Icon
          name="md-lock"
          size={SIZES.INPUT_TEXT}
          color={COLORS.INPUT}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder={t('passwordInput')}
          value={password}
          secureTextEntry={!showPassword}
          placeholderTextColor={COLORS.INPUT}
          underlineColorAndroid="transparent"
          onChangeText={text => setPassword(text)}
        />

        <TouchableOpacity
          style={styles.buttonEye}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon
            name={!showPassword ? 'md-eye' : 'md-eye-off'}
            size={SIZES.INPUT_TEXT}
            color={COLORS.INPUT}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.forgotPasswordContainer}>
        <Button
          title={t('forgotPasswordText')}
          onPress={() => console.log('forgot password')}
          type="clear"
          titleStyle={styles.forgotPasswordButton}
        />
      </View>
      <View style={styles.inputContainer}>
        <Button
          title={t('login')}
          onPress={handleLogin}
          buttonStyle={styles.loginButton}
        />
      </View>
      <View style={styles.registerContainer}>
        <Button
          title={t('registerText')}
          onPress={() => console.log('register')}
          titleStyle={styles.registerButton}
          type="clear"
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  logo: {
    width: 100,
    height: 100
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
  input: {
    width: WIDTH - 55,
    height: 50,
    borderRadius: 50,
    fontSize: SIZES.NORMAL_TEXT,
    paddingLeft: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: COLORS.INPUT,
    marginVertical: 10
  },
  inputIcon: {
    position: 'absolute',
    top: 18,
    left: 15
  },
  inputContainer: {
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonEye: {
    position: 'absolute',
    top: 18,
    right: 15
  },
  loginButton: {
    width: WIDTH - 55,
    height: 50,
    borderRadius: 50,
    backgroundColor: COLORS.BUTTON_PRIMARY,
    color: COLORS.WHITE_SOFT
  },
  forgotPasswordContainer: {
    width: WIDTH - 55,
    alignItems: 'flex-end'
  },
  forgotPasswordButton: {
    color: COLORS.BUTTON_PRIMARY
  },
  registerContainer: {
    width: WIDTH - 55,
    alignItems: 'center'
  },
  registerButton: {
    color: COLORS.BUTTON_PRIMARY
  }
});

export default withTranslation()(LoginScreen);
