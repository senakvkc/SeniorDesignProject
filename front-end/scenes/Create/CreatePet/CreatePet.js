import React, { useState, createRef, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { TouchableOpacity, Dimensions, Text, View, StyleSheet, ScrollView, Picker, KeyboardAvoidingView, TextInput, ImageBackground } from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

import { GENDERS, AGE_INTERVALS, BREEDS } from '../../../constants/form';
import { SHADOW } from '../../../constants';

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
  const [formData, setFormData] = useState({ ...data, breed: BREEDS[0], age: AGE_INTERVALS[0], type: navigation.state.params.type });
  const [isLoading, setIsLoading] = useState(false);

  const InputIcon = ({ name }) => <Icon name={name} size={14} color="#FEA195" style={styles.inputIcon} />;

  InputIcon.propTypes = {
    name: PropTypes.string.isRequired,
  };

  const nextStep = () => {
    console.log("nextStep");
  }

  const MAIN_COLOR = formData.type === 'dog' ? '#29CCBC' : '#CCE389';

  const getStyles = sex => {
    const styles = {
      color: formData.sex === sex ? MAIN_COLOR : '#777777',
      fontFamily: formData.sex === sex ? 'RalewayBold' : 'Raleway',
    }

    return styles;
  }

  const handleBreedSelect = (breed) => setFormData({ ...formData, breed });

  const handleAgeSelect = (age) => setFormData({ ...formData, age });

  const isDisabled = validateEmptyFields([formData.name, formData.sex]) || isLoading;

  return (
    <ImageBackground source={formData.type === 'dog' ? dogBoneBg : catPawBg} style={styles.bgImage}>
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
              <TouchableOpacity onPress={() => navigation.navigate('SheltyPicker', { items: AGE_INTERVALS, selectedItem: formData.age, onSelect: handleAgeSelect, title: t('selectAge') })} activeOpacity={1}>
                <View style={styles.input}>
                  <Text style={styles.pickerText}>{formData.age.text}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.text}>{t('sex')}</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity activeOpacity={1} style={[styles.sexButton, { marginRight: 10 }]} onPress={() => setFormData({...formData, sex: 'FEMALE'})}>
                  <Icon
                    name="female-symbol"
                    type="foundation"
                    size={18}
                    color={formData.sex === 'FEMALE' ? MAIN_COLOR : '#777777'}
                    iconStyle={styles.sexIcon} 
                  />                    
                  <Text style={[styles.sexText, getStyles('FEMALE')]}>{t('female')}</Text>
                </TouchableOpacity> 
                <TouchableOpacity activeOpacity={1} style={[styles.sexButton, { marginLeft: 10 }]} onPress={() => setFormData({...formData, sex: 'MALE'})}>
                  <Icon
                    name="male-symbol"
                    type="foundation"
                    size={18}
                    color={formData.sex === 'MALE' ? MAIN_COLOR : '#777777'}
                    iconStyle={styles.sexIcon} 
                  />     
                  <Text style={[styles.sexText, getStyles('MALE')]}>{t('male')}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.text}>{t('breed')}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SheltyPicker', { items: BREEDS, selectedItem: formData.breed, onSelect: handleBreedSelect, title: t('selectBreed') })} activeOpacity={1}>
                <View style={styles.input}>
                  <Text style={styles.pickerText}>{formData.breed.text}</Text>
                </View>
              </TouchableOpacity>
            </View>
            
            <MainButton textStyle={{ color: isDisabled ? '#C9C9C9' : MAIN_COLOR }} disabled={isDisabled} onPress={nextStep} text={t('nextStep')} loading={isLoading} />
          </View>
        </ScrollView>
      </View>

      <ProgressiveImage
        thumb={formData.type === 'dog' ? dogBgThumb : catBgThumb}
        source={formData.type === 'dog' ? dogBg : catBg}
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
    bottom: 110,
    right: 30,
    width: (screenWidth / 2) - 40,
    height: (screenWidth / 2) - 40
  },
  pickerText: {
    paddingHorizontal: 10,
    color: '#777',
    fontSize: 16
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
