import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';

import { logout } from '../../utils/User';

const SettingsScreen = ({ navigation }) => {
  const settingsItems = [
    {
      text: 'Notification Preferences',
      icon: 'bell',
    },
    {
      text: 'Connect your Facebook Account',
      icon: 'facebook',
    },
    {
      text: 'Night Mode',
      icon: 'moon',
    },
    {
      text: 'Change your Password',
      icon: 'edit-3',
    },
    // key icon is not working, it'd suit better 
    {
      text: 'Report a Problem',
      icon: 'alert-triangle',
    },
    {
      text: 'Change Language',
      icon: 'globe',
    },
    {
      text: 'About Us',
      icon: 'info',
    },  
    {
      text: 'Help',
      icon: 'help-circle',
    },
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
