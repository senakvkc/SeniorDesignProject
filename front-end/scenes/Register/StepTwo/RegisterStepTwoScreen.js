import React, { Component, useState, useEffect } from 'react';
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
  validateUsername,
  validateEmail,
  validatePhone
} from '../../../utils/Validator';
import Background from '../../../assets/bg.svg';

import { COLORS, SIZES } from '../../../constants/theme';
import { Button } from 'react-native-elements';
import LoginScreen from '../../Login';
import { fieldGenerator } from '../../../utils/Generator';

const { width: WIDTH } = Dimensions.get('window');

const REGISTER_MUTATION = gql`
  mutation register($userRegisterInput: UserRegisterInput!) {
    register(userRegisterInput: $userRegisterInput) {
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

const RegisterStepTwoScreen = ({ t, navigation }) => {
  const [registerData, setRegisterData] = useState({
    name: null,
    surname: null,
    birthdate: null
  });
  const [errors, setErrors] = useState({
    name: null,
    surname: null,
    birthdate: null
  });

  const [registerUser, { data }] = useMutation(REGISTER_MUTATION);

  useEffect(() => {}, []);

  const handleRegister = async () => {
    // check if email, phone & username is valid.
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      Alert.alert(null, t('invalidEmail'), [
        {
          text: t('tryAgain'),
          onPress: () => console.log('tekrar deneniyor.')
        }
      ]);

      return;
    }

    const isPhoneValid = validatePhone(phone);
    if (!isPhoneValid) {
      Alert.alert(null, t('invalidPhone'), [
        {
          text: t('tryAgain'),
          onPress: () => console.log('tekrar deneniyor.')
        }
      ]);

      return;
    }

    // now, send request to backend.
    setIsLoading(true);
    const userRegisterInput = { email, phone, username, password };

    await registerUser({
      variables: { userRegisterInput }
    })
      .then(async res => {
        setIsLoading(false);
        await AsyncStorage.setItem('userToken', JSON.stringify(res.data.register));
        console.log('Successful registration! Navigating to Home...');
        navigation.navigate('Home');
      })
      .catch(err => {
        const jsonError = JSON.parse(JSON.stringify(err));
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

  const goToLogin = () => {
    navigation.navigate('Login');
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
          <Text style={styles.inputText}>Ad</Text>
          <View style={styles.input}>
            <Icon name="md-create" size={SIZES.NORMAL_TEXT} color={COLORS.LAVENDER} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              value={registerData.name}
              underlineColorAndroid="transparent"
              onChangeText={text => handleFormChange(text, 'name')}
            />
          </View>
          {errors && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Soyad</Text>
          <View style={styles.input}>
            <Icon name="md-phone-portrait" size={SIZES.NORMAL_TEXT} color={COLORS.LAVENDER} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              value={registerData.surname}
              underlineColorAndroid="transparent"
              onChangeText={text => handleFormChange(text, 'surname')}
            />
          </View>
          {errors && errors.surname && <Text style={styles.errorText}>{errors.surname}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Doğum Tarihi</Text>
          <View style={styles.input}>
            <Icon name="md-calendar" size={SIZES.NORMAL_TEXT} color={COLORS.LAVENDER} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              value={registerData.birthdate}
              underlineColorAndroid="transparent"
              onChangeText={text => handleFormChange(text, 'birthdate')}
            />
          </View>
          {errors && errors.birthdate && <Text style={styles.errorText}>{errors.birthdate}</Text>}
        </View>

        <View style={styles.actionContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleRegister} style={styles.button} activeOpacity={0.8}>
              <Text style={styles.buttonText}>Üye Ol</Text>
            </TouchableOpacity>
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
  }
});

export default withTranslation()(RegisterStepTwoScreen);
