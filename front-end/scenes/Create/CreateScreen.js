import React from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import { Button, Icon, Image } from 'react-native-elements';
import { SIZES, COLORS } from '../../constants/theme';
import { withTranslation } from 'react-i18next';
import SheltyButton from '../../components/common/SheltyButton';
import BasicSheltyButton from '../../components/common/BasicSheltyButton';
import { ANIMAL_TYPES } from '../../constants';
import newPetBg from '../../assets/new_pet_bg.jpg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CreateScreen = ({ t, navigation }) => {
  handleNewPetClick = type => {
    navigation.navigate('CreatePet', {
      type: type.key
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.actionContainer}>
        <BasicSheltyButton
          onPress={() => handleNewPetClick(ANIMAL_TYPES.CAT)}
          text={t('addNewCat')}
          buttonStyle={styles.createButton}
          containerStyle={styles.adoptButtonContainer}
          titleStyle={styles.buttonTitle}
        />
        <BasicSheltyButton onPress={() => handleNewPetClick(ANIMAL_TYPES.DOG)} text={t('addNewDog')} containerStyle={styles.adoptButtonContainer} titleStyle={styles.buttonTitle} />
      </View>
      <View style={styles.backgroundContainer}>
        <Image source={newPetBg} style={styles.newPetBg} />
      </View>
    </View>
  );
};

CreateScreen.navigationOptions = {
  title: 'Evcil Hayvan Ekle'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.WHITE_LIGHT,
    padding: 25,
    alignItems: 'center'
  },
  actionContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 15
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
  },
  backgroundContainer: {
    flex: 1
  },
  newPetBg: {
    width: screenWidth,
    height: screenWidth * 0.66
  },
  buttonTitle: {
    fontSize: 18
  }
});

export default withTranslation()(CreateScreen);
