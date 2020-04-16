import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  AsyncStorage,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  FlatList,
  ImageBackground,
  StatusBar
} from 'react-native';
import { Image, Icon } from 'react-native-elements';
import _ from 'lodash';

import { COLORS, SIZES } from '../../constants/theme';
import { SHARED_PHOTOS, USER_TOKEN } from '../../constants';
import { withTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';

import FriendlySvg from '../../assets/svgs/friendly-cat.svg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const actualHeight = screenHeight - 60;
const pad = 24;
const cardHeight = 100;
const cardPosition =  ((cardHeight / 2) + 24) * -1; 

const ProfileScreen = ({ t }) => {
  const [userData, setUserData] = useState(null);

  const getCurrentUser = async () => {
    const userToken = await AsyncStorage.getItem(USER_TOKEN);
    console.log(JSON.parse(userToken));
    setUserData(JSON.parse(userToken));
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getFullName = () => {
    const { user } = userData;
    return user.firstName + ' ' + user.lastName;
  };

  const goToAdopt = () => {
    console.log('adopt');
  };

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <View style={styles.photoSection}>
          <View style={styles.topActions}>

          </View>
          <View style={styles.photo}>
            <Text>Photo Section</Text>
          </View>
        </View>

        <View style={styles.mainSection}>
          <View style={styles.petCard}>
            <View style={styles.leftPetCard}>
              <View style={styles.petName}>
                <Text style={styles.petNameText}>
                  Daisy
                </Text>
                <Icon type="ionicon" name="ios-female" color="#AAA" size={18} />
              </View>
              <Text style={styles.breed}>Absinian Cat</Text>
              <Text style={styles.age}>2 years old</Text>
            </View>
            <View style={styles.rightPetCard}>
              <View style={styles.petCardActions}>
                <Icon iconStyle={styles.petCardActionIcon} type="feather" name="share-2" color="#FEA195" size={16} />
                <Icon type="feather" name="heart" color="#FEA195" size={16} />
              </View>
            </View>
          </View>

          <View style={styles.features}>
            <View style={styles.featureItem}>
              <FriendlySvg width={30} height={30} />
              <Text style={styles.featureText}>Friendly</Text>
            </View>
            <View style={styles.featureItem}>
              <FriendlySvg width={30} height={30} />
              <Text style={styles.featureText}>Friendly</Text>
            </View>
            <View style={styles.featureItem}>
              <FriendlySvg width={30} height={30} />
              <Text style={styles.featureText}>Friendly</Text>
            </View>
          </View>

          <View style={styles.owner}>
          <Text>Owner</Text>

          </View>

          <View style={styles.contact}>
          <Text>Contact</Text>

          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: actualHeight,
    flexDirection: 'column',
  },
  photoSection: {
    flex: 4,
    backgroundColor: '#FEA195',
  },
  mainSection: {
    flex: 6,
    padding: pad,
    flexDirection: 'column',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#fff',
    position: 'relative',
    top: -15,
  },
  petCard: {
    height: 100,
    backgroundColor: '#fff',
    position: 'relative',
    top: cardPosition,
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  petName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  petNameText: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 10,
  },
  breed: {
    fontSize: 14,
    marginBottom: 5,
    color: '#454545'
  },
  age: {
    fontSize: 14,
    color: '#454545'
  },
  rightPetCard: {
    justifyContent: 'center'
  },
  petCardActions: {
    flexDirection: 'row',
  },
  petCardActionIcon: {
    marginRight: 10
  },


  features: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    top: (cardHeight / 2) * -1
  },
  featureItem: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFF5F4',
    borderRadius: 10
  },
  featureText: {
    color: '#FEA195'
  },

  owner: {
    flex: 10,
    backgroundColor: '#A4BEEA',
  },
  contact: {
    flex: 5,
    backgroundColor: '#8ED5A6',
  }
});

export default withTranslation()(ProfileScreen);
