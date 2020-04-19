import React from 'react';
import { Button, Icon } from 'react-native-elements';

const BackHandler = ({ navigation }) => {
  return (
    <Button
      icon={<Icon name="chevron-left" type="feather" color="#FE9595" size={24} />}
      type="clear"
      containerStyle={{ marginLeft: 15 }}
      onPress={() => navigation.goBack()}
    />
  );
};

export default BackHandler;
