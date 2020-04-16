import React from 'react';
import { Button, Icon } from 'react-native-elements';
import { COLORS, SIZES } from '../constants/theme';
import _ from 'lodash';
import DrawerTrigger from '../components/DrawerTrigger';
import CameraTrigger from '../components/CameraTrigger';
import SettingsTrigger from '../components/SettingsTrigger';

export const NAVIGATION_OPTIONS = ({ navigation }) => ({
  headerTitleStyle: {
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
    color: COLORS.PURPLE
  },
  headerStyle: {
    shadowColor: 'transparent',
    backgroundColor: COLORS.WHITE,
    elevation: 1
  },
  headerLeft: <CameraTrigger navigation={navigation} />,
  headerRight: <SettingsTrigger navigation={navigation} />
});
