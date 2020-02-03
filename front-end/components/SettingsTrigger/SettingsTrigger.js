import React from 'react';
import { Button, Icon } from 'react-native-elements';
import { COLORS, SIZES } from '../../constants/theme';

const SettingsTrigger = ({ navigation }) => {
  const openSettings = () => {
    console.log('settings');
  };

  return (
    <Button
      icon={<Icon name="ios-settings" type="ionicon" color={COLORS.PURPLE} size={SIZES.MENU_ICON} />}
      type="clear"
      containerStyle={{ marginRight: 15 }}
      onPress={() => openSettings()}
    />
  );
};

export default SettingsTrigger;
