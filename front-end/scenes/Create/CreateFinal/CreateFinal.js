import React, { useState, useEffect } from 'react';
import { 
  Platform, 
  Text, 
  View, 
  ScrollView, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  AsyncStorage,
  Dimensions,
  ImageBackground
} from 'react-native';
import _ from 'lodash';
import { CheckBox, Icon, Image } from 'react-native-elements';
import { withTranslation } from 'react-i18next';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import MainButton from '../../../components/common/MainButton';
import { ANIMAL_TYPES, USER_TOKEN } from '../../../constants';
import { SHADOW, FILE_PREFIX, REST_UPLOAD_ENDPOINT } from '../../../constants';
import { DESCRIPTION_MAX_LENGTH } from '../../../constants/form';
import ProgressiveImage from '../../../components/common/ProgressiveImage';
import dogBoneBg from '../../../assets/dog-bone-bg.png';
import catPawBg from '../../../assets/cat-paw-bg.png';
import catBg from '../../../assets/cat-bg.png';
import dogBg from '../../../assets/dog-bg.png';
import catBgThumb from '../../../assets/cat-bg-thumb.png';
import dogBgThumb from '../../../assets/dog-bg-thumb.png';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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
    const type = Platform.OS === 'android' ? `${image.type}/${imageType}` : image.type;
    data.append("photo", {
      name: FILE_PREFIX.PET_PROFILE,
      type,
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
      const petData = {
        age: age.value,
        breed: breed.value,
        characteristics: _.map(characteristics, 'value'),
        description,
        name,
        gender: sex.value,
        type: type.value,
      };
      const fileType = _.last(_.split(photo.mimetype, '/'));
      const filename = `${photo.filename}.${fileType}`;

      const savedPet = await savePet(petData, filename);
      setIsLoading(false);
    } else {
      Alert.alert(t('photoUploadError'));
    }
  };

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
      <TouchableOpacity onPress={openImageUploader} activeOpacity={0.8} style={styles.imageContainer}>
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
              color="#fff"
            />
            <Text style={styles.imageIconText}>
              {t('addPhoto')}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderApprove = () => (
    <CheckBox
      title={t('approveAgreement')}
      checked={isApproved}
      iconType="feather"
      checkedIcon="check-circle"
      uncheckedIcon="circle"
      checkedColor="#FFF"
      uncheckedColor="#FFF"
      onPress={() => setIsApproved(!isApproved)}
      containerStyle={styles.approveContainer}
      textStyle={styles.approveText}
      activeOpacity={1}
    />
  );

  const renderDescription = () => (
    <View>
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

  const renderActions = (
    <View style={styles.actionContainer}>
      <Icon name="chevron-left" type="feather" size={24} color="#FFF" onPress={() => navigation.goBack()} />
    </View>
  )

  const isDog = () => formData.type.value === ANIMAL_TYPES.DOG.value;
  const MAIN_COLOR = isDog() ? '#29CCBC' : '#CCE389';
  const isDisabled = _.isEmpty(_.unescape(_.trim(formData.description))) || !isApproved || isLoading;
  const descriptionLength = formData.description ? _.unescape(formData.description).length : 0;

  return (
    <ImageBackground 
      source={formData.type.value === ANIMAL_TYPES.DOG.value ? dogBoneBg : catPawBg} 
      style={styles.bgImage}
    >
      {renderActions}
      <View style={styles.container}>
        <ScrollView style={styles.innerContainer}>
          <View style={styles.imageSection}>
            {renderImage()}
            <View style={styles.imageDesc}>
              <Text style={styles.imageText}>
                Evcil hayvanınızın bir fotoğrafını yükleyin.
              </Text>
            </View>

          </View>
          <View style={styles.descSection}>
            {renderDescription()}
          </View>
          <View>
            {renderApprove()}
          </View>
          <MainButton textStyle={{ color: isDisabled ? '#C9C9C9' : MAIN_COLOR }} disabled={isDisabled} onPress={handleSubmit} text={t('add')} loading={isLoading} />
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
  petImage: {
    position: 'absolute',
    bottom: 50,
    right: 30,
    width: (screenWidth / 2) - 40,
    height: (screenWidth / 2) - 40
  },
  actionContainer: {
    flexDirection: 'row',
    width: screenWidth - 80,
    justifyContent: 'flex-start',
    marginTop: 40
  },
  lengthText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '400',
    alignSelf: 'flex-end',
    marginBottom: 20
  },
  approveContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: 'transparent',
    marginHorizontal: 0,
    paddingHorizontal: 0
  },
  approveText: {
    fontWeight: '400',
    color: "#fff",
    fontSize: 13
  },
  imageSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  imageDesc: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: "center",
    alignItems: 'center',
    alignContent: 'center',
    marginLeft: 15
  },
  imageText: {
    color: '#FFF',
    textAlign: 'center'
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
    borderColor: "#fff",
    borderStyle: 'dashed',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageIconText: {
    color: "#fff",
  },
  formInputField: {
    flex: 1,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 5,
    padding: 10,
    ...SHADOW
  }
});

export default withTranslation()(CreateFinal);
