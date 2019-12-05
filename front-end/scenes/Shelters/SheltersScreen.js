import React from 'react';
import {
  ScrollView,
  FlatList,
  ActivityIndicator,
  View,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Image, Icon, Button } from 'react-native-elements';
import { AppLoading } from 'expo';

import { SHELTERS } from '../../constants';
import { COLORS, SIZES } from '../../constants/theme';
import SingleShelter from '../../components/SingleShelter';
import { withTranslation } from 'react-i18next';
import GradientButton from 'react-native-gradient-buttons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SheltersScreen = ({ posts, t }) => {
  const findNearestShelter = () => {
    console.log('find nearest shelter');
  };

  return !SHELTERS ? (
    <AppLoading />
  ) : (
    <View style={styles.container}>
      <ScrollView style={styles.shelterContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={SHELTERS}
          renderItem={({ item }) => <SingleShelter item={item} key={item.id} />}
          keyExtractor={item => item.id}
        />
      </ScrollView>
      <View style={styles.findShelterButton}>
        <GradientButton
          text={t('findNearestShelter')}
          textStyle={styles.findShelterTitle}
          gradientBegin="#A30000"
          gradientEnd="#DB5757"
          height={50}
          width={250}
          radius={15}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  findShelterTitle: {
    fontSize: SIZES.NORMAL_TEXT
  },
  findShelterButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10
  }
});
export default withTranslation()(SheltersScreen);
