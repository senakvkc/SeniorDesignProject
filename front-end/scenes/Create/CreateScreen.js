import React from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import { Button, Icon, Image } from 'react-native-elements';
import { SIZES, COLORS } from '../../constants/theme';
import { withTranslation } from 'react-i18next';
import SheltyButton from '../../components/common/SheltyButton';
import BasicSheltyButton from '../../components/common/BasicSheltyButton';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CreateScreen = ({ t, navigation }) => {
  handleNewPetClick = () => {
    console.log('clicked new pet!');
    navigation.navigate('CreatePet');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: 'https://placedog.net/500/500' }} style={styles.image} />
      </View>
      <View style={styles.actionContainer}>
        <BasicSheltyButton onPress={handleNewPetClick} text={t('adopt')} buttonStyle={styles.createButton} containerStyle={styles.adoptButtonContainer} />
        <BasicSheltyButton onPress={handleNewPetClick} text={t('adopt')} containerStyle={styles.adoptButtonContainer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.WHITE_LIGHT,
    padding: 50,
    alignItems: 'center'
  },
  imageContainer: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 20,
    overflow: 'hidden'
  },
  image: {
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
    height: '100%'
  },
  actionContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  adoptButtonContainer: {
    flex: 1,
    borderRadius: 20,
    alignContent: 'center',
    alignItems: 'stretch',
    justifyContent: 'center',
    marginVertical: 5,
  },
  createButton: {
    width: '100%'
  }
});

export default withTranslation()(CreateScreen);
