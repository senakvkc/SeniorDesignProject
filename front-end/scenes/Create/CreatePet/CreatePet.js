import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import { 
  TouchableOpacity, 
  Dimensions, 
  Text, 
  View, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  ImageBackground 
} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

import { AGE_INTERVALS, BREEDS } from '../../../constants/form';
import { SHADOW, ANIMAL_TYPES, GENDERS } from '../../../constants';

import MainButton from '../../../components/common/MainButton';
import ProgressiveImage from '../../../components/common/ProgressiveImage';

import dogBoneBg from '../../../assets/dog-bone-bg.png';
import catPawBg from '../../../assets/cat-paw-bg.png';
import catBg from '../../../assets/cat-bg.png';
import dogBg from '../../../assets/dog-bg.png';
import catBgThumb from '../../../assets/cat-bg-thumb.png';
import dogBgThumb from '../../../assets/dog-bg-thumb.png';
import { validateEmptyFields } from '../../../utils/Validator';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CreatePet = ({ t, navigation, data }) => {
  const { type } = navigation.state.params;
  const [formData, setFormData] = useState({ ...data, breed: BREEDS[0], age: AGE_INTERVALS[0], type, sex: { value: '' } });
  const [isLoading, setIsLoading] = useState(false);

  const nextStep = () => {
    navigation.navigate('CreateAdditional', { data: formData });
  }

  const MAIN_COLOR = formData.type.value === ANIMAL_TYPES.DOG.value ? '#29CCBC' : '#CCE389';

  const getStyles = sex => {
    return {
      color: formData.sex.value === sex.value ? MAIN_COLOR : '#777777',
      fontFamily: formData.sex.value === sex.value ? 'RalewayBold' : 'Raleway',
    };
  }

  const handleBreedSelect = (breed) => setFormData({ ...formData, breed }); 
  const handleAgeSelect = (age) => setFormData({ ...formData, age }); 
  const isDisabled = validateEmptyFields([formData.name, formData.sex.value]) || isLoading;
  const isFemale = () => formData.sex.value === GENDERS.FEMALE.value;
  const isMale = () => formData.sex.value === GENDERS.MALE.value;
  const isDog = () => formData.type.value === ANIMAL_TYPES.DOG.value;

  const renderActions = (
      <View style={styles.actionContainer}>
        <Icon name="chevron-left" type="feather" size={24} color="#FFF" onPress={() => navigation.goBack()} />
      </View>
    )

  return (
    <ImageBackground source={formData.type.value === ANIMAL_TYPES.DOG.value ? dogBoneBg : catPawBg} style={styles.bgImage}>
      {renderActions}
      <View style={styles.container}>
        <ScrollView style={styles.innerContainer}>
          <View>
            <View style={styles.inputContainer}>
              <Text style={styles.text}>{t('name')}</Text>
              <View style={styles.input}>
                <TextInput
                  style={styles.textInput}
                  value={formData.name}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                  returnKeyType="next"
                  placeholder={t('name')}
                  clearButtonMode="while-editing"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.text}>{t('age')}</Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate('SheltyPicker', { items: AGE_INTERVALS, selectedItem: formData.age, onSelect: handleAgeSelect, title: t('selectAge') })} 
                activeOpacity={1}
              >
                <View style={styles.input}>
                  <Text style={styles.pickerText}>{formData.age.text}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.text}>{t('sex')}</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity 
                  activeOpacity={1} style={[styles.sexButton, { marginRight: 10 }]} 
                  onPress={() => setFormData({...formData, sex: GENDERS.FEMALE})}
                >
                  <Icon
                    name="female-symbol"
                    type="foundation"
                    size={18}
                    color={isFemale() ? MAIN_COLOR : '#777777'}
                    iconStyle={styles.sexIcon} 
                  />                    
                  <Text style={[styles.sexText, getStyles(GENDERS.FEMALE)]}>{t('female')}</Text>
                </TouchableOpacity> 
                <TouchableOpacity 
                  activeOpacity={1} 
                  style={[styles.sexButton, { marginLeft: 10 }]} 
                  onPress={() => setFormData({...formData, sex: GENDERS.MALE})}
                >
                  <Icon
                    name="male-symbol"
                    type="foundation"
                    size={18}
                    color={isMale() ? MAIN_COLOR : '#777777'}
                    iconStyle={styles.sexIcon} 
                  />     
                  <Text style={[styles.sexText, getStyles(GENDERS.MALE)]}>{t('male')}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.text}>{t('breed')}</Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate('SheltyPicker', { items: BREEDS, selectedItem: formData.breed, onSelect: handleBreedSelect, title: t('selectBreed') })} 
                activeOpacity={1}
              >
                <View style={styles.input}>
                  <Text style={styles.pickerText}>{formData.breed.text}</Text>
                </View>
              </TouchableOpacity>
            </View>
            
            <MainButton 
              textStyle={{ color: isDisabled ? '#C9C9C9' : MAIN_COLOR }} 
              disabled={isDisabled} 
              onPress={nextStep} 
              text={t('nextStep')} 
              loading={isLoading} 
            />
          </View>
        </ScrollView>
      </View>

      <ProgressiveImage
        thumb={isDog() ? dogBgThumb : catBgThumb}
        source={isDog() ? dogBg : catBg}
        style={styles.petImage}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 25
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
    paddingHorizontal: 15
  },
  inputContainer: {
    flex: 1,
    marginBottom: 20,
    width: screenWidth - 80,
    flexDirection: 'column'
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    height: 50,
    ...SHADOW
  },
  inputIcon: {
    marginHorizontal: 10,
  },
  textInput: {
    color: '#5C5C5C',
    fontSize: 16,
    flex: 1,
    fontFamily: 'Raleway',
    paddingLeft: 10
  },
  text: {
    fontSize: 16,
    fontFamily: 'Raleway',
    marginBottom: 5,
    color: '#fff'
  },

  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    width: screenWidth - 80
  },
  sexButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center',
    color: '#777',
    ...SHADOW,
    paddingHorizontal: 10
  },
  sexText: {
    fontSize: 16,
    fontFamily: 'Raleway'
  },
  sexIcon: {
    marginRight: 5
  },
  petImage: {
    position: 'absolute',
    bottom: 50,
    right: 30,
    width: (screenWidth / 2) - 40,
    height: (screenWidth / 2) - 40
  },
  pickerText: {
    paddingHorizontal: 10,
    color: '#777',
    fontSize: 16
  },
  actionContainer: {
    flexDirection: 'row',
    width: screenWidth - 80,
    justifyContent: 'flex-start',
    marginTop: 40
  }
});

CreatePet.propTypes = {
  t: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({})
};

CreatePet.defaultProps = {
  data: {}
}

export default withTranslation()(CreatePet);
