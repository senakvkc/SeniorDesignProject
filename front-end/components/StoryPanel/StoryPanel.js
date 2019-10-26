import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import Story from '../Story';

const StoryPanel = ({ stories }) => {
  return (
    <View style={styles.storyContainer}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={stories}
        renderItem={({ item }) => <Story story={item} />}
        keyExtractor={item => item.text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  storyContainer: {
    height: 90
  }
});

export default StoryPanel;
