import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

const MainButton = ({ text, onPress, disabled, loading }) => {
  return (
  	<TouchableOpacity disabled={disabled} onPress={onPress} style={styles.button} activeOpacity={0.8}>
	    {loading ? (
	        <ActivityIndicator size="small" color="#FEA195" />
	      ) : (
	        <Text style={[styles.buttonText, disabled && styles.disabled]}>{text}</Text>
	      )
	    }
  	</TouchableOpacity>
  )
}

const styles = StyleSheet.create({
	button: {
    height: 50,
    backgroundColor: "#fff",
    margin: 5,
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
    color: '#FE9595',
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
}

MainButton.defaultProps = {
  text: '',
  disabled: false,
  loading: false
}

export default MainButton;