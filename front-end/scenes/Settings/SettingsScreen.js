import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';

import { logout } from '../../utils/User';

const SettingsScreen = ({ navigation }) => {
  const settingsItems = [
    {
      text: 'Logout',
      icon: 'log-out',
      onPressFunction: () => logout(navigation)
    }
  ];

  return (
    <View>
      {_.map(settingsItems, item => (
        <ListItem
          key={item.text}
          title={item.text}
          leftIcon={{ type: 'feather', name: item.icon }}
          bottomDivider
          chevron
          onPress={item.onPressFunction}
        />
      ))}
    </View>
  );
};

export default withTranslation()(SettingsScreen);
