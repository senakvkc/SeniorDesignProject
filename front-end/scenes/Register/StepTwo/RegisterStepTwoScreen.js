import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
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

import { validateEmptyFields } from '../../../utils/Validator';
import bgImage from '../../../assets/bg.png';
import { COLORS } from '../../../constants/theme';
import LogoText from '../../../components/common/LogoText';
import MainButton from '../../../components/common/MainButton';

const REGISTER_MUTATION = gql`
  mutation register($userRegisterInput: UserRegisterInput!) {
    registeredUser: register(userRegisterInput: $userRegisterInput) {
      userId
      token
      user {
        _id
        firstName
        lastName
        email
        about
        gender
        isActive
        phoneConfirmed
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
    name: '',
    surname: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const [registerUser, { data }] = useMutation(REGISTER_MUTATION);
  const surnameRef = useRef(null);

  useEffect(() => {
    // fetching data from step one
    const { state } = navigation;
    const { params } = state;
    const { registerData: prevScreenData } = params;
    setRegisterData({...registerData, ...prevScreenData});
  }, []);

  const handleRegister = async () => {
    const { name, surname, email, phone, password } = registerData;
    // now, send request to backend.
    setIsLoading(true);
    const userRegisterInput = { email, phone, password, name, surname };

    await registerUser({
      variables: { userRegisterInput }
    })
      .then(async res => {
        setIsLoading(false);
        console.log("navigation next screen...");
        navigation.navigate('RegisterStepThreeScreen', { user: res.data.registeredUser });
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
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const InputIcon = ({ name }) => <Icon name={name} size={14} color="#FEA195" style={styles.inputIcon} />;

  InputIcon.propTypes = {
    name: PropTypes.string.isRequired,
  };

  const nextInput = () => surnameRef.current.focus();

  const isDisabled = validateEmptyFields({ ...registerData }) || isLoading;

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} style={styles.bgImage}>
        <LogoText text={t('shelty')} />

        <KeyboardAvoidingView behavior="padding">
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.input}>
                <InputIcon name="md-create" />
                <TextInput
                  style={styles.textInput}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => setRegisterData({ ...registerData, name: text })}
                  returnKeyType="next"
                  blurOrSubmit={false}
                  onSubmitEditing={() => nextInput()}
                  clearButtonMode="while-editing"
                  value={registerData.name}
                  placeholder={t('nameInput')}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.input}>
                <InputIcon name="md-create" />
                <TextInput
                  style={styles.textInput}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => setRegisterData({ ...registerData, surname: text })}
                  returnKeyType="next"
                  clearButtonMode="while-editing"
                  value={registerData.surname}
                  placeholder={t('surnameInput')}
                  ref={surnameRef}
                />
              </View>
            </View>

            <View style={styles.actionContainer}>
              <MainButton disabled={isDisabled} onPress={handleRegister} text={t('register')} loading={isLoading} />

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
    marginHorizontal: 10
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

RegisterStepTwoScreen.propTypes = {
  t: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

export default withTranslation()(RegisterStepTwoScreen);
