import React from 'react';
import {
  TouchableHighlight,
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';

const Story = ({ story }) => {
  const showStory = () => {
    console.log('show Story');
  };

  return (
    <TouchableHighlight onPress={showStory} underlayColor="#ffffff">
      <View style={styles.storyContainer}>
        <Image source={{ uri: story.image }} style={styles.storyImage} />
        <Text style={styles.storyText}>{story.text}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  storyContainer: {
    width: 52,
    height: 52,
    borderRadius: 52,
    borderColor: '#f56565',
    borderWidth: 1,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 0
  },
  storyImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    marginLeft: 1,
    marginTop: 1,
    overflow: 'hidden'
  },
  storyText: {
    fontSize: 10,
    textAlign: 'center'
  }
});

export default Story;
