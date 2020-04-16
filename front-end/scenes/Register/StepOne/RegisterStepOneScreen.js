import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { validateField, validateFields, validateEmptyFields } from '../../../utils/Validator';
import Background from '../../../assets/bg.svg';
import { COLORS, SIZES } from '../../../constants/theme';
import LogoText from '../../../components/common/LogoText';
import { PHONE_MASK } from '../../../constants';
import { TextInputMask } from 'react-native-masked-text';
import { unmaskPhone } from '../../../utils/Generator';

const RegisterStepOneScreen = ({ t, navigation }) => {
  const phoneFieldRef = useRef(null);
  const passwordFieldRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [registerData, setRegisterData] = useState({
    email: '',
    phone: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const nextStep = () => {
    setIsLoading(true);
    const { phone, email, password } = registerData;
    const [unmaskedPhone, actualPhone] = unmaskPhone(phone);
    const nextScreenData = { ...registerData, phone: actualPhone };
    const validationResult = validateFields([
      {
        type: 'email',
        value: email
      },
      {
        type: 'phone',
        value: actualPhone
      },
      {
        type: 'password',
        value: password
      }
    ]);
    
    if (!_.isNull(validationResult)) {
      setIsLoading(false);
      Alert.alert(validationResult);
    } else {
      setIsLoading(false);
      navigation.navigate('RegisterStepTwo', { registerData: nextScreenData });
    }
  };

  const InputIcon = ({ name }) => <Icon name={name} size={14} color="#FEA195" style={styles.inputIcon} />;

  InputIcon.propTypes = {
    name: PropTypes.string.isRequired,
  };

  const isDisabled = validateEmptyFields({ ...registerData });

  const focusPhoneField = () => phoneFieldRef && phoneFieldRef.current.focus();
  const focusPasswordField = () => passwordFieldRef && passwordFieldRef.current.focus();

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
              <InputIcon name="md-mail" />
              <TextInput
                style={styles.textInput}
                value={registerData.email}
                underlineColorAndroid="transparent"
                onChangeText={(text) => setRegisterData({ ...registerData, email: text })}
                returnKeyType="next"
                placeholder={t('emailInput')}
                blurOrSubmit={false}
                onSubmitEditing={() => focusPhoneField()}
                clearButtonMode="while-editing"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.input}>
              <InputIcon name="md-phone-portrait" />
              <TextInputMask
                style={styles.textInput}
                value={registerData.phone}
                placeholder="(90) 555 555 55 55"
                underlineColorAndroid="transparent"
                onChangeText={(text) => setRegisterData({ ...registerData, phone: text })}
                returnKeyType="next"
                clearButtonMode="while-editing"
                type="cel-phone"
                options={{
                  maskType: "BRL",
                  withDDD: true,
                  dddMask: '(90) 999 999 99 99'
                }}
                ref={phoneFieldRef}
                mask={PHONE_MASK}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.input}>
              <InputIcon name="md-lock" />
              <TextInput
                style={styles.textInput}
                value={registerData.password}
                underlineColorAndroid="transparent"
                secureTextEntry={!showPassword}
                onChangeText={(text) => setRegisterData({ ...registerData, password: text })}
                returnKeyType="next"
                ref={passwordFieldRef}
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
              <TouchableOpacity disabled={isDisabled} onPress={nextStep} activeOpacity={0.8}>
                <Text style={[styles.buttonText, isDisabled && styles.disabled]}>{t('nextStep')}</Text>
              </TouchableOpacity>
              <Icon
                name="md-arrow-forward"
                size={SIZES.NORMAL_TEXT}
                color={isDisabled ? COLORS.DARK_GREY : '#FEA195'}
                style={styles.nextIcon}
              />
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
  showPasswordButton: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'center',
    alignContent: 'flex-end',
    marginHorizontal: 10,
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
  nextIcon: {
    alignSelf: 'center',
    marginLeft: 10,
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

RegisterStepOneScreen.propTypes = {
  t: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

export default withTranslation()(RegisterStepOneScreen);
