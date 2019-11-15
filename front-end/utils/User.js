import { AsyncStorage } from 'react-native';

export const logout = async navigation => {
  await AsyncStorage.removeItem('userToken');
  navigation.navigate('Login');
};
