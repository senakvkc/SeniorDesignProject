import React, { useState } from 'react';
import { StyleSheet, Dimensions, TextInput, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import LongText from '../../components/LongText';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const NewPostScreen = props => {
  const [content, setContent] = useState(null);

  const handleContentChange = text => {
    console.log(text);
    setContent(text);
  };

  return <LongText onChange={handleContentChange} content={content} />;
};

const styles = StyleSheet.create({});

export default NewPostScreen;
