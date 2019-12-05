import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';

import { logout } from '../../utils/User';
import { t } from '../../utils/Translate';

const SettingsScreen = ({ navigation }) => {
  const settingsItems = [
    {
      text: t('notificationPreferences'),
      icon: 'bell',
    },
    {
      text: t('connectFacebook'),
      icon: 'facebook',
    },
    // {
    //   text: t('nightMode'),
    //   icon: 'moon',
    // },
    /* {
      text: t('changePassword'),
      icon: 'edit-3',
    }, */
    // key icon is not working, it'd suit better 
    {
      text: t('reportProblem'),
      icon: 'alert-triangle',
    },
    // {
    //   text: t('changeLanguage'),
    //   icon: 'globe',
    // },
    {
      text: t('aboutUs'),
      icon: 'info',
    },  
    {
      text: t('help'),
      icon: 'help-circle',
    },
    {
      text: t('logout'),
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
