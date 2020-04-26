import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, StatusBar, ImageBackground } from 'react-native';
import { withTranslation } from 'react-i18next';

import catBg from '../../assets/cat-bg.png';
import dogBg from '../../assets/dog-bg.png';
import catBgThumb from '../../assets/cat-bg-thumb.png';
import dogBgThumb from '../../assets/dog-bg-thumb.png';
import catPawBg from '../../assets/cat-paw-bg.png';
import dogBoneBg from '../../assets/dog-bone-bg.png';

import MainButton from '../../components/common/MainButton';
import ProgressiveImage from '../../components/common/ProgressiveImage';
import { ANIMAL_TYPES } from '../../constants';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CreateScreen = ({ t, navigation }) => {
  const [selectedType, setSelectedType] = useState({ value: '' });

  const CreatePetButton = () => (
    <View style={styles.buttonContainer}>
      <MainButton 
        onPress={goToCreateScreen} 
        textStyle={selectedType.value === ANIMAL_TYPES.DOG.value ? styles.dogColor : styles.catColor}
        text={selectedType.value === ANIMAL_TYPES.DOG.value ? t('addNewDog') : t('addNewCat')} 
      />  
    </View>
  );

  const goToCreateScreen = () => {
    if (selectedType.value !== null) {
      navigation.navigate('CreatePet', { type: selectedType });
    }
  };

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <ImageBackground 
          source={dogBoneBg} 
          style={[styles.bg, selectedType.value === ANIMAL_TYPES.DOG.value ? styles.fullOpacity : styles.lowOpacity]}
        >
          <View style={styles.section}>
            <TouchableOpacity onPress={() => setSelectedType(ANIMAL_TYPES.DOG)} activeOpacity={1} style={styles.innerSection}>
              <View />
              {selectedType.value === ANIMAL_TYPES.DOG.value && <CreatePetButton />}
               <ProgressiveImage
                  thumb={dogBgThumb}
                  source={dogBg}
                  style={styles.bgImage}
                />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <ImageBackground 
          source={catPawBg} 
          style={[styles.bg, selectedType.value === ANIMAL_TYPES.CAT.value ? styles.fullOpacity : styles.lowOpacity]}
        >
          <View style={styles.section}>
            <TouchableOpacity onPress={() => setSelectedType(ANIMAL_TYPES.CAT)} activeOpacity={1} style={styles.innerSection}>
              <View />
              {selectedType.value === ANIMAL_TYPES.CAT.value && <CreatePetButton />}
              <ProgressiveImage
                thumb={catBgThumb}
                source={catBg}
                style={styles.bgImage}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  section: {
    flex: 1
  },
  bg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerSection: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  bgImage: {
    width: (screenWidth / 2) - 40,
    height: (screenWidth / 2) - 40
  },
  fullOpacity: {
    opacity: 1
  },
  lowOpacity: {
    opacity: 0.5
  },
  buttonContainer: {
    width: (screenWidth / 2) - 40
  },
  dogColor: {
    color: '#29CCBC',
  },
  catColor: {
    color: '#CCE389'
  }
});

export default withTranslation()(CreateScreen);
