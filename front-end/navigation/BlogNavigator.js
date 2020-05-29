import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import BlogScreen from '../scenes/Blog';
import { Icon } from 'react-native-elements';
import CameraTrigger from '../components/CameraTrigger';
import { COLORS, SIZES } from '../constants/theme';

const NAVIGATION_OPTIONS = ({ navigation }) => ({
  headerTitle: navigation.state.routeName,
  headerTitleStyle: {
    textAlign: 'center',
    flex: 1,
    alignSelf: 'center',
    color: "#FEA195"
  },
  headerStyle: {
    shadowColor: 'transparent',
    backgroundColor: COLORS.WHITE,
    elevation: 1
  },
  headerLeft: <CameraTrigger navigation={navigation} />,
  headerRight: (
    <Icon
      type="feather"
      name="edit-3"
      color="#FEA195"
      size={SIZES.MENU_ICON}
      containerStyle={{ marginRight: 15 }}
      onPress={() => console.log('new post')}
    />
  )
});

const BlogNavigator = createStackNavigator({
  Blog: {
    screen: BlogScreen,
    navigationOptions: NAVIGATION_OPTIONS
  }
});

export default BlogNavigator;
