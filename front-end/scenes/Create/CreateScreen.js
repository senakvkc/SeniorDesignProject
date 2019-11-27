import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Button, Icon, Image } from 'react-native-elements';
import { SIZES, COLORS } from '../../constants/theme';
import { withTranslation } from 'react-i18next';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CreateScreen = ({ navigation }) => {
  handleNewPetClick = () => {
    console.log('clicked new pet!');
    navigation.navigate('CreatePet');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://picsum.photos/id/808/400/200' }}
          containerStyle={styles.image}
        />
      </View>
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.item} onPress={handleNewPetClick}>
          <View style={styles.itemIcon}>
            <Icon
              name="plus"
              color={COLORS.WHITE_LIGHT}
              type="feather"
              size={SIZES.HUGE}
            />
          </View>
          <View style={styles.itemButton}>
            <Text style={styles.itemHeader}>Add a pet</Text>
            <Text style={styles.itemDesc}>
              You can add your pet to your profile. It will be on your profile
              once it is approved.
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={handleNewPetClick}>
          <View style={styles.itemIcon}>
            <Icon
              name="plus"
              color={COLORS.WHITE_LIGHT}
              type="feather"
              size={SIZES.HUGE}
            />
          </View>
          <View style={styles.itemButton}>
            <Text style={styles.itemHeader}>Add a shelter</Text>
            <Text style={styles.itemDesc}>
              You can add a shelter if you are managing one. Some legal papers
              are required in order to create a new shelter.
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.WHITE_LIGHT
  },
  imageContainer: {
    flex: 3,
    marginVertical: 30
  },
  image: {
    width: 300,
    height: 200,
    alignSelf: 'center',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    overflow: 'hidden'
  },
  itemContainer: {
    flex: 5,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center'
  },
  item: {
    flexDirection: 'row',
    height: 120,
    width: screenWidth - 60,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'transparent',
    marginVertical: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 5
  },
  itemIcon: {
    flex: 1
  },
  itemButton: {
    flex: 4,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  itemHeader: {
    fontSize: SIZES.HUGE,
    color: COLORS.WHITE_LIGHT,
    textAlign: 'left',
    fontWeight: '600',
    paddingRight: 15
  },
  itemDesc: {
    fontSize: SIZES.NORMAL_TEXT,
    color: COLORS.WHITE_LIGHT,
    textAlign: 'left',
    paddingRight: 15
  }
});

export default withTranslation()(CreateScreen);
