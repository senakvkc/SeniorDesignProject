import React from 'react';
import { Text, View, Button } from 'react-native';

const Profile = props => {
  return (
    <View>
      <Text>Profile</Text>
      <Button title="Home" onPress={() => props.navigation.navigate('Homepage')}/>
      <Button title="Shelters" onPress={() => props.navigation.navigate('Shelters')}/>
      <Button title="Blog" onPress={() => props.navigation.navigate('Blog')}/>
    </View>
  );
};

export default Profile;
