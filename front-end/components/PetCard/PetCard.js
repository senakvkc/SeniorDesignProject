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
    <BasicSheltyButton
      onPress={goToPetProfile}
      text="Profil"
      containerStyle={styles.containerStyle}
      profileButtonStyle={styles.profileButton}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} width={100} height={100} source={{ uri: pet.thumbnail }} />
      </View>
      <View style={styles.detailContainer}>
        <View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>Charlie</Text>
            <Icon
              type="ionicon"
              name={pet.sex === SEX.MALE.text() ? 'ios-male' : 'ios-female'}
              size={SIZES.NORMAL_TEXT}
              color={COLORS.BLACK_A}
            />
          </View>
          <Text style={styles.breedText}>Labrador</Text>
        </View>
        <View>
          <View style={styles.ageContainer}>
          <Icon
              type="feather"
              name="gift"
              size={SIZES.NORMAL_TEXT}
              color={COLORS.SILVER_PINK}
              style={styles.mapIcon}
            />
          <Text style={styles.ageText}>18 aylık</Text>
          </View>
          <View style={styles.locationContainer}>
            <Icon
              type="feather"
              name="map-pin"
              size={SIZES.NORMAL_TEXT}
              color={COLORS.SILVER_PINK}
              style={styles.mapIcon}
            />
            <Text style={styles.locationText}>{pet.shelter}</Text>
          </View>
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
    height: 120,
    marginVertical: 15,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
    borderRadius: 15,
    padding: 10,
  },
  detailContainer: {
    flex: 1,
    height: 100,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 10,
    alignItems: 'stretch',
    alignContent: 'stretch'
  },
  imageContainer: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  image: {
    overflow: 'hidden',
    borderRadius: 15,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '600',
  },
  breedText: {
    fontSize: 14,
    color: '#444'
  },
  ageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  ageText: {
    fontSize: 12,
    color: '#424242',
    marginLeft: 5
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: '400',
    color: '#424242',
  },
});

PetCard.propTypes = {
  t: PropTypes.func.isRequired,
  pet: PropTypes.object.isRequired,
};

PetCard.defaultProps = {};

export default withTranslation()(PetCard);
