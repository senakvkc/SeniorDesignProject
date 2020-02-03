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

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ProfileScreen = ({ t }) => {
  const [userData, setUserData] = useState(null);

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

  const getCurrentUser = async () => {
    const userToken = await AsyncStorage.getItem(USER_TOKEN);
    console.log(JSON.parse(userToken));
    setUserData(JSON.parse(userToken));
  };

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
        <SheltyButton
          buttonStyles={styles.adoptButton}
          onPressFunction={goToAdopt}
          gradientStyles={styles.adoptButtonContainer}
          textStyles={styles.adoptButtonText}
          text={t('adopt')}
        />
      </View>
    </View>
  );

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
    flexDirection: 'row',
    width: screenWidth - 60,
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
    borderRadius: 10,
    height: 30
  },
  adoptButton: {
    width: '100%',
    marginLeft: 15,
    backgroundColor: COLORS.PURPLE,
    borderRadius: 10,
    justifyContent: 'center',
    height: 35
  },
  adoptButtonText: {
    fontSize: SIZES.NORMAL_TEXT,
    color: COLORS.WHITE_F9,
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: 35,
    fontWeight: '400'
  }
});

export default withTranslation()(ProfileScreen);
