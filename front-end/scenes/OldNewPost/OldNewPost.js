import React, { useState } from 'react';
import { StyleSheet, Dimensions, TextInput, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import LongText from '../../components/LongText';
import { getInitialObject } from 'react-native-cn-richtext-editor';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const OldNewPost = props => {
  const [content, setContent] = useState(getInitialObject());
  const [selectedTag, setSelectedTag] = useState('body');
  const [selectedStyles, setSelectedStyles] = useState([]);

  const handleContentChange = content => {
    console.log(content);
    setContent(content);
  };

  const handleSelectedTagChanged = tag => {
    console.log(tag);
    setSelectedTag(tag);
  };

  const handleSelectedStyleChanged = styles => {
    console.log(styles);
    setSelectedStyles(styles);
  };

  return (
    <LongText
      onChange={handleContentChange}
      content={content}
      onSelectedStyleChanged={handleSelectedStyleChanged}
      onSelectedTagChanged={handleSelectedTagChanged}
      selectedTag={selectedTag}
      selectedStyles={selectedStyles}
    />
  );
};

const styles = StyleSheet.create({});

export default OldNewPost;
