import { createStackNavigator } from 'react-navigation-stack';
import _ from 'lodash';

import ProfileScreen from '../scenes/Profile';
import ConversationScreen from '../scenes/Conversation';

const screensWithHiddenBottomBar = ['Conversation'];

const ProfileNavigator = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        header: null,
        headerVisible: 'false'
      }
    },
    Conversation: {
      screen: ConversationScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => {
      let tabBarVisible = !_.includes(
        screensWithHiddenBottomBar,
        navigation.state.routes[navigation.state.index].routeName
      );

      return {
        tabBarVisible
      };
    }
  }
);

export default ProfileNavigator;
