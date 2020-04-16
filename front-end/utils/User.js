import { AsyncStorage } from 'react-native';
import { USER_TOKEN } from '../constants';

export const logout = async navigation => {
  console.log("clicked logout");
  await AsyncStorage.removeItem(USER_TOKEN);
  navigation.navigate('Login');
};
