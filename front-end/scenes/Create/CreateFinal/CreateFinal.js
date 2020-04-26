import React, { useState, useEffect } from 'react';
import { 
  Platform, 
  Text, 
  View, 
  ScrollView, 
  KeyboardAvoidingView, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  AsyncStorage
} from 'react-native';
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
import { USER_TOKEN } from '../../../constants';
import { AGE_INTERVALS, FILE_PREFIX, LAN_ADDRESS, REST_UPLOAD_ENDPOINT } from '../../../constants';
import { DESCRIPTION_MAX_LENGTH } from '../../../constants/form';
import { AXIOS_API } from '../../../axios';


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
  const [userData, setUserData] = useState(null);

  const getCurrentUser = async () => {
    const userToken = await AsyncStorage.getItem(USER_TOKEN);
    setUserData(JSON.parse(userToken));
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const createPhotoData = () => {
    let data = new FormData();
    const { image } = formData;
    const uri = Platform.OS === 'android' ? image.uri : image.uri.replace("file://", "");
    const imageType = _.last(_.split(uri, '.'));
    data.append("photo", {
      name: FILE_PREFIX.PET_PROFILE,
      type: `${image.type}/${imageType}`,
      uri
    });

    return data;
  };

  const uploadPhoto = async () => {
    const photoData = createPhotoData();
    const uploadRes = await fetch(`${REST_UPLOAD_ENDPOINT}/pet-profile`, {
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'multipart/form-data',
      },
      body: photoData
    });

    const uploadJson = await uploadRes.json();
    if (uploadJson && uploadJson.success) {
      return uploadJson.file;
    }
    
    return null;
  };

  const savePet = async (petData, image) => {
    const createPetInput = { ...petData, image };
    const savedPet = await createPet({
      variables: {
        createPetInput
      }
    });

    if (savedPet) {
      return savedPet.data;
    }

    const jsonError = JSON.parse(JSON.stringify(err));
    Alert.alert(t('defaultError'), _.replace(jsonError.message, 'GraphQL error: ', ''), [
      {
        text: t('ok'),
        onPress: () => {},
      },
    ]);
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    // upload photo, then take photo name and save pet
    setIsLoading(true);
    const photo = await uploadPhoto();
    // if response success, then 
    if (photo) {
      // now send request to create a pet.
      const { age, breed, characteristics, description, name, sex, type } = formData;
      console.log(userData.user);
      const petData = {
        age: age.value,
        breed: breed.value,
        characteristics: _.map(characteristics, 'value'),
        description,
        name,
        gender: sex.value,
        type: type.value,
        phone: userData.user.phone
      };
      const fileType = _.last(_.split(photo.mimetype, '/'));
      const filename = `${photo.filename}.${fileType}`;

      const savedPet = await savePet(petData, filename);
      setIsLoading(false);
    } else {
      Alert.alert(t('photoUploadError'));
    }
  };

  const descriptionLength = formData.description ? _.unescape(formData.description).length : 0;

  const renderDescription = () => (
    <View style={styles.fieldContainer}>
      <TextInput
        style={styles.formInputField}
        onChangeText={text => setFormData({...formData, description: text})}
        value={formData.description}
        underlineColorAndroid="transparent"
        maxLength={DESCRIPTION_MAX_LENGTH}
        multiline
        numberOfLines={5}
        placeholder={t('writeSomething')}
        textAlignVertical="top"
        scrollEnabled={true}
      />
      <Text style={styles.lengthText}>{`${descriptionLength}/${DESCRIPTION_MAX_LENGTH}`}</Text>
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
      onPress={() => setIsApproved(!isApproved)}
      containerStyle={styles.approveContainer}
      textStyle={styles.approveText}
      activeOpacity={1}
    />
  );

  const getPermissionsAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        Alert.alert(t('cameraPermissionRequired'));
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

    if (!imageData.cancelled) {
      setFormData({ ...formData, image: imageData });
    };
  }

  const renderImage = () => {
    const { image } = formData;

    return (
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={openImageUploader} activeOpacity={0.8}>
          {image ? (
            <Image 
              source={{uri: image.uri}}
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

  const isDisabled = _.isEmpty(_.unescape(_.trim(formData.description))) || !isApproved || isLoading;

  const renderFinalButton = () => (
    <View style={styles.stepActionContainer}>
      <BasicSheltyButton
        disabled={isDisabled}
        onPress={handleSubmit}
        text={t('add')}
        containerStyle={styles.stepButton}
      />
    </View>
  );

  return (
    <View style={styles.container}>
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
