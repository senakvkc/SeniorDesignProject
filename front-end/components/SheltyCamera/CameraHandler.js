import { RNCamera } from 'react-native-camera';
import FileStorage from '../../helpers/storage/FileStorage';

class CameraHandler {
  constructor(cameraComponent) {
    this.storage = new FileStorage();
    // This is the camera component
    this.camera = cameraComponent;
    this.permissionsOptions = {
      title: 'Permission to use camera',
      message: 'We need your permission to use your camera',
      buttonPositive: 'Ok',
      buttonNegative: 'Cancel'
    };
    //Camera Options
    this.options = {
      quality: 0.35,
      base64: true,
      width: 1280,
      mirrorImage: false,
      //(can take up to 5 seconds on some devices)
      fixOrientation: false,
      //"portrait", "portraitUpsideDown", "landscapeLeft" or "landscapeRight"
      orientation: 'portrait',
      doNotSave: false
    };
    this.optionsRecording = {
      /*
            *quality. This option specifies the quality of the video to be taken. The possible values are:
                    RNCamera.Constants.VideoQuality.2160p.
                    ios Specifies capture settings suitable for 2160p (also called UHD or 4K) quality (3840x2160 pixel) video output.
                    android Quality level corresponding to the 2160p (3840x2160) resolution. (Android Lollipop and above only!).
                    RNCamera.Constants.VideoQuality.1080p.
                    ios Specifies capture settings suitable for 1080p quality (1920x1080 pixel) video output.
                    android Quality level corresponding to the 1080p (1920 x 1080) resolution.
                    RNCamera.Constants.VideoQuality.720p.
                    ios Specifies capture settings suitable for 720p quality (1280x720 pixel) video output.
                    android Quality level corresponding to the 720p (1280 x 720) resolution.
                    RNCamera.Constants.VideoQuality.480p.
                    ios Specifies capture settings suitable for VGA quality (640x480 pixel) video output.
                    android Quality level corresponding to the 480p (720 x 480) resolution.
                    RNCamera.Constants.VideoQuality.4:3.
                    ios Specifies capture settings suitable for VGA quality (640x480 pixel) video output. (Same as RNCamera.Constants.VideoQuality.480p).
                    android Quality level corresponding to the 480p (720 x 480) resolution but with video frame width set to 640.
            * */
      quality: RNCamera.Constants.VideoQuality['1080p'],
      videoBitrate: 25,
      // 100 MB for now
      maxFileSize: 100 * 1024 * 1024,
      //"portrait", "portraitUpsideDown", "landscapeLeft" or "landscapeRight"
      orientation: 'portrait',
      /*
            RNCamera.Constants.VideoCodec['H264']
            RNCamera.Constants.VideoCodec['JPEG']
            RNCamera.Constants.VideoCodec['HVEC'] (iOS >= 11)
            RNCamera.Constants.VideoCodec['AppleProRes422'] (iOS >= 11)
            RNCamera.Constants.VideoCodec['AppleProRes4444'] (iOS >= 11)
            * */
      //codec: RNCamera.Constants.VideoCodec['JPEG'],
      mirrorVideo: false,
      //Max video duration
      maxDuration: 120,
      // x*1024*1024 in bytes
      //maxFileSize: 20,
      //mute: false,
      //path: '',
      doNotSave: false
    };
  }
  takeAPicture = async function(camera) {
    try {
      if (camera) {
        return await camera.takePictureAsync(this.options);
      }
      return null;
    } catch (error) {
      return error;
    }
  };
  startRecording = async (camera, successCallBack, failedCallback) => {
    try {
      if (camera) {
        camera
          .recordAsync(this.optionsRecording)
          .then(video => {
            successCallBack(video);
          })
          .catch(error => {
            failedCallback(error);
          });
      }
    } catch (error) {
      failedCallback(error);
    }
  };
  resolveOnPressCameraButton() {
    if (this.camera.state.flashModeCounter % 3 === 0) {
      this.camera.setState({
        flashButtonName: 'flash-auto',
        flashMode: RNCamera.Constants.FlashMode.auto
      });
    } else if (this.camera.state.flashModeCounter % 3 === 1) {
      this.camera.setState({
        flashButtonName: 'flash-off',
        flashMode: RNCamera.Constants.FlashMode.off
      });
    } else if (this.camera.state.flashModeCounter % 3 === 2) {
      this.camera.setState({
        flashButtonName: 'flash-on',
        flashMode: RNCamera.Constants.FlashMode.torch
      });
    }
  }
  resolvePinchGesture(nativeEvent) {
    if (nativeEvent.scale > 1) {
      if (this.camera.state.zoom + this.camera.zoomRate > 1) {
        this.camera.setState({ zoom: 1 });
      } else {
        this.camera.setState({
          zoom: this.camera.state.zoom + this.camera.zoomRate
        });
      }
    } else if (nativeEvent.scale < 1) {
      if (this.camera.state.zoom - this.camera.zoomRate < 0) {
        this.camera.setState({ zoom: 0 });
      } else {
        this.camera.setState({
          zoom: this.camera.state.zoom - this.camera.zoomRate
        });
      }
    }
  }
}
export default CameraHandler;
