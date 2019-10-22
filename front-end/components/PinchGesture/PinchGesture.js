import React, { Component } from 'react';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

class PinchGesture extends Component {
  _baseScale = new Animated.Value(1);
  _pinchScale = new Animated.Value(1);
  _scale = Animated.multiply(this._baseScale, this._pinchScale);
  _lastScale = 1;
  _onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: this._pinchScale } }],
    { useNativeDriver: USE_NATIVE_DRIVER }
  );

  _onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastScale *= event.nativeEvent.scale;
      this._baseScale.setValue(this._lastScale);
      this._pinchScale.setValue(1);
    }
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PinchGestureHandler
        onGestureEvent={this._onPinchGestureEvent}
        onHandlerStateChange={this._onPinchHandlerStateChange}
      >
        {this.props.children}
      </PinchGestureHandler>
    );
  }
}
export default PinchGesture;
