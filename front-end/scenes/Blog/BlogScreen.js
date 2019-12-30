import React from 'react';
import { ScrollView, StyleSheet, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { AppLoading } from 'expo';
import { POSTS } from '../../constants';
import { COLORS } from '../../constants/theme';
import { CAROUSEL_ITEMS } from '../../constants';
import SinglePost from '../../components/SinglePost/SinglePost';
import SheltyCarousel from '../../components/SheltyCarousel';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const BlogScreen = ({ posts }) => {
  return !POSTS ? (
    <AppLoading />
  ) : (
    <ScrollView style={styles.container}>
      <SheltyCarousel data={CAROUSEL_ITEMS} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={POSTS}
        renderItem={({ item }) => <SinglePost item={item} key={item.id} />}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE_SOFTER,
    padding: 10
  }
});

export default BlogScreen;
