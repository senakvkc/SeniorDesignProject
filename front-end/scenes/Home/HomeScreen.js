import React, { useState, useEffect } from 'react';
import { AppLoading } from 'expo';
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import { Icon } from 'react-native-elements';
import _ from 'lodash';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { STORIES, ANIMALS, NO_SHADOW } from '../../constants';
import StoryPanel from '../../components/StoryPanel';
import { COLORS } from '../../constants/theme';
import SearchBox from '../../components/SearchBox';
import PetCard from '../../components/PetCard';
import CameraTrigger from '../../components/CameraTrigger';
import SettingsTrigger from '../../components/SettingsTrigger';


const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [searchValue, setSearchValue] = useState('');

  async function loadFonts() {
    await Font.loadAsync({
      Quicksand_light: require('../../assets/fonts/Quicksand-Light.ttf'),
      Quicksand: require('../../assets/fonts/Quicksand-Regular.ttf'),
      Quicksand_medium: require('../../assets/fonts/Quicksand-Medium.ttf'),
      Quicksand_bold: require('../../assets/fonts/Quicksand-SemiBold.ttf'),
      ...Ionicons.font
    });
  }

  useEffect(() => {
    loadFonts().then(() => {
      setIsLoading(false);
    });
  }, []);

  const handleSearch = value => {
    console.log(value);
    setSearchValue(value);
  };

  const renderIcon = icon => ({ isActive }) => (
    <Icon
      style={{
        fontSize: icon === 'add' ? 40 : 24,
        color: icon === 'add' ? '#d6402c' : '#504746'
      }}
      name={icon}
    />
  );

  return isLoading ? (
    <AppLoading />
  ) : (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <StoryPanel stories={STORIES} />
        <View style={styles.feedContainer}>
          <SearchBox filterIcon value={searchValue} onSearch={handleSearch} />
          {_.map(ANIMALS, pet => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

HomeScreen.navigationOptions = ({ navigation }) => ({
  title: 'shelty',
  headerTitleStyle: {
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#FE9595',
    fontFamily: 'Rancho',
    textTransform: 'lowercase',
    fontSize: 32
  },
  headerStyle: {
    backgroundColor: '#FFF',
    ...NO_SHADOW
  },
  headerLeft: <CameraTrigger navigation={navigation} />,
  headerRight: <SettingsTrigger navigation={navigation} />
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  feedContainer: {
    flex: 1,
    flexGrow: 1,
    minHeight: 100,
    alignSelf: 'stretch',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.WHITE_FB,
    padding: 20,
    alignItems: 'center',
    elevation: 2
  }
});

export default HomeScreen;
