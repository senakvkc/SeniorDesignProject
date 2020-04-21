import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { TextInputMask } from 'react-native-masked-text';
import { Overlay } from 'react-native-elements';

import Background from '../../../assets/bg.svg';
import { COLORS, SIZES } from '../../../constants/theme';
import LogoText from '../../../components/common/LogoText';
import { validateEmptyFields, validatePassword } from '../../../utils/Validator';


const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword($phone: String!, $code: String!, $newPassword: String!) {
    result: resetPassword(phone: $phone, code: $code, newPassword: $newPassword)
  }
`;

const PasswordResetStepThreeScreen = ({ t, navigation }) => {
  const [resetPasswordData, setResetPasswordData] = useState({
    newPassword: '',
    newPasswordRepeat: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resetPassword, { data }] = useMutation(RESET_PASSWORD_MUTATION);
  const newPasswordRef = useRef(null);
  const newPasswordRepeatRef = useRef(null);

  useEffect(() => {
    const { state } = navigation;
    const { params } = state;
    const { data: prevScreenData } = params;
    setResetPasswordData({ ...resetPasswordData, ...prevScreenData });
  }, []);

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const resetPasswordFinal = async () => {
    const { phone, code, newPassword, newPasswordRepeat } = resetPasswordData;
    const isEmpty = validateEmptyFields([newPassword, newPasswordRepeat]);

    if (isEmpty) {
      Alert.alert(t('emptyPassword'));
      return;
    }

    if (newPassword !== newPasswordRepeat) {
      Alert.alert(t('passwordDoesNotMatch'));
      return;
    }

    const validationResult = validatePassword({ password: newPassword });
    if (!_.isNull(validationResult)) {
      Alert.alert(validationResult);
    } else {
      await resetPassword({
        variables: { phone, code, newPassword },
      })
        .then(async (res) => {
          if (res.data.result) {
            Alert.alert(t('passwordResetted'), t('passwordResettedSuccess'), [
              {
                text: t('login'),
                onPress: () => navigation.navigate('Login'),
              },
            ]);
          } else {
            Alert.alert(t('defaultError'), [
              {
                text: t('ok'),
                onPress: () => {},
              },
            ]);
            return;
          }
        })
        .catch((err) => {
          const jsonError = JSON.parse(JSON.stringify(err));
          Alert.alert(t('defaultError'), _.replace(jsonError.message, 'GraphQL error: ', ''), [
            {
              text: t('ok'),
              onPress: () => {},
            },
          ]);
          return;
        });
    }
  };

  const InputIcon = ({ name }) => <Icon name={name} size={14} color="#FEA195" style={styles.inputIcon} />;

  InputIcon.propTypes = {
    name: PropTypes.string.isRequired,
  };

  const isDisabled = validateEmptyFields([{
    password: resetPasswordData.newPassword,
    passwordRepeat: resetPasswordData.newPasswordRepeat,
  }]);
  const focusRepeatField = () => newPasswordRepeatRef.current.focus();

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
              <InputIcon name="md-lock" />
              <TextInput
                style={styles.textInput}
                value={resetPasswordData.newPassword}
                underlineColorAndroid="transparent"
                secureTextEntry={!showPassword}
                onChangeText={(text) => setResetPasswordData({ ...resetPasswordData, newPassword: text })}
                returnKeyType="next"
                ref={newPasswordRef}
                clearButtonMode="while-editing"
                blurOrSubmit={false}
                onSubmitEditing={() => focusRepeatField()}
                placeholder={t('passwordInput')}
              />
              <View style={styles.showPasswordButton}>
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} activeOpacity={0.8}>
                  <Icon name={!showPassword ? 'md-eye' : 'md-eye-off'} size={SIZES.NORMAL_TEXT} color="#FEA195" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.input}>
              <InputIcon name="md-lock" />
              <TextInput
                style={styles.textInput}
                value={resetPasswordData.newPasswordRepeat}
                underlineColorAndroid="transparent"
                secureTextEntry={!showPassword}
                onChangeText={(text) => setResetPasswordData({ ...resetPasswordData, newPasswordRepeat: text })}
                returnKeyType="next"
                ref={newPasswordRepeatRef}
                clearButtonMode="while-editing"
                placeholder={t('passwordInput')}
              />
              <View style={styles.showPasswordButton}>
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} activeOpacity={0.8}>
                  <Icon name={!showPassword ? 'md-eye' : 'md-eye-off'} size={SIZES.NORMAL_TEXT} color="#FEA195" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.actionContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity disabled={isDisabled} onPress={() => resetPasswordFinal()} activeOpacity={0.8}>
                <Text style={[styles.buttonText, isDisabled && styles.disabled]}>{t('resetPassword')}</Text>
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
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    width: 200,
    height: 50,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 4 },
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FEA195',
    fontFamily: 'RalewayBold',
  },
  disabled: {
    color: '#C9C9C9',
  },
  inputContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  showPasswordButton: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'center',
    alignContent: 'flex-end',
    marginHorizontal: 10,
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
    fontFamily: 'Raleway',
  },
  actionText: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontFamily: 'Raleway',
  },
  loginContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  loginText: {
    color: COLORS.WHITE_LIGHT,
    fontSize: 14,
    marginRight: 5,
    fontFamily: 'Raleway',
  },
});

PasswordResetStepThreeScreen.propTypes = {
  t: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

export default withTranslation()(PasswordResetStepThreeScreen);
