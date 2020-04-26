import React, { useState } from 'react'
import { 
  Text, 
  View, 
  ScrollView, 
  StyleSheet, 
  ImageBackground, 
  Dimensions, 
  Image, 
  TouchableOpacity 
} from 'react-native'
import { withTranslation } from 'react-i18next';
import _ from 'lodash';

import { DOG_CHARACTERISTICS, CAT_CHARACTERISTICS, SHADOW, ANIMAL_TYPES } from '../../../constants';
import MainButton from '../../../components/common/MainButton';
import ProgressiveImage from '../../../components/common/ProgressiveImage';
import dogBoneBg from '../../../assets/dog-bone-bg.png';
import catPawBg from '../../../assets/cat-paw-bg.png';
import catBg from '../../../assets/cat-bg.png';
import dogBg from '../../../assets/dog-bg.png';
import catBgThumb from '../../../assets/cat-bg-thumb.png';
import dogBgThumb from '../../../assets/dog-bg-thumb.png';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CreateAdditional = ({ t, navigation }) => {
  const { data } = navigation.state.params;
  const [formData, setFormData] = useState({
    ...data,
    characteristics: []
  });
  const [isLoading, setIsLoading] = useState(false);

  const nextStep = () => {
    navigation.navigate('CreateFinal', {
      data: formData
    });
  };

  const isSelected = item => _.includes(formData.characteristics, item);

  const getTextStyles = (item) => {
    return {
      color: isSelected(item) ? MAIN_COLOR : '#777',
      fontFamily: isSelected(item) ? 'RalewayBold' : 'Raleway'
    }
  }

  const selectChar = item => {
    const { characteristics } = formData;
    if (!_.includes(characteristics, item)) {
      if (characteristics.length < 3) {
        setFormData({ ...formData, characteristics: [...characteristics, item] })
      }
    } else {
      setFormData({ ...formData, characteristics: _.filter(characteristics, char => !_.isEqual(char, item)) })
    }
  }

  const isDog = () => formData.type.value === ANIMAL_TYPES.DOG.value;
  const MAIN_COLOR = isDog() ? '#29CCBC' : '#CCE389';
  const isFemale = () => formData.sex.value === GENDERS.FEMALE.value;
  const isDisabled = formData.characteristics.length < 3;
  const CHARACTERISTICS = isDog() ? DOG_CHARACTERISTICS : CAT_CHARACTERISTICS;

  return (
    <ImageBackground 
      source={formData.type.value === ANIMAL_TYPES.DOG.value ? dogBoneBg : catPawBg} 
      style={styles.bgImage}
    >
      <View style={styles.container}>
        <ScrollView style={styles.innerContainer}>
          <Text style={styles.featuresMessage}>{t('chooseFeatures')}</Text>
          <View style={styles.charItemContainer}>
            {_.map(CHARACTERISTICS, (char, index) => (
              <TouchableOpacity activeOpacity={1} 
                onPress={() => selectChar(char)} key={char.key} 
                style={[styles.charItem, { marginLeft: index % 2 === 0 ? 0 : 10, marginRight: index % 2 === 0 ? 10 : 0 }]}
              >
                <Image source={char.image} style={styles.charImage} />
                <Text style={[styles.charText, getTextStyles(char)]}>{char.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <MainButton textStyle={{ color: isDisabled ? '#C9C9C9' : MAIN_COLOR }} disabled={isDisabled} onPress={nextStep} text={t('nextStep')} loading={isLoading} />
        </ScrollView>
        
      </View>
      <ProgressiveImage
        thumb={isDog() ? dogBgThumb : catBgThumb}
        source={isDog() ? dogBg : catBg}
        style={styles.petImage}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 25,
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    width: screenWidth - 80,
  },
  charItemContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  charItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    width: (screenWidth - 100) / 2,
    height: 50,
    ...SHADOW,
    marginBottom: 30,
    backgroundColor: '#fff',
    paddingHorizontal: 10
  },
  petImage: {
    position: 'absolute',
    bottom: 110,
    right: 30,
    width: (screenWidth / 2) - 40,
    height: (screenWidth / 2) - 40
  },
  featuresMessage: {
    fontSize: 16,
    fontFamily: 'RalewayBold',
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  charImage: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  charText: {
    fontSize: 16,
    fontFamily: 'Raleway'
  }
});


export default withTranslation()(CreateAdditional);
