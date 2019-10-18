import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { withTranslation } from 'react-i18next';
import { Icon } from 'react-native-elements';

class SheltyCamera extends React.Component {
  camera = null;

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  flipCamera = () => {
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  }

  takePhoto = () => {
    console.log("photo taken!")
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  openGallery = () => {
    console.log("opening gallery.")
  }
 
  render() {
    const { hasCameraPermission } = this.state;
    const { t } = this.props;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>{t('noAccessToCamera')}</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={camera => (this.camera = camera)}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}
            >
              <View style={styles.topContainer}>
                <View style={styles.backButton}>
                  <TouchableOpacity onPress={this.goBack}>
                    <Icon name="chevron-left" type="feather" size={30} color="#fff" />
                  </TouchableOpacity>
                </View>
                <View style={styles.flashButton}>
                  <TouchableOpacity onPress={this.changeFlashState}>
                    <Icon name="zap" type="feather" size={30} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.bottomContainer}>
                <View style={styles.takePhotoButton}>
                  <TouchableOpacity onPress={this.openGallery}>
                    <Icon name="image" type="feather" size={30} color="#fff" />
                  </TouchableOpacity>
                </View>
                <View style={styles.takePhotoButton}>
                  <TouchableOpacity onPress={this.takePhoto}>
                    <Icon name="circle" type="feather" size={80} color="#fff" />
                  </TouchableOpacity>
                </View>
                <View style={styles.cameraButton}>
                  <TouchableOpacity
                    onPress={this.flipCamera}
                  >
                    <Icon name="camera" type="feather" size={30} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
              
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  topContainer: {
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    padding: 15
  },
  backButton: {
  },
  bottomContainer: {
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15
  },
  cameraButton: {
  },
  takePhotoButton: {
  }
});

export default withTranslation()(SheltyCamera);
