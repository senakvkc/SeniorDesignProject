import React from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import { Button, Icon, Image } from 'react-native-elements';
import { SIZES, COLORS } from '../../constants/theme';
import { withTranslation } from 'react-i18next';
import { ANIMAL_TYPES } from '../../constants';
import CatBg from '../../assets/cat.svg';
import DogBg from '../../assets/dog.svg';
import { SvgUri } from 'react-native-svg';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CreateScreen = ({ t, navigation }) => {
  handleNewPetClick = type => {
    navigation.navigate('CreatePet', {
      type: type.key
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.section, styles.dog]}>
        <DogBg
        />
      </View>
      <View style={[styles.section, styles.cat]}>
        <CatBg
        />
        
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
    alignItems: 'center'
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  dog: {
    backgroundColor: '#FFF5F4',
  },
  cat: {
    backgroundColor: '#F0FFF5'
  }
});

export default withTranslation()(CreateScreen);
