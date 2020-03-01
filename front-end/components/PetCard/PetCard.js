import React from 'react';
import { StyleSheet, TextInput, View, Text, Dimensions, Image } from 'react-native';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { COLORS, SIZES } from '../../constants/theme';
import { Icon, Button } from 'react-native-elements';
import { SEX } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import SheltyButton from '../common/SheltyButton';
import BasicSheltyButton from '../common/BasicSheltyButton';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const PetCard = ({ t, pet }) => {
  const goToPetProfile = () => {
    console.log('pet profile');
  };

  const renderMainInfo = (
    <View style={styles.detail}>
      <View style={styles.mainInfo}>
        <View style={styles.mainInfoTop}>
          <Text style={styles.title}>{pet.name}</Text>
          <Text style={styles.age}>{t('monthAge', { age: pet.age })}</Text>
        </View>
        <View>
          <Text style={styles.breed}>{pet.breed}</Text>
        </View>
      </View>
      <View style={styles.sexIcon}>
        <Icon
          type="ionicon"
          name={pet.sex === SEX.MALE.text() ? 'ios-male' : 'ios-female'}
          size={SIZES.NORMAL_TEXT}
          color={COLORS.BLACK_A}
        />
      </View>
    </View>
  );

  const renderLocation = (
    <View style={styles.location}>
      <Icon type="feather" name="map-pin" size={SIZES.NORMAL_TEXT} color={COLORS.SILVER_PINK} style={styles.mapIcon} />
      <Text style={styles.address}>{pet.shelter}</Text>
    </View>
  );

  const renderProfileButton = (
    <BasicSheltyButton onPress={goToPetProfile} text="Profil" containerStyle={styles.containerStyle} profileButtonStyle={styles.profileButton} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} width={150} height={150} source={{ uri: pet.thumbnail }} />
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.detailMask}></View>
        <View style={styles.detailBackground}>
          {renderMainInfo}
          {renderLocation}
          {renderProfileButton}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: screenWidth - 40,
    height: 150,
    maxWidth: 330,
    marginVertical: 15,
    alignItems: 'center'
  },
  imageContainer: {
    width: 150,
    height: 150,
    overflow: 'hidden',
    borderRadius: 20
  },
  image: {
    overflow: 'hidden',
    borderRadius: 20
  },
  detailContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 150
  },
  detailMask: {
    width: '100%',
    height: 120,
    borderRadius: 20,
    backgroundColor: COLORS.MASK,
    position: 'absolute',
    top: 18,
    left: 3
  },
  detailBackground: {
    flexDirection: 'column',
    width: '100%',
    height: 120,
    paddingHorizontal: 10,
    backgroundColor: COLORS.WHITE_F9,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'space-between',
    paddingTop: 10,
    borderWidth: 1,
    borderColor: COLORS.WHITE_FB
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mainInfo: {
    flex: 1,
    flexDirection: 'column'
  },
  mainInfoTop: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 5
  },
  title: {
    fontSize: SIZES.NORMAL_TEXT,
    color: COLORS.BLACK
  },
  age: {
    fontSize: SIZES.MINI_TEXT,
    color: COLORS.BLACK_A,
    fontWeight: '400',
    marginLeft: 5
  },
  breed: {
    fontSize: SIZES.MINI_TEXT,
    color: COLORS.BLACK_63
  },
  sexIcon: {
    alignSelf: 'center',
    color: COLORS.BLACK_A,
    fontWeight: '400'
  },
  location: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center'
  },
  address: {
    marginLeft: 5,
    fontSize: SIZES.MINI_TEXT,
    fontWeight: '400',
    color: COLORS.BLACK_63
  },
  profileButtonContainer: {
    borderRadius: 10,
    height: 35,
    position: 'relative',
    top: 15,
  },
  profileButton: {
    width: 150,
    alignContent: 'center'
  },
  profileButtonText: {
    fontSize: SIZES.NORMAL_TEXT,
    color: COLORS.WHITE_F9,
    textAlign: 'center',
    alignSelf: 'center',
  },
  containerStyle: {
    borderRadius: 10,
    height: 35,
    position: 'relative',
    top: 15
  },
});

PetCard.propTypes = {
  t: PropTypes.func.isRequired,
  pet: PropTypes.object.isRequired
};

PetCard.defaultProps = {};

export default withTranslation()(PetCard);
