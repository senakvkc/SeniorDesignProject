import React, { useState, useRef } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import _ from 'lodash';
import { CheckBox, Icon, Image } from 'react-native-elements';
import { withTranslation } from 'react-i18next';
import DropdownAlert from 'react-native-dropdownalert';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import CreateSteps from '../../../components/CreateSteps';
import BasicSheltyButton from '../../../components/common/BasicSheltyButton';
import { COLORS } from '../../../constants/theme';
import { AGE_INTERVALS } from '../../../constants';


const CREATE_PET_MUTATION = gql`
  mutation createPet($createPetInput: CreatePetInput) {
    createPet(createPetInput: $createPetInput) {
      _id
      name
      code
      breed
      ageInterval
      gender
      animalType
      description
    }
  }
`;

const CreateFinal = ({ t, navigation }) => {

  const { data: prevData } = navigation.state.params;
  const [formData, setFormData] = useState({
    ...prevData,
    image: prevData.image || null,
    description: prevData.description || null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [createPet, { data }] = useMutation(CREATE_PET_MUTATION);

  const handleDescriptionChange = text => {
    setFormData({ ...formData, description: text });
  };

  const handleIsApproved = () => setIsApproved(!isApproved);

  const handleSubmit = async () => {
    // now, send request to backend.
    setIsLoading(true);
    const { type, name, age, breed, characteristics, description, gender, image } = formData;
    const createPetInput = { type, name, age, breed, characteristics, description, gender, image };

    await createPet({
      variables: { createPetInput }
    })
      .then(async res => {
        setIsLoading(false);
        console.log('res', res);
        console.log('cpi', createPetInput);
        navigation.navigate('Home');
      })
      .catch(err => {
        const jsonError = JSON.parse(JSON.stringify(err));
        console.log(jsonError);
        setIsLoading(false);
        return;
      });
  };

  const descriptionLength = formData.description ? _.unescape(formData.description).length : 0;

  const maxLength = 250;

  const renderDescription = () => (
    <View style={styles.fieldContainer}>
      <TextInput
        style={styles.formInputField}
        onChangeText={text => handleDescriptionChange(text)}
        value={formData.description}
        underlineColorAndroid="transparent"
        maxLength={maxLength}
        multiline
        numberOfLines={5}
        placeholder={t('writeSomething')}
        textAlignVertical="top"
        scrollEnabled={true}
      />
      <Text style={styles.lengthText}>{`${descriptionLength}/${maxLength}`}</Text>
    </View>
  );

  const renderApprove = () => (
    <CheckBox
      title={t('approveAgreement')}
      checked={isApproved}
      iconType="feather"
      checkedIcon="check-circle"
      uncheckedIcon="circle"
      checkedColor={COLORS.PIGMENT}
      uncheckedColor={COLORS.PIGMENT}
      onPress={handleIsApproved}
      containerStyle={styles.approveContainer}
      textStyle={styles.approveText}
      activeOpacity={1}
    />
  );

  const getPermissionsAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        Alert.alert("Kamera yetkisi gerekiyor.");
      }
    }
  };

  const openImageUploader = async () => {
    await getPermissionsAsync();
    let imageData = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.9
    });

    console.log(imageData);

    if (!imageData.cancelled) {
      setFormData({ ...formData, image: imageData.uri });
    };
  }

  const renderImage = () => {
    console.log(formData.image);

    return (
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={openImageUploader} activeOpacity={0.8}>
          {formData.image ? (
            <Image 
              source={{uri: formData.image}}
              containerStyle={styles.image}
            />
          ) : (
            <View style={styles.imageIconContainer}>
              <Icon 
              type="feather"
              name="plus"
              size={32}
              color={COLORS.WHITE_D9}
            />
              <Text style={styles.imageIconText}>
                {t('addPhoto')}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  const renderForm = () => (
    <>
      <View style={styles.imageDescription}>
        {renderImage()}
        {renderDescription()}
      </View>
      {renderApprove()}
    </>
  );

  const isNextDisabled = _.isEmpty(_.unescape(_.trim(formData.description))) || !isApproved || isLoading;

  const renderFinalButton = () => (
    <View style={styles.stepActionContainer}>
      <BasicSheltyButton
        disabled={isNextDisabled}
        onPress={handleSubmit}
        text={t('add')}
        containerStyle={styles.stepButton}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <CreateSteps step={2} />
      <ScrollView>
        <KeyboardAvoidingView behaviour="padding" style={styles.formContainer}>
          {renderForm()}
          {renderFinalButton()}
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
  fieldContainer: {
    flex: 1,
    height: 100,
    marginLeft: 15
  },
  formInputField: {
    borderWidth: 1,
    borderColor: COLORS.WHITE_D9,
    borderRadius: 5,
    paddingLeft: 15,
    paddingTop: 25,
    color: COLORS.BLACK_25,
    height: 100
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
  lengthText: {
    fontSize: 12,
    color: COLORS.WHITE_D9,
    fontWeight: '400',
    alignSelf: 'flex-end',
    marginVertical: 5
  },
  approveContainer: {
    backgroundColor: 'transparent',
    marginTop: 15,
    borderWidth: 0,
    borderColor: 'transparent',
    marginHorizontal: 0,
    paddingHorizontal: 0
  },
  approveText: {
    fontWeight: '400',
    color: COLORS.PIGMENT,
    fontSize: 13
  },
  imageDescription: {
    flex: 1,
    flexDirection: 'row',
    height: 100
  },
  imageContainer: {
    width: 100,
    height: 100
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'transparent'
  },
  imageIconContainer: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: COLORS.WHITE_D9,
    borderStyle: 'dashed',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageIconText: {
    color: COLORS.WHITE_D9,
  }
});

export default withTranslation()(CreateFinal);
