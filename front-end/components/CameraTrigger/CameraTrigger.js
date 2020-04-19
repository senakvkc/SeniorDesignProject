import React from 'react';
import { Button, Icon } from 'react-native-elements';

const CameraTrigger = ({ navigation }) => {
  const openCamera = () => {
    console.log('camera');
  };

  return (
    <Button
      icon={<Icon name="camera" type="feather" color="#FE9595" size={24} />}
      type="clear"
      containerStyle={{ marginLeft: 15 }}
      onPress={() => openCamera()}
    />
  );
};

export default CameraTrigger;
