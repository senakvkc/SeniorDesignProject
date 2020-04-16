import React from 'react';
import { ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';

import { logout } from '../../utils/User';

const SettingsScreen = ({ navigation }) => {
  const settingsItems = [
    {
      text: 'Notification Preferences',
      icon: 'bell',
      hasDivider: false
    },
    {
      text: 'Connect your Facebook Account',
      icon: 'facebook',
      hasDivider: false
    },
    {
      text: 'Night Mode',
      icon: 'moon',
      hasDivider: true
    },
    {
      text: 'Change your Password',
      icon: 'edit-3',
      hasDivider: false
    },
    // key icon is not working, it'd suit better 
    {
      text: 'Change Language',
      icon: 'globe',
      hasDivider: true
    },
    {
      text: 'Report a Problem',
      icon: 'alert-triangle',
      hasDivider: false
    },
    {
      text: 'About Us',
      icon: 'info',
      hasDivider: false
    },  
    {
      text: 'Help',
      icon: 'help-circle',
      hasDivider: true
    },
    {
      text: 'Logout',
      icon: 'log-out',
      onPressFunction: () => logout(navigation),
      hasDivider: false
    }
  ];

  return (
    <ScrollView>
      {_.map(settingsItems, item => (
        <ListItem
          key={item.text}
          title={item.text}
          leftIcon={{ type: 'feather', name: item.icon }}
          bottomDivider={item.hasDivider}
          chevron
          onPress={item.onPressFunction}
        />
      ))}
    </ScrollView>
  );
};

export default withTranslation()(SettingsScreen);
