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
  Alert,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import {
  validateEmptyFields,
  validateEmailAndPhone,
  validatePhone,
  validateEmail
} from '../../utils/Validator';

import bgImage from '../../assets/login.jpg';
import logo from '../../assets/logo.png';

import { COLORS, SIZES } from '../../constants/theme';
import { Button } from 'react-native-elements';

const { width: WIDTH } = Dimensions.get('window');

const LOGIN_MUTATION = gql`
  mutation login($emailOrPhone: String!, $password: String!) {
    login(emailOrPhone: $emailOrPhone, password: $password) {
      userId
      token
      user {
        _id
      }
    }
  }
`;

const LoginScreen = ({ t, navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState('rawsly@gmail.com');
  const [password, setPassword] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);

  const [logUserIn, { data }] = useMutation(LOGIN_MUTATION);

  const isLoginDisabled = validateEmptyFields({ emailOrPhone, password });

  const handleLogin = async () => {
    // validate email / phone
    const isEmailOrPhoneValid =
      validatePhone(emailOrPhone) || validateEmail(emailOrPhone);

    if (!isEmailOrPhoneValid) {
      Alert.alert(t('invalidEmailOrPhone'), t('invalidLoginInfoDesc'), [
        {
          text: t('tryAgain'),
          onPress: () => console.log('tekrar deneniyor.')
        }
      ]);

      return;
    }

    // now, send request to backend.
    setIsLoading(true);
    await logUserIn({
      variables: { emailOrPhone, password }
    })
      .then(async res => {
        setIsLoading(false);
        await AsyncStorage.setItem('userToken', JSON.stringify(res.data.login));
        navigation.navigate('Home');
      })
      .catch(err => {
        const jsonError = JSON.parse(JSON.stringify(err));
        console.log(jsonError.message);
        Alert.alert(
          t('defaultError'),
          _.replace(jsonError.message, 'GraphQL error: ', ''),
          [
            {
              text: t('tryAgain'),
              onPress: () => console.log('tekrar deneniyor.')
            }
          ]
        );
        setIsLoading(false);
        return;
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
          placeholder={t('emailOrPhoneInput')}
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
          disabled={isLoginDisabled}
          disabledStyle={{ backgroundColor: COLORS.SECONDARY }}
          disabledTitleStyle={{ color: COLORS.WHITE }}
          loading={isLoading}
        />
      </View>
      <View style={styles.registerContainer}>
        <Button
          title={t('registerText')}
          onPress={() => navigation.navigate('Register')}
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
    top: SIZES.INPUT_TEXT + 4,
    left: 15
  },
  inputContainer: {
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonEye: {
    position: 'absolute',
    top: SIZES.INPUT_TEXT + 4,
    right: 15
  },
  loginButton: {
    width: WIDTH - 55,
    height: 50,
    borderRadius: 50,
    backgroundColor: COLORS.BUTTON_PRIMARY
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
