import React, { useState } from 'react';
import { Image, Animated, View } from 'react-native';
import PropTypes from 'prop-types';

const ProgressiveImage = ({ source, thumb, style, resizeMode }) => {
  const [thumbOpacity, setThumbOpacity] = useState(new Animated.Value(0));

  const onLoad = () => {
  	Animated.timing(thumbOpacity, {
  		toValue: 0,
  		duration: 250
  	}).start();
  };

  const onThumbLoad = () => {
  	Animated.timing(thumbOpacity, {
  		toValue: 1,
  		duration: 250
  	}).start();
  }

  return (
  	<View>
  		<Animated.Image resizeMode={resizeMode}
  			style={[{ position: 'absolute' }, style]}
  			source={source}
  			onLoad={onLoad}
  		/>

  		<Animated.Image resizeMode={resizeMode}
  			style={[{ opacity: thumbOpacity }, style]}
  			source={thumb}
  			onLoad={onThumbLoad}
  		/>
  	</View>
  )
}

ProgressiveImage.propTypes = {
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  thumb: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  style: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array]),
  resizeMode: PropTypes.string
};

ProgressiveImage.defaultProps = {
  style: {},
  resizeMode: 'contain'
}


export default ProgressiveImage;