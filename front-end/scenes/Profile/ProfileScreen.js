import React from 'react';
import { Text, View, Button } from 'react-native';

const ProfileScreen = props => {
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
