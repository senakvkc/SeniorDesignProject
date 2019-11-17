import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  AsyncStorage,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  FlatList
} from 'react-native';
import { Image, Button, Icon } from 'react-native-elements';

import { COLORS } from '../../constants/theme';
import { SHARED_PHOTOS } from '../../constants';
import { AppLoading } from 'expo';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ProfileScreen = props => {
  const [userData, setUserData] = useState(null);

  const getCurrentUser = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log(JSON.parse(userToken));
    setUserData(JSON.parse(userToken));
  };

  const goToProfileSettings = () => {
    console.log('profile settings');
  };

  const getFullName = () => {
    const { user } = userData;
    return user.firstName + ' ' + user.lastName;
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const SharedPhoto = ({ item }) => (
    <Image
      source={{ uri: item.source }}
      resizeMode="cover"
      containerStyle={styles.sharedPhoto}
    />
  );

  return !userData ? (
    <AppLoading />
  ) : (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.detailContainer}>
          <View style={styles.detailLeftContainer}>
            <Image
              resizeMode="cover"
              source={{ uri: userData.user.profilePicture }}
              containerStyle={styles.profileImage}
              PlaceholderContent={<ActivityIndicator />}
            />
            <Button
              title={'Profili Düzenle'}
              onPress={goToProfileSettings}
              containerStyle={styles.editProfileContainer}
              buttonStyle={styles.editProfileButton}
              titleStyle={styles.editProfileTitle}
            />
          </View>

          <View style={styles.detailRightContainer}>
            <View style={styles.innerDetailLeft}>
              <Text style={styles.nameText}>{getFullName()}</Text>
              <Text style={styles.roleText}>{userData.user.userType}</Text>
              <View style={styles.line} />

              <View style={styles.detailInfo}>
                <Icon
                  type="feather"
                  name="book-open"
                  color={COLORS.PRIMARY}
                  size={12}
                />
                <Text style={styles.detailText}>{userData.user.about}</Text>
              </View>

              <View style={styles.detailInfo}>
                <Icon
                  type="feather"
                  name="mail"
                  color={COLORS.PRIMARY}
                  size={12}
                />
                <Text style={styles.detailText}>{userData.user.email}</Text>
              </View>

              <View style={styles.detailInfo}>
                <Icon
                  type="feather"
                  name="smartphone"
                  color={COLORS.PRIMARY}
                  size={12}
                />
                <Text style={styles.detailText}>{userData.user.phone}</Text>
              </View>
            </View>
            <View style={styles.innerDetailRight}>
              <Icon
                type="feather"
                name="check-circle"
                color={COLORS.SUCCESS}
                size={14}
              />
              <Icon
                type="feather"
                name="alert-circle"
                color={COLORS.WARNING}
                size={14}
              />
            </View>
          </View>
        </View>

        <View style={styles.photosContainer}>
          <FlatList
            numColumns={3}
            showsVerticalScrollIndicator={false}
            data={SHARED_PHOTOS}
            renderItem={({ item }) => <SharedPhoto item={item} key={item.id} />}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  detailContainer: {
    flex: 2,
    flexDirection: 'row'
  },
  photosContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginLeft: 10,
    marginRight: 10
  },
  sharedPhoto: {
    alignSelf: 'center',
    margin: 2.5,
    borderRadius: 5,
    overflow: 'hidden',
    width: screenWidth / 3 - 12,
    height: screenWidth / 3 - 12
  },
  detailLeftContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 15
  },
  detailRightContainer: {
    flex: 2,
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    marginVertical: 15,
    marginRight: 15,
    padding: 15
  },
  approvedIcon: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-end'
  },
  profileImage: {
    flex: 1,
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    overflow: 'hidden',
    marginBottom: 10
  },
  editProfileContainer: {
    width: '100%'
  },
  editProfileButton: {
    backgroundColor: COLORS.PRIMARY,
    height: 30
  },
  editProfileTitle: {
    fontSize: 12
  },
  nameText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.PRIMARY
  },
  roleText: {
    fontSize: 12,
    lineHeight: 16,
    fontStyle: 'italic',
    color: COLORS.TEXT,
    fontWeight: '400'
  },
  line: {
    width: 50,
    height: 1,
    marginVertical: 10,
    backgroundColor: COLORS.PRIMARY
  },
  detailInfo: {
    flexDirection: 'row',
    marginVertical: 10
  },
  detailText: {
    fontSize: 12,
    lineHeight: 14,
    marginLeft: 5
  },
  innerDetailLeft: {
    flex: 3
  },
  innerDetailRight: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  }
});

export default ProfileScreen;
