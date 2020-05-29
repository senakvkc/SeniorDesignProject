import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Image, TouchableOpacity, View, Dimensions, Share } from "react-native";
import { Icon } from 'react-native-elements';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { AppLoading } from 'expo';

import { getLoggedInUser } from "../../utils/User";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ProfileScreen = ({ t, navigation }) => {
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    getLoggedInUser()
      .then(user => {
        console.log(user);
        setLoggedInUser(user);
      })
      .catch(e => console.error(e));
  }, []);

  const selfActions = [
    {
      id: _.uniqueId('action_'),
      icon: 'pets',
      text: 'Evcil Hayvanlarım',
      onPress: () => startConversation(),
      iconColor: '#A4BEEA',
      iconBgColor: '#F3F9FE',
      hasBorder: true,
    },
    {
      id: _.uniqueId('action_'),
      icon: 'favorite-border',
      text: 'Beğendiklerim',
      onPress: () => startConversation(),
      iconColor: '#FEA195',
      iconBgColor: '#FFF5F4',
      hasBorder: true
    },
    {
      id: _.uniqueId('action_'),
      icon: 'create',
      text: 'Blog Yazılarım',
      onPress: () => startConversation(),
      iconColor: '#C38ED5',
      iconBgColor: '#F0F0FF',
      hasBorder: true
    },
    {
      id: _.uniqueId('action_'),
      icon: 'person',
      text: 'Profilim',
      onPress: () => startConversation(),
      iconColor: '#95BFFE',
      iconBgColor: '#DFECFE',
      hasBorder: true
    },
    {
      id: _.uniqueId('action_'),
      icon: 'payment',
      text: 'Hesabı Yükselt',
      onPress: () => startConversation(),
      iconColor: '#8ED5A6',
      iconBgColor: '#F0FFF5',
      hasBorder: false
    },
  ];

  const otherActions = [
    {
      id: _.uniqueId('action_'),
      icon: 'sms',
      text: 'Konuşma Başlat',
      onPress: () => navigation.navigate('Conversation', { user: loggedInUser.user, targetUser: { _id: "5e9a0dd7662096087037aad9" , firstName: "Ezgi", lastName: "İmamoğlu" } }),
      iconColor: '#8ED5A6',
      iconBgColor: '#F0FFF5',
      hasBorder: true,
    },
    {
      id: _.uniqueId('action_'),
      icon: 'pets',
      text: 'Evcil Hayvanları',
      onPress: () => startConversation(),
      iconColor: '#A4BEEA',
      iconBgColor: '#F3F9FE',
      hasBorder: true,
    },
    {
      id: _.uniqueId('action_'),
      icon: 'create',
      text: 'Blog Yazıları',
      onPress: () => startConversation(),
      iconColor: '#C38ED5',
      iconBgColor: '#F0F0FF',
      hasBorder: true
    },
    {
      id: _.uniqueId('action_'),
      icon: 'share',
      text: 'Profili Paylaş',
      onPress: () => startConversation(),
      iconColor: '#95BFFE',
      iconBgColor: '#DFECFE',
      hasBorder: true
    },
    {
      id: _.uniqueId('action_'),
      icon: 'error-outline',
      text: 'Şikayet Et',
      onPress: () => startConversation(),
      iconColor: '#8ED5A6',
      iconBgColor: '#F0FFF5',
      hasBorder: false
    },
  ]

  const getIconStyles = backgroundColor => {
    return {
      backgroundColor,
      borderRadius: 5,
      padding: 5
    }
  }

  const startConversation = () => {
    console.log("start");
  }

  const renderAction = ({ id, icon, text, onPress, iconColor, iconBgColor, hasBorder }) => {
    return (
      <TouchableOpacity key={id} onPress={onPress} style={[styles.actionContainer, { borderBottomWidth: hasBorder ? 1 : 0, paddingBottom: hasBorder ? 18 : 0 }]} activeOpacity={0.8}>
        <View style={styles.actionLeft}>
          <Icon type="material" name={icon} size={18} color={iconColor} containerStyle={getIconStyles(iconBgColor)} />
          <Text style={styles.actionText}>
            {text}
          </Text>
        </View>
        <Icon type="material" name="chevron-right" size={22} color="#888" containerStyle={styles.chevron} />
      </TouchableOpacity>
    )
  };

  
  const reportProfile = () => {
    console.log("report");
  }

  const getFullName = () => {
    const first = _.upperFirst(loggedInUser.user.firstName);
    const last = _.upperFirst(loggedInUser.user.lastName);
    return `${first} ${last}`;
  }

  const isSelf = false;
  const actions = isSelf ? selfActions : otherActions;
  return loggedInUser && loggedInUser.user ? (
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Image source={{ uri: 'https://placedog.net/120/120' }} style={styles.profileImage} />
          <Text style={styles.profileName}>
            {getFullName()}
          </Text>
          <Text style={styles.profileRole}>
            {loggedInUser.user.userType}
          </Text>
          <Icon type="feather" name="check-circle" size={24} color="#FEA195" containerStyle={styles.profileIcon} />
        </View>
        <View style={styles.actionsSection}>
          {_.map(actions, action => renderAction({...action}))}
        </View>
      </View>
    ) : (
      <AppLoading />
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  topSection: {
    flex: 4,
    backgroundColor: '#FFF5F4',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileImage: {
    padding: 2,
    borderWidth: 1,
    borderColor: '#FEA195',
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 40,
    overflow: 'hidden'
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333'
  },
  profileRole: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  profileIcon: {
    marginBottom: 30
  },
  actionsSection: {
    flex: 5,
    flexDirection: 'column',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
    top: -20,
    backgroundColor: '#fff',
  },
  actionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 18,
    borderBottomColor: '#f4f4f1',
    borderBottomWidth: 1
  },
  actionLeft: {
    paddingLeft: 18,
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionText: {
    color: '#444',
    fontWeight: '600',
    fontSize: 18,
    marginLeft: 15
  },
  chevron: {
    marginRight: 18
  }
});

ProfileScreen.propTypes = {
  t: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired
}

export default withTranslation()(ProfileScreen);
