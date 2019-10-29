import React, { useEffect, useState } from 'react';
import { Text, View, Button, AsyncStorage } from 'react-native';

const ProfileScreen = props => {
  const [userData, setUserData] = useState(null);

  const getCurrentUser = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    setUserData(JSON.parse(userToken));
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <View>
      <Text>Profile</Text>
      <Button
        title="Home"
        onPress={() => props.navigation.navigate('HomeScreen')}
      />
      <Button
        title="Shelters"
        onPress={() => props.navigation.navigate('SheltersScreen')}
      />
      <Button title="Blog" onPress={() => props.navigation.navigate('Blog')} />
    </View>
  );
};

export default ProfileScreen;
