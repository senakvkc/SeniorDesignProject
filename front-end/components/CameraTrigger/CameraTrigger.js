import React from 'react';
import { Button, Icon } from 'react-native-elements';
import { COLORS, SIZES } from '../../constants/theme';

const CameraTrigger = ({ navigation }) => {
  const openCamera = () => {
    console.log('camera');
  };

  return (
    <Button
      icon={<Icon name="camera" type="feather" color={COLORS.PURPLE} size={SIZES.MENU_ICON} />}
      type="clear"
      containerStyle={{ marginLeft: 15 }}
      onPress={() => openCamera()}
    />
  );
};

export default CameraTrigger;
