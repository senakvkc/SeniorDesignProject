import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { Image } from 'react-native-elements';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const TakenPhoto = ({ navigation }) => {
  const [imageData, setImageData] = useState({
    photo: navigation.getParam('photo'),
    message: {
      fontFace: null,
      fontSize: 16,
      text: null,
      position: {
        top: screenHeight / 2,
        left: screenWidth / 2,
        color: '#fff'
      }
    }
  });

  console.log('imageData: ', imageData);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageData.photo.uri }}
          style={{ width: screenWidth, height: screenHeight }}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1
  }
});
export default TakenPhoto;
