import React from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import { Button, Icon, Image } from 'react-native-elements';
import { SIZES, COLORS } from '../../constants/theme';
import { withTranslation } from 'react-i18next';
import SheltyButton from '../../components/common/SheltyButton';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CreateScreen = ({ t, navigation }) => {
  handleNewPetClick = () => {
    console.log('clicked new pet!');
    navigation.navigate('CreatePet');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: 'https://placedog.net/500/500' }} style={styles.image} />
      </View>
      <View style={styles.actionContainer}>
        <View style={styles.actionItemContainer}>
          <SheltyButton
            buttonStyles={styles.actionButton}
            onPressFunction={handleNewPetClick}
            gradientStyles={styles.actionButtonContainer}
            textStyles={styles.actionButtonText}
            subText="Test subtext"
            subTextStyle={styles.actionSubText}
            text={t('createPet')}
          />
        </View>
        <View style={styles.actionItemContainer}>
          <SheltyButton
            buttonStyles={styles.actionButton}
            onPressFunction={handleNewPetClick}
            gradientStyles={styles.actionButtonContainer}
            textStyles={styles.actionButtonText}
            subText="Test subtext"
            subTextStyle={styles.actionSubText}
            text={t('createPet')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.WHITE_LIGHT,
    padding: 50,
    alignItems: 'center'
  },
  imageContainer: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 20,
    overflow: 'hidden'
  },
  image: {
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
    height: '100%'
  },
  actionContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  actionItemContainer: {
    flex: 1,
    marginVertical: 20
  },
  actionButtonContainer: {
    width: screenWidth - 100,
    borderRadius: 20,
    height: 100,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  actionButton: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: COLORS.PURPLE,
    borderRadius: 20
  },
  actionButtonText: {
    fontSize: SIZES.HUGE,
    color: COLORS.WHITE_F9,
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: '600'
  },
  actionSubText: {
    fontSize: SIZES.NORMAL_TEXT,
    color: COLORS.WHITE_FB,
    fontWeight: '400',
    textAlign: 'center',
    alignSelf: 'center'
  }
});

export default withTranslation()(CreateScreen);
