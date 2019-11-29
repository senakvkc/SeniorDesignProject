import React from 'react';
import { ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { Image, Icon, Button } from 'react-native-elements';
import { AppLoading } from 'expo';

import { SHELTERS } from '../../constants';
import { COLORS } from '../../constants/theme';
import SingleShelter from '../../components/SingleShelter';

const SheltersScreen = ({ posts }) => {
  return !SHELTERS ? (
    <AppLoading />
  ) : (
    <ScrollView>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={SHELTERS}
        renderItem={({ item }) => <SingleShelter item={item} key={item.id} />}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
};

export default SheltersScreen;
