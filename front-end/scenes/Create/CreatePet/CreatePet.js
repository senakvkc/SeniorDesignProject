import React, { useState, createRef } from 'react';
import { withTranslation } from 'react-i18next';
import { Text, View, StyleSheet, ScrollView, Picker, KeyboardAvoidingView, Keyboard, TextInput } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import _ from 'lodash';
import moment from 'moment';
import StepIndicator from 'react-native-step-indicator';

import { COLORS, SIZES } from '../../../constants/theme';
import { GENDERS, AGE_INTERVALS, BREEDS } from '../../../constants/form';

import SheltyButton from '../../../components/common/SheltyButton';
import BasicSheltyButton from '../../../components/common/BasicSheltyButton';
import CreateSteps from '../../../components/CreateSteps';

const CreatePet = ({ t, navigation, data }) => {

  const defaultState = {
    name: data ? data.name : null,
    breed: data ? data.breed : BREEDS[0].value,
    gender: data ? data.gender : GENDERS[0].value,
    age: data ? data.age : AGE_INTERVALS[0].value
  };

  const { type } = navigation.state.params;

  const [formData, setFormData] = useState({ ...defaultState, type });

  const [errors, setErrors] = useState({
    nameField: null,
    breedField: null,
    genderField: null,
    ageField: null
  });

  const handleNameChange = name => setFormData({ ...formData, name: _.trim(name) });

  const handleBreedChange = (itemValue, itemIndex) => setFormData({ ...formData, breed: _.trim(itemValue) });

  const handleGenderChange = (itemValue, itemIndex) => setFormData({ ...formData, gender: _.trim(itemValue) });

  const handleAgeChange = (itemValue, itemIndex) => setFormData({ ...formData, age: _.trim(itemValue) });

  const handleNext = () => {
    navigation.navigate('CreateAdditional', {
      data: formData
    });
  };

  const renderNameField = () => (
    <View style={styles.fieldContainer}>
      <Text style={styles.formInputText}>Name</Text>
      <TextInput
        style={styles.formInputField}
        onChangeText={text => handleNameChange(text)}
        value={formData.name}
        underlineColorAndroid="transparent"
      />
    </View>
  );

  const renderBreedField = () => (
    <View style={styles.fieldContainer}>
      <View style={styles.pickerContainer}>
  <Text style={styles.pickerText}>{t('breed')}</Text>
        <Picker
          selectedValue={formData.breed}
          style={styles.formPickerField}
          onValueChange={(itemValue, itemIndex) => handleBreedChange(itemValue, itemIndex)}
          itemStyle={styles.formPickerItem}
          mode="dropdown"
        >
          {_.map(BREEDS, breed => (
            <Picker.Item key={breed.value} label={breed.text} value={breed.value} />
          ))}
        </Picker>
      </View>
    </View>
  );

  const renderGenderField = () => (
    <View style={styles.fieldContainer}>
      <View style={styles.pickerContainer}>
  <Text style={styles.pickerText}>{t('gender')}</Text>
        <Picker
          selectedValue={formData.gender}
          style={styles.formPickerField}
          onValueChange={(itemValue, itemIndex) => handleGenderChange(itemValue, itemIndex)}
          itemStyle={styles.formPickerItem}
          mode="dropdown"
        >
          {_.map(GENDERS, gender => (
            <Picker.Item key={gender.value} label={gender.text} value={gender.value} />
          ))}
        </Picker>
      </View>
    </View>
  );

  const renderAgeField = () => (
    <View style={styles.fieldContainer}>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerText}>{t('age')}</Text>
        <Picker
          selectedValue={formData.age}
          style={styles.formPickerField}
          onValueChange={(itemValue, itemIndex) => handleAgeChange(itemValue, itemIndex)}
          itemStyle={styles.formPickerItem}
          mode="dropdown"
        >
          {_.map(AGE_INTERVALS, ageInterval => (
            <Picker.Item key={ageInterval.value} label={ageInterval.text} value={ageInterval.value} />
          ))}
        </Picker>
      </View>
    </View>
  );

  const renderForm = () => (
    <>
      {renderNameField()}
      {renderGenderField()}
      {renderAgeField()}
      {renderBreedField()}
    </>
  );

  const renderNextButton = () => (
    <View style={styles.stepActionContainer}>
      <BasicSheltyButton disabled={isNextDisabled} onPress={handleNext} text={t('nextStep')} containerStyle={styles.stepButton} />
    </View>
  );

  const isNextDisabled = _.isEmpty(_.trim(formData.name)) || _.isEmpty(_.trim(formData.breed)) || _.isEmpty(_.trim(formData.gender)) || _.isEmpty(_.trim(formData.age));

  return (
    <View style={styles.container}>
      <CreateSteps step={0} />
      <ScrollView>
        <KeyboardAvoidingView behaviour="padding" style={styles.formContainer}>
          {renderForm()}
          {renderNextButton()}
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    padding: 15,
    marginTop: 10,
    backgroundColor: COLORS.WHITE_FB
  },
  stepActionContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10
  },
  stepButton: {
    flex: 1,
    borderRadius: 10,
    height: 40
  },

  fieldContainer: {
    marginVertical: 10
  },
  formInputField: {
    height: 60,
    borderWidth: 1,
    borderColor: COLORS.WHITE_D9,
    borderRadius: 5,
    paddingLeft: 15,
    paddingTop: 25,
    color: COLORS.BLACK_25
  },
  formInputText: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.WHITE_D9,
    position: 'relative',
    top: 25,
    left: 15
  },
  pickerContainer: {
    height: 60,
    borderWidth: 1,
    borderColor: COLORS.WHITE_D9,
    borderRadius: 5,
    paddingLeft: 15,
    color: COLORS.BLACK_63,
    paddingTop: 5
  },
  pickerText: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.WHITE_D9,
  },
  formPickerField: {
    color: COLORS.BLACK_63,
    marginLeft: -5,
    fontSize: 12,
    position: 'relative',
    bottom: 5,
  },
  formPickerItem: {
    fontSize: 12
  }
});

export default withTranslation()(CreatePet);
