import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { logout } from '../../utils/User';
import { SHADOW } from '../../constants';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SettingsScreen = ({ t, navigation }) => {
  const settingsItems = [
    [
      {
        text: t('notifications'),
        icon: 'bell',
        onPress: () => console.log('notifications')
      },
      {
        text: t('changePassword'),
        icon: 'lock',
        onPress: () => console.log('change pass')
      },
    ],
    [
      {
        text: t('reportProblem'),
        icon: 'alert-triangle',
        onPress: () => console.log('report a problem')
      },
      {
        text: t('aboutUs'),
        icon: 'info',
        onPress: () => console.log('info')
      },  
      {
        text: t('help'),
        icon: 'help-circle',
        onPress: () => console.log('help')
      },
    ],
    [
      {
        text: t('logout'),
        icon: 'log-out',
        onPress: () => logout(navigation),
      }
    ]
  ];

  const Item = ({ item }) => (
    <ListItem
      title={item.text}
      leftIcon={{ type: 'feather', name: item.icon, color: '#666' }}
      chevron
      onPress={item.onPress}
      titleStyle={{ color: '#666' }}
      containerStyle={{ backgroundColor: 'transparent' }}
    />
  );

  Item.propTypes = {
    item: PropTypes.shape({
      text: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      onPress: PropTypes.func.isRequired
    }).isRequired
  };

  return (
    <ScrollView>
      {_.map(settingsItems, group => (
        <View key={_.uniqueId('group_')} style={styles.groupContainer}>
          {_.map(group, item => (
            <Item item={item} key={_.uniqueId('item_')} />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  groupContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(253, 253, 253, 1)',
    ...SHADOW,
    marginVertical: 10,
    width: screenWidth - 40,
    alignSelf: 'center'
  }
});

SettingsScreen.propTypes = {
  t: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired
};

export default withTranslation()(SettingsScreen);
