import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Alert, 
  ImageBackground 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { validateFields, validateEmptyFields } from '../../../utils/Validator';
import bgImage from '../../../assets/bg.png';
import { COLORS, SIZES } from '../../../constants/theme';
import LogoText from '../../../components/common/LogoText';
import MainButton from '../../../components/common/MainButton';
import { parsePhoneNumber } from '../../../utils/FormValidator';

const RegisterStepOneScreen = ({ t, navigation }) => {
  const phoneFieldRef = React.createRef();
  const passwordFieldRef = React.createRef();

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
    const parsedPhone = parsePhoneNumber(phone);
    const validationResult = validateFields([
      {
        type: 'email',
        value: email
      },
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
      setIsLoading(false);
      Alert.alert(validationResult);
    } else {
      setIsLoading(false);
      const nextScreenData = { ...registerData, phone: parsedPhone };
      navigation.navigate('RegisterStepTwo', { registerData: nextScreenData });
    }
  };

  const InputIcon = ({ name }) => <Icon name={name} size={14} color="#FEA195" style={styles.inputIcon} />;

  InputIcon.propTypes = {
    name: PropTypes.string.isRequired,
  };

  const isDisabled = validateEmptyFields({ ...registerData }) || isLoading;

  const focusPhoneField = () => phoneFieldRef.current.focus();
  const focusPasswordField = () => passwordFieldRef.current.focus();

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} style={styles.bgImage}>
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
                <TextInput
                  style={styles.textInput}
                  value={registerData.phone}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => setRegisterData({ ...registerData, phone: text })}
                  returnKeyType="next"
                  placeholder={t('phoneInput')}
                  blurOrSubmit={false}
                  onSubmitEditing={() => focusPasswordField()}
                  clearButtonMode="while-editing"
                  ref={phoneFieldRef}
                  keyboardType="numeric"
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

            <View>
              <MainButton disabled={isDisabled} onPress={nextStep} text={t('nextStep')} loading={isLoading} />

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>{t('hasAccount')}</Text>
                <TouchableOpacity onPress={goToLogin} style={styles.basicButton} activeOpacity={0.8}>
                  <Text style={styles.actionText}>{t('login')}</Text>
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
  showPasswordButton: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'center',
    alignContent: 'flex-end',
    marginHorizontal: 10,
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
