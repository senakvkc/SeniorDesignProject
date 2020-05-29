import { AsyncStorage } from 'react-native';
import { USER_TOKEN } from '../constants';

const logout = async navigation => {
  await AsyncStorage.removeItem(USER_TOKEN);
  navigation.navigate('Login');
};

const getToken = async () => {
	const user = await AsyncStorage.getItem(USER_TOKEN);
	const userJSON = await JSON.parse(user);
	if (userJSON) {	
		return userJSON.token;
	}

	return null;
}

const getLoggedInUser = () => {
	return AsyncStorage.getItem(USER_TOKEN)
		.then(user => {
			const parsedUser = JSON.parse(user);
			return parsedUser;
		})
		.catch(e => {
			console.error(e);
			return null;
		});
}

export { getToken, logout, getLoggedInUser };