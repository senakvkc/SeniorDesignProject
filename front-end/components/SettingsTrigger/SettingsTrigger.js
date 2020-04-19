import React from 'react';
import { Button, Icon } from 'react-native-elements';
import { COLORS, SIZES } from '../../constants/theme';


const SettingsTrigger = ({ navigation }) => {
  const openSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <Button
      icon={<Icon name="align-right" type="feather" color="#FE9595" size={24} />}
      type="clear"
      containerStyle={{ marginRight: 15 }}
      onPress={() => openSettings()}
    />
  );
};

export default SettingsTrigger;
