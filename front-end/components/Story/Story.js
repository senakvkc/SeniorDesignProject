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
      <View>
        <Image source={{ uri: story.image }} style={styles.storyImage} />
        <Text style={styles.storyText}>{story.text}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  storyImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderColor: '#f56565',
    borderWidth: 1,
    overflow: 'hidden',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 0
  },
  storyText: {
    fontSize: 10,
    textAlign: 'center'
  }
});

export default Story;
