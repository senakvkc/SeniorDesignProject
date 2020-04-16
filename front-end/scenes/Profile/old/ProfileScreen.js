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
import { AppLoading } from 'expo';
import { withTranslation } from 'react-i18next';
import ProfileImages from '../../components/ProfileImages';
import ProfileInfoCard from '../../components/ProfileInfoCard';
import OwnerInfo from '../../components/OwnerInfo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SheltyButton from '../../components/common/SheltyButton';
import BasicSheltyButton from '../../components/common/BasicSheltyButton';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ProfileScreen = ({ t }) => {
  const [userData, setUserData] = useState(null);

  const getCurrentUser = async () => {
    const userToken = await AsyncStorage.getItem(USER_TOKEN);
    console.log(JSON.parse(userToken));
    setUserData(JSON.parse(userToken));
  };

  const featureData = [
    {
      color: COLORS.PURPLE,
      icon: 'align-center',
      feature: 'Friendly'
    },
    {
      color: COLORS.PURPLE,
      icon: 'align-center',
      feature: 'Playful'
    },
    {
      color: COLORS.PURPLE,
      icon: 'align-center',
      feature: 'Angry'
    }
  ];

  const goToProfileSettings = () => {
    console.log('profile settings');
  };

  const goToReportUser = () => {
    console.log('user report screen');
  };

  const getFullName = () => {
    const { user } = userData;
    return user.firstName + ' ' + user.lastName;
  };

  const goToAdopt = () => {
    console.log('adopt');
  };

  useEffect(() => {}, []);

  const renderPhoneNumber = number => {
    return number;
  };

  const renderFeature = ({ color, icon, feature }) => (
    <View key={feature} style={{ ...styles.feature, backgroundColor: color }}>
      <Icon type="feather" name={icon} size={SIZES.HUGE} color={COLORS.SILVER_PINK} />
      <Text style={styles.featureText}>{feature}</Text>
    </View>
  );

  const renderProfileActions = () => (
    <View style={styles.actionContainer}>
      <View style={styles.likeContainer}>
        <Icon type="feather" name="heart" size={SIZES.NORMAL_TEXT} color={COLORS.WHITE_F9} />
      </View>
      <View style={styles.adoptButtonContainer}>
        <BasicSheltyButton onPress={goToAdopt} text={t('adopt')} containerStyle={styles.adoptButtonContainer} />
      </View>
    </View>
  );

  const renderProfileCard = () => (
    <>
      <View style={styles.mainInfoMask} />

      <View style={styles.mainInfoContainer}>
        <View style={styles.mainLeft}>
          <Text style={styles.title}>Daisy</Text>
          <Text style={styles.breed}>Abnisian Cat</Text>
          <View style={styles.location}>
            <Icon type="feather" name="map-pin" size={SIZES.SMALL_TEXT} color={COLORS.SILVER_PINK} />
            <Text style={styles.locationText}>Sarıyer, İstanbul</Text>
          </View>
        </View>

        <View style={styles.mainRight}>
          <Icon type="ionicon" name="ios-female" size={SIZES.SMALL_TEXT} color={COLORS.BLACK_A} />
          <Text style={styles.age}>2 aylık</Text>
        </View>
      </View>
    </>
  )

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <ProfileImages />

        <View style={styles.profileContainer}>
          <ProfileInfoCard />

          <View style={styles.mainContainer}>
            <View style={styles.features}>{_.map(featureData, feature => renderFeature(feature))}</View>

            <OwnerInfo />

            {renderProfileActions()}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  profileContainer: {
    flex: 3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center'
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  features: {
    width: screenWidth - 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    marginTop: -25
  },
  feature: {
    justifyContent: 'center',
    backgroundColor: COLORS.PURPLE,
    borderRadius: 10,
    width: 80,
    height: 80
  },
  featureText: {
    textAlign: 'center',
    color: COLORS.WHITE,
    fontSize: SIZES.SMALL_TEXT,
    fontWeight: '400'
  },
  actionContainer: {
    width: screenWidth - 60,
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'stretch'
  },
  likeContainer: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.PURPLE,
    borderRadius: 10,
    justifyContent: 'center'
  },
  adoptButtonContainer: {
    flex: 1,
    height: 35,
    marginLeft: 5,
    borderRadius: 10,
  },
  adoptButton: {
    marginLeft: 15,
    backgroundColor: COLORS.PURPLE,
    borderRadius: 10,
    alignContent: 'center'
  },
  adoptButtonText: {
    width: '100%',
    fontSize: SIZES.NORMAL_TEXT,
    color: COLORS.WHITE_F9,
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: 35,
    fontWeight: '400'
  },


  mainInfoMask: {
    position: 'absolute',
    left: 33,
    top: -37,
    width: screenWidth - 60,
    backgroundColor: COLORS.MASK,
    borderRadius: 10,
    height: 80
  },
  mainLeft: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'space-between'
  },
  title: {
    fontWeight: '600',
    fontSize: SIZES.BIG_TEXT
  },
  breed: {
    fontWeight: '400',
    fontSize: SIZES.SMALL_TEXT,
    color: COLORS.BLACK_63
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  locationText: {
    marginLeft: 5,
    fontSize: SIZES.SMALL_TEXT,
    fontWeight: '400',
    color: COLORS.BLACK_A
  },
  mainRight: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: 10,
    justifyContent: 'space-evenly'
  },
  age: {
    fontSize: SIZES.SMALL_TEXT,
    fontWeight: '400',
    color: COLORS.BLACK_63,
    alignContent: 'center',
    justifyContent: 'center'
  }
});

export default withTranslation()(ProfileScreen);
