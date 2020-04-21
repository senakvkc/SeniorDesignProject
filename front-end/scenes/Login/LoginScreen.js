import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  KeyboardAvoidingView,
  ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

import { validateEmptyFields, validateFields } from '../../utils/Validator';
import { COLORS, SIZES } from '../../constants/theme';
import LogoText from '../../components/common/LogoText';
import MainButton from '../../components/common/MainButton';
import { parsePhoneNumber } from '../../utils/FormValidator';
import bgImage from '../../assets/bg.png';

const LOGIN_MUTATION = gql`
  mutation login($phone: String!, $password: String!) {
    login(phone: $phone, password: $password) {
      userId
      token
      user {
        _id
        firstName
        lastName
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
  const [loginData, setLoginData] = useState({
    phone: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [logUserIn, { data }] = useMutation(LOGIN_MUTATION);
  const phoneInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleLogin = async () => {
    const { phone, password } = loginData;
    const parsedPhone = parsePhoneNumber(phone);
    const validationResult = validateFields([
      {
        type: 'phone',
        value: parsedPhone
      },
      {
        type: 'password',
        value: password
      }
    ]);

    if (!_.isNull(validationResult)) {
      Alert.alert(validationResult);
    } else {
      setIsLoading(true);
      await logUserIn({
        variables: { phone: parsedPhone, password },
      })
        .then(async (res) => {
          await AsyncStorage.setItem('userToken', JSON.stringify(res.data.login));
          setIsLoading(false);
          navigation.navigate('Home');
        })
        .catch((err) => {
          const jsonError = JSON.parse(JSON.stringify(err));
          if (jsonError.graphQLErrors && jsonError.graphQLErrors[0].extensions.code === 'USER_NOT_CONFIRMED') {
            Alert.alert(t('defaultError'), _.replace(jsonError.message, 'GraphQL error: ', ''), [
              {
                text: t('confirmAccount'),
                onPress: () => {
                  console.log(jsonError);
                  navigation.navigate('ActivateAccountStepOne');
                }
              }
            ]);
          } else {
            Alert.alert(t('defaultError'), _.replace(jsonError.message, 'GraphQL error: ', ''), [
              {
                text: t('tryAgain'),
                onPress: () => {
                  console.log(jsonError);
                },
              },
            ]);
          }
          setIsLoading(false);
          return;
        });
    }
  };

  const goToRegister = () => {
    navigation.navigate('RegisterStepOne');
  };

  const InputIcon = ({ name }) => <Icon name={name} size={14} color="#FEA195" style={styles.inputIcon} />;

  InputIcon.propTypes = {
    name: PropTypes.string.isRequired,
  };

  const isDisabled = validateEmptyFields([loginData.phone, loginData.password]) || isLoading;

  const focusPasswordField = () => passwordInputRef.current.focus();

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} style={styles.bgImage}>
        <LogoText text={t('shelty')} />
        <KeyboardAvoidingView behavior="padding">
          <View>
            <View style={styles.inputContainer}>
              <View style={styles.input}>
                <InputIcon name="md-phone-portrait" />
                <TextInput
                  style={styles.textInput}
                  value={loginData.phone}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => setLoginData({ ...loginData, phone: text })}
                  returnKeyType="next"
                  placeholder={t('phoneInput')}
                  blurOrSubmit={false}
                  onSubmitEditing={() => focusPasswordField()}
                  clearButtonMode="while-editing"
                  ref={phoneInputRef}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.input}>
                <InputIcon name="md-lock" />
                <TextInput
                  style={styles.textInput}
                  value={loginData.password}
                  secureTextEntry={!showPassword}
                  clearButtonMode="while-editing"
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => setLoginData({ ...loginData, password: text })}
                  placeholder={t('password')}
                  ref={passwordInputRef}
                />
                <View style={styles.showPasswordButton}>
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} activeOpacity={0.8}>
                    <Icon name={!showPassword ? 'md-eye' : 'md-eye-off'} size={SIZES.NORMAL_TEXT} color="#FEA195" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View>
              <View style={styles.forgotPasswordContainer}>
                <Button
                  title={t('forgotPasswordText')}
                  onPress={() => navigation.navigate('PasswordResetStepOne')}
                  type="clear"
                  titleStyle={styles.actionText}
                />
              </View>

              <MainButton disabled={isDisabled} loading={isLoading} onPress={handleLogin} text={t('login')}/>

              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>{t('noAccount')}</Text>
                <TouchableOpacity onPress={goToRegister} style={styles.basicButton} activeOpacity={0.8}>
                  <Text style={styles.actionText}>{t('register')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE_F9,
    borderRadius: 5,
    width: 200,
    height: 50,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    elevation: 1,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 3 },
  },
  inputIcon: {
    marginHorizontal: 10,
  },
  textInput: {
    color: '#5C5C5C',
    fontSize: 14,
    flex: 1,
  },
  showPasswordButton: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'center',
    alignContent: 'flex-end',
    marginHorizontal: 10,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
  },
  actionText: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontFamily: 'RalewayBold',
  },
  registerContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  registerText: {
    color: COLORS.WHITE_F9,
    fontSize: 14,
    marginRight: 5,
    fontFamily: 'RalewayBold',
  },
});

export default withTranslation()(LoginScreen);
