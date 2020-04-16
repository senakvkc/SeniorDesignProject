import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import Background from '../../../assets/bg.svg';
import { COLORS, SIZES } from '../../../constants/theme';
import LogoText from '../../../components/common/LogoText';
import { validateEmptyFields } from '../../../utils/Validator';

const { width: screenWidth } = Dimensions.get('window');

const CHECK_RESET_PASSWORD_CODE_MUTATION = gql`
  mutation checkResetPasswordCode($phone: String!, $code: String!) {
    result: checkResetPasswordCode(phone: $phone, code: $code)
  }
`;

const PasswordResetStepTwoScreen = ({ t, navigation }) => {
  const [resetPasswordData, setResetPasswordData] = useState({
    phone: '',
    code: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [checkResetPasswordCode, { data }] = useMutation(CHECK_RESET_PASSWORD_CODE_MUTATION);
  const codeRef = useRef(null);

  useEffect(() => {
    const { state } = navigation;
    const { params } = state;
    const { data: phone } = params;
    setResetPasswordData({ ...resetPasswordData, phone });
  }, []);

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const checkCode = async () => {
    const { phone, code } = resetPasswordData;
    const isCodeEmpty = validateEmptyFields({ code });
    
    if (!isCodeEmpty) {
      await checkResetPasswordCode({
        variables: { phone, code },
      })
        .then(async (res) => {
          if (res.data.result) {
            navigation.navigate('PasswordResetStepThree', { data: resetPasswordData });
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
    } else {
      Alert.alert(t('emptyCode'), [
        {
          text: t('ok'),
          onPress: () => {},
        },
      ]);
    }
  };

  const InputIcon = ({ name }) => <Icon name={name} size={14} color="#FEA195" style={styles.inputIcon} />;

  InputIcon.propTypes = {
    name: PropTypes.string.isRequired,
  };

  const isDisabled = validateEmptyFields({ code: resetPasswordData.code });

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Background />
      </View>

      <LogoText text={t('shelty')} />


      <KeyboardAvoidingView behavior="padding">
        <View style={styles.formContainer}>
          <Text style={styles.desc}>Şifre sıfırlama kodunuz mesaj olarak gönderildi. Kodunuzu aşağıya yazın.</Text>
          <View style={styles.inputContainer}>
            <View style={styles.input}>
              <TextInput
                style={styles.textInput}
                value={resetPasswordData.code}
                underlineColorAndroid="transparent"
                onChangeText={(text) => setResetPasswordData({ ...resetPasswordData, code: text })}
                returnKeyType="next"
                ref={codeRef}
              />
            </View>
          </View>

          <View style={styles.actionContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity disabled={isDisabled} onPress={() => checkCode()} activeOpacity={0.8}>
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
  formContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  desc: {
    textAlign: 'center',
    marginBottom: 10,
    color: COLORS.WHITE,
    fontFamily: 'Raleway',
    fontSize: 16,
    width: screenWidth * 0.66 
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
    marginHorizontal: 10
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

PasswordResetStepTwoScreen.propTypes = {
  t: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

export default withTranslation()(PasswordResetStepTwoScreen);
