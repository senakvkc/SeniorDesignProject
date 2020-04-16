import React, { useState } from 'react';
import { ScrollView, StyleSheet, Dimensions, FlatList, ActivityIndicator, View } from 'react-native';
import { AppLoading } from 'expo';
import _ from 'lodash';
import { POSTS } from '../../constants';
import { COLORS } from '../../constants/theme';
import { CAROUSEL_ITEMS } from '../../constants';
import SinglePost from '../../components/SinglePost/SinglePost';
import SheltyCarousel from '../../components/SheltyCarousel';
import SearchBox from '../../components/SearchBox';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const BlogScreen = ({ posts }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = value => {
    console.log(value);
    setSearchValue(value);
  };

  return !POSTS ? (
    <AppLoading />
  ) : (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.feedContainer}>
          <SearchBox filterIcon value={searchValue} onSearch={handleSearch} />
          {_.map(POSTS, post => (
            <SinglePost key={post.id} post={post} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

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

export default BlogScreen;
