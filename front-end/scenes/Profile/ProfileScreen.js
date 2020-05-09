import React from "react";
import { Text, StyleSheet, Image, TouchableOpacity, View, Dimensions } from "react-native";
import { Icon } from 'react-native-elements';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';

import MainButton from '../../components/common/MainButton';
import { USER_TOKEN } from '../../constants';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ProfileScreen = () => {

  const actions = [
    {
      id: _.uniqueId('action_'),
      icon: 'sms',
      text: 'Konuşma Başlat',
      onPress: () => startConversation(),
      iconColor: '#8ED5A6',
      iconBgColor: '#F0FFF5'
    },
    {
      id: _.uniqueId('action_'),
      icon: 'pets',
      text: 'Evcil Hayvanlarım',
      onPress: () => startConversation(),
      iconColor: '#A4BEEA',
      iconBgColor: '#F3F9FE'
    },
    {
      id: _.uniqueId('action_'),
      icon: 'favorite-border',
      text: 'Beğendiklerim',
      onPress: () => startConversation(),
      iconColor: '#FEA195',
      iconBgColor: '#FFF5F4'
    },
    {
      id: _.uniqueId('action_'),
      icon: 'create',
      text: 'Blog Yazılarım',
      onPress: () => startConversation(),
      iconColor: '#C38ED5',
      iconBgColor: '#F0F0FF'
    },
    {
      id: _.uniqueId('action_'),
      icon: 'person',
      text: 'Profilim',
      onPress: () => startConversation(),
      iconColor: '#95BFFE',
      iconBgColor: '#DFECFE'
    },
  ];

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

  const renderAction = ({ id, icon, text, onPress, iconColor, iconBgColor }) => {
    return (
      <TouchableOpacity key={id} onPress={onPress} style={styles.actionContainer} activeOpacity={0.8}>
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

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={{ uri: 'https://placedog.net/120/120' }} style={styles.profileImage} />
        <Text style={styles.profileName}>
          Ezgi İmamoğlu
        </Text>
        <Text style={styles.profileRole}>
          Hayvansever
        </Text>
        <Icon type="feather" name="check-circle" size={24} color="#FEA195" containerStyle={styles.profileIcon} />
      </View>
      <View style={styles.actionsSection}>
        {_.map(actions, action => renderAction({...action}))}
      </View>

    </View>
  )
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
    justifyContent: 'flex-end'
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
    paddingVertical: 18,
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
    paddingRight: 18,
  }
});

export default withTranslation()(ProfileScreen);
