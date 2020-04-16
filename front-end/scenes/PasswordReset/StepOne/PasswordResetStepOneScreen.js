import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { TextInputMask } from 'react-native-masked-text'
import { Overlay } from 'react-native-elements';

import Background from '../../../assets/bg.svg';
import { COLORS, SIZES } from '../../../constants/theme';
import LogoText from '../../../components/common/LogoText';
import { validatePhone, validateEmptyFields } from '../../../utils/Validator';
import { unmaskPhone } from '../../../utils/Generator';

import { PHONE_MASK } from '../../../constants';

const RESET_PASSWORD_MUTATION = gql`
  mutation forgotPasswordWithPhone($phone: String!) {
    result: forgotPasswordWithPhone(phone: $phone)
  }
`;

const PasswordResetStepOneScreen = ({ t, navigation }) => {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordWithPhone, { data }] = useMutation(RESET_PASSWORD_MUTATION);
  const phoneInputRef = useRef(null);

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const resetPassword = async () => {
    const [unmaskedPhone, actualPhone] = unmaskPhone(phone);
    const validationResult = validatePhone(actualPhone);
    if (!_.isNull(validationResult)) {
      Alert.alert(validationResult);
    } else {
      await forgotPasswordWithPhone({
        variables: { phone: actualPhone },
      })
        .then(async (res) => {
          if (res.data.result) {
            navigation.navigate('PasswordResetStepTwo', { data: actualPhone });
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

  const isDisabled = validateEmptyFields({ phone });
  
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
              <InputIcon name="md-phone-portrait" />
              <TextInputMask
                style={styles.textInput}
                value={phone}
                placeholder="(90) 555 555 55 55"
                underlineColorAndroid="transparent"
                onChangeText={(text) => setPhone(text)}
                returnKeyType="next"
                clearButtonMode="while-editing"
                type="cel-phone"
                options={{
                  maskType: "BRL",
                  withDDD: true,
                  dddMask: '(90) 999 999 99 99'
                }}
                ref={phoneInputRef}
                mask={PHONE_MASK}
              />
            </View>
          </View>

          <View style={styles.actionContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity disabled={isDisabled} onPress={() => resetPassword()} activeOpacity={0.8}>
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
  }
});

PasswordResetStepOneScreen.propTypes = {
  t: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

export default withTranslation()(PasswordResetStepOneScreen);
