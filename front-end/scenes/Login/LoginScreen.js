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
import { validateEmptyFields, validateEmailAndPhone, validatePhone, validateEmail } from '../../utils/Validator';

import bgImage from '../../assets/login.jpg';
import logo from '../../assets/logo.png';

import { COLORS, SIZES } from '../../constants/theme';
import { Button } from 'react-native-elements';
import Background from '../../assets/bg.svg';

const { width: WIDTH } = Dimensions.get('window');

const LOGIN_MUTATION = gql`
  mutation login($emailOrPhone: String!, $password: String!) {
    login(emailOrPhone: $emailOrPhone, password: $password) {
      userId
      token
      user {
        _id
        firstName
        lastName
        username
        email
        about
        gender
        profilePicture
        phone
        city
        address
        country
        birthdate
        userType
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
    const isEmailOrPhoneValid = validatePhone(emailOrPhone) || validateEmail(emailOrPhone);

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
        Alert.alert(t('defaultError'), _.replace(jsonError.message, 'GraphQL error: ', ''), [
          {
            text: t('tryAgain'),
            onPress: () => console.log('tekrar deneniyor.')
          }
        ]);
        setIsLoading(false);
        return;
      });
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

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>E-posta veya Telefon</Text>
          <View style={styles.input}>
            <Icon name="md-person" size={SIZES.NORMAL_TEXT} color={COLORS.LAVENDER} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              value={emailOrPhone}
              underlineColorAndroid="transparent"
              onChangeText={text => setEmailOrPhone(text)}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Şifre</Text>
          <View style={styles.input}>
            <Icon name="md-lock" size={SIZES.NORMAL_TEXT} color={COLORS.LAVENDER} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              value={password}
              secureTextEntry={!showPassword}
              underlineColorAndroid="transparent"
              onChangeText={text => setPassword(text)}
            />
            <View style={styles.showPasswordButton}>
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} activeOpacity={0.8}>
                <Icon name={!showPassword ? 'md-eye' : 'md-eye-off'} size={SIZES.NORMAL_TEXT} color={COLORS.LAVENDER} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.actionContainer}>
          <View style={styles.forgotPasswordContainer}>
            <Button
              title={t('forgotPasswordText')}
              onPress={() => console.log('forgot password')}
              type="clear"
              titleStyle={styles.actionText}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLogin} style={styles.button} activeOpacity={0.8}>
              <Text style={styles.buttonText}>Giriş Yap</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Üyeliğiniz yok mu?</Text>
            <TouchableOpacity onPress={goToRegister} style={styles.basicButton} activeOpacity={0.8}>
              <Text style={styles.actionText}>Üye Ol</Text>
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
  button: {
    width: 200,
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
  showPasswordButton: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'center',
    alignContent: 'flex-end',
    marginHorizontal: 10
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end'
  },
  actionText: {
    color: COLORS.LAVENDER,
    fontSize: SIZES.SMALL_TEXT
  },
  registerContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10
  },
  registerText: {
    color: COLORS.WHITE_LIGHT,
    fontSize: SIZES.SMALL_TEXT,
    marginRight: 5
  }
});

export default withTranslation()(LoginScreen);
