import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Picker,
  TextInput,
  Platform,
  DatePickerIOS,
  DatePickerAndroid,
  KeyboardAvoidingView,
  Image
} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import _ from 'lodash';
import moment from 'moment';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { DOG_BREEDS, CAT_BREEDS } from '../../../constants';
import { COLORS } from '../../../constants/theme';

const CreatePet = ({ t }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: null,
    type: 'DOG',
    breed: DOG_BREEDS[0].breed,
    gender: 'MALE',
    birthdate: moment().toDate(),
    description: null,
    healthProblems: null,
    profilePhoto: null
  });
  const [error, setError] = useState({
    name: null,
    type: null,
    breed: null,
    gender: null,
    birthdate: null,
    description: null,
    healthProblems: null,
    profilePhoto: null
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleNameChange = name => {
    setFormData({ ...formData, name });
  };

  const handleBreedChange = breed => {
    setFormData({ ...formData, breed });
  };

  const handleGenderChange = gender => {
    setFormData({ ...formData, gender });
  };

  const handleBirthdateChange = newDate => {
    setFormData({ ...formData, birthdate: newDate });
  };

  const handleTypeChange = type => {
    setFormData({ ...formData, type });
  };

  const handleDescriptionChange = description => {
    setFormData({ ...formData, description });
  };

  const showDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: formData.birthdate || moment()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const birthdate = moment()
          .year(year)
          .month(month)
          .date(day);
        setFormData({ ...formData, birthdate: birthdate.toDate() });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker.', code, message);
    }
  };

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const handleProfilePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      setFormData({ ...formData, profilePhoto: result.uri });
    }
  };

  const handlePetCreate = () => {
    console.log(formData);
  };

  const BREEDS = formData.type === 'DOG' ? DOG_BREEDS : CAT_BREEDS;
  return (
    <ScrollView>
      <KeyboardAvoidingView behaviour="padding" style={styles.container}>
        <View>
          <Text style={styles.headerText}>{t('addAPetForm.addAPet')}</Text>
          <Text>{t('addAPetForm.addAPetDescription')}</Text>
        </View>

        <View style={styles.formItem}>
          <Text style={styles.formLabel}>{t('addAPetForm.name')}</Text>
          <TextInput
            maxLength={64}
            value={formData.name}
            onChangeText={name => handleNameChange(name)}
            placeholder={t('addAPetForm.namePlaceholder')}
            style={styles.textInput}
            underlineColorAndroid="transparent"
          />
          {error.name && <Text style={styles.error}>{error.name}</Text>}
        </View>

        <View style={styles.formItem}>
          <Text style={styles.formLabel}>{t('addAPetForm.type')}</Text>
          <Picker
            selectedValue={formData.type}
            style={styles.pickerInput}
            onValueChange={type => handleTypeChange(type)}
          >
            <Picker.Item key="DOG" label="Dog" value={t('addAPetForm.dog')} />
            <Picker.Item key="CAT" label="Cat" value={t('addAPetForm.cat')} />
          </Picker>
          {error.type && <Text style={styles.error}>{error.type}</Text>}
        </View>

        <View style={styles.formItem}>
          <Text style={styles.formLabel}>{t('addAPetForm.breed')}</Text>
          <Picker
            selectedValue={formData.breed}
            style={styles.pickerInput}
            onValueChange={breed => handleBreedChange(breed)}
          >
            {_.map(BREEDS, BREED => (
              <Picker.Item key={BREED.id} label={BREED.breed} value={BREED.breed} />
            ))}
          </Picker>
          {error.breed && <Text style={styles.error}>{error.breed}</Text>}
        </View>

        <View style={styles.formItem}>
          <Text style={styles.formLabel}>{t('addAPetForm.gender')}</Text>
          <Picker
            selectedValue={formData.gender}
            style={styles.pickerInput}
            onValueChange={gender => handleGenderChange(gender)}
          >
            <Picker.Item key="MALE" label="Male" value={t('addAPetForm.male')} />
            <Picker.Item key="FEMALE" label="Female" value={t('addAPetForm.female')} />
          </Picker>
          {error.gender && <Text style={styles.error}>{error.gender}</Text>}
        </View>

        {/*
        <View style={styles.formItem}>
          <Text style={styles.formLabel}>{t('addAPetForm.birthdate')}</Text>
          {Platform.OS === 'ios' ? (
            <DatePickerIOS
              date={formDate.birthdate || moment().toDate()}
              onDateChange={handleBirthdateChange}
              style={styles.pickerInput}
              maximumDate={moment().toDate()}
              mode="date"
            />
          ) : (
            <Button
              onPress={showDatePicker}
              title={t('addAPetForm.select')}
              type="clear"
              icon={<Icon name="calendar" type="feather" />}
              containerStyle={styles.pickerInput}
              buttonStyle={styles.pickerButton}
              titleStyle={styles.pickerText}
            />
          )}
          {error.birthdate && <Text style={styles.error}>{error.birthdate}</Text>}
        </View>
        */}

        <View style={styles.formItem}>
          <Text style={styles.formLabel}>{t('addAPetForm.description')}</Text>
          <TextInput
            maxLength={300}
            multiline
            numberOfLines={1}
            placeholder={t('addAPetForm.descriptionPlaceholder')}
            style={styles.textInput}
            underlineColorAndroid="transparent"
            onChangeText={description => handleDescriptionChange(description)}
            value={formData.description}
            scrollEnabled
          />
          {error.description && <Text style={styles.error}>{error.description}</Text>}
        </View>

        <View style={styles.formItem}>
          <Text style={styles.formLabel}>{t('addAPetForm.healthProblems')}</Text>
          <TextInput
            maxLength={300}
            multiline
            numberOfLines={1}
            placeholder={t('addAPetForm.healthProblemsPlaceholder')}
            style={styles.textInput}
            underlineColorAndroid="transparent"
            onChangeText={healthProblems => handleHealthProblems(healthProblems)}
            value={formData.healthProblems}
            scrollEnabled
          />
          {error.healthProblems && <Text style={styles.error}>{error.healthProblems}</Text>}
        </View>

        <View style={styles.formItem}>
          <Text style={styles.formLabel}>{t('addAPetForm.profilePhoto')}</Text>
          <View style={styles.formItemImage}>
            {formData.profilePhoto && <Image source={{ uri: formData.profilePhoto }} style={styles.profilePhoto} />}
            <Button
              icon={{
                name: 'plus',
                type: 'feather',
                size: 30
              }}
              onPress={handleProfilePhoto}
              buttonStyle={styles.profilePhotoButton}
              titleStyle={styles.profilePhotoButtonText}
              containerStyle={styles.profilePhotoButtonContainer}
            />
          </View>
          {error.profilePhoto && <Text style={styles.error}>{error.profilePhoto}</Text>}
        </View>

        <View style={styles.formItem}>
          <Button
            title={t('addAPetForm.addAPet')}
            loading={loading}
            buttonStyle={styles.submitButton}
            titleStyle={styles.submitButtonText}
            containerStyle={styles.submitButtonContainer}
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  },
  headerText: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 5
  },
  error: {
    color: 'red'
  },
  formItem: {
    marginVertical: 15,
    flexDirection: 'column'
  },
  formItemImage: {
    marginVertical: 15,
    flexDirection: 'row'
  },
  formLabel: {
    color: COLORS.PRIMARY,
    fontWeight: '600'
  },
  pickerText: {
    marginLeft: 5,
    fontSize: 14,
    color: COLORS.TEXT
  },
  submitButton: {
    flex: 1,
    height: 50,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY
  },
  submitButtonText: {
    color: COLORS.WHITE,
    textAlign: 'center'
  },
  submitButtonContainer: {
    flex: 1,
    alignSelf: 'center'
  },
  profilePhotoButton: {
    height: 75,
    width: 75,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    borderStyle: 'dashed',
    backgroundColor: 'transparent'
  },
  profilePhoto: {
    width: 75,
    height: 75,
    marginRight: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent'
  }
});

export default withTranslation()(CreatePet);
