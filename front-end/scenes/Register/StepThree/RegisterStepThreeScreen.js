import React, { Component, useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

import {
  validateEmptyFields,
  validateEmailAndPhone,
  validateUsername,
  validateEmail,
  validatePhone
} from '../../../utils/Validator';
import Background from '../../../assets/bg.svg';

import { COLORS, SIZES } from '../../../constants/theme';
import LogoText from '../../../components/common/LogoText';

const ACTIVATE_ACCOUNT_WITH_PHONE = gql`
  mutation activateAccountWithPhone($phone: String!, $phoneCode: String!) {
    result: activateAccountWithPhone(phone: $phone, phoneCode: $phoneCode)
  }
`;

const RegisterStepThreeScreen = ({ t, navigation }) => {
  const [registerData, setRegisterData] = useState(null);
  const [currentPhoneCode, setCurrentPhoneCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [activateUser, { data }] = useMutation(ACTIVATE_ACCOUNT_WITH_PHONE);

  useEffect(() => {
    // fetching data from step one
    const { state } = navigation;
    const { params } = state;
    const { user: prevScreenData } = params;
    setRegisterData({...registerData, ...prevScreenData});
  }, []);

  const handleActivateUser = async () => {
    const { user } = registerData;
    const { phone } = user;

    const validationResult = validateFields([
      {
        type: 'text',
        value: currentPhoneCode
      }
    ]);

    if (!_.isNull(validationResult)) {
      Alert.alert(validationResult);
    } else {
      setIsLoading(true);
      await activateUser({
        variables: { phone, phoneCode: currentPhoneCode }
        })
        .then(async res => {
          await AsyncStorage.setItem('userToken', JSON.stringify(registerData));
          setIsLoading(false);
          navigation.navigate('Home');
        })
        .catch(err => {
          const jsonError = JSON.parse(JSON.stringify(err));
          Alert.alert(t('defaultError'), _.replace(jsonError.message, 'GraphQL error: ', ''), [
            {
              text: t('tryAgain'),
              onPress: () => console.log(jsonError)
            }
          ]);
          setIsLoading(false);
          return;
        });
    }

  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const isDisabled = validateEmptyFields({ phoneCode: currentPhoneCode });

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Background />
      </View>

      <LogoText text={t('shelty')} />

      <KeyboardAvoidingView behavior="padding">

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <TextInput
              style={styles.textInput}
              underlineColorAndroid="transparent"
              onChangeText={(text) => setCurrentPhoneCode(text)}
              returnKeyType="next"
              value={currentPhoneCode}
            />,
          </View>
        </View>

        <View style={styles.actionContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity disabled={isDisabled} onPress={activateUser} style={styles.button} activeOpacity={0.8}>
              <Text style={[styles.buttonText, isDisabled && styles.disabled]}>{t('register')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>{t('hasAccount')}</Text>
            <TouchableOpacity onPress={goToLogin} style={styles.basicButton} activeOpacity={0.8}>
              <Text style={styles.actionText}>{t('login')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </KeyboardAvoidingView>
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
    color: COLORS.SILVER_PINK,
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
    color: '#FEA195',
    fontFamily: 'RalewayBold'
  },
  disabled: {
    color: '#C9C9C9',
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
    color: '#5C5C5C',
    fontSize: 14,
    flex: 1,
    fontFamily: 'Raleway'
  },
  nextIcon: {
    alignSelf: 'center',
    marginLeft: 10
  },
  actionText: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontFamily: 'Raleway'
  },
  loginContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10
  },
  loginText: {
    color: COLORS.WHITE_LIGHT,
    fontSize: 14,
    marginRight: 5
  }
});

RegisterStepThreeScreen.propTypes = {
  t: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

export default withTranslation()(RegisterStepThreeScreen);
