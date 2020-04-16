import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DrawerActions } from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { COLORS, SIZES } from '../../constants/theme';

const DrawerTrigger = ({ navigation }) => {
  return (
    <TouchableOpacity style={styles.trigger} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
      <Icon type="feather" name="align-center" size={SIZES.MENU_ICON} color={COLORS.PURPLE} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  trigger: {
    marginLeft: 30
  }
});

export default withNavigation(DrawerTrigger);
