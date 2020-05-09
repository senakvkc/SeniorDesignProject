import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

const MainButton = ({ text, onPress, disabled, loading, textStyle, secondary, buttonStyle }) => {
  const buttonColor = {
    backgroundColor: secondary ? '#FEA195' : '#FFF'
  };
  const textColor = {
    color: secondary ? '#FFF' : '#FE9595'
  };
  return (
  	<TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.button, buttonColor, buttonStyle]} activeOpacity={0.8}>
	    {loading ? (
	        <ActivityIndicator size="small" color="#FEA195" />
	      ) : (
	        <Text style={[styles.buttonText, textColor, textStyle, disabled && styles.disabled]}>{text}</Text>
	      )
	    }
  	</TouchableOpacity>
  )
}

const styles = StyleSheet.create({
	button: {
    height: 50,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 50,
    marginTop: 2,
    fontFamily: 'RalewayBold',
  },
	disabled: {
    color: '#C9C9C9',
  },
})

MainButton.propTypes = {
	text: PropTypes.string,
	onPress: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	loading: PropTypes.bool,
  textStyle: PropTypes.shape({}),
  buttonStyle: PropTypes.shape({}),
  secondary: PropTypes.bool,
}

MainButton.defaultProps = {
  text: '',
  disabled: false,
  loading: false,
  textStyle: {},
  buttonStyle: {},
  secondary: false,
}

export default MainButton;