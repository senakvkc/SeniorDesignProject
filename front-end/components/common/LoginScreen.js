import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import bgImage from '../../assets/login.jpg';
import logo from '../../assets/logo.png';

const { width: WIDTH } = Dimensions.get('window');

export default class LoginScreen extends Component {
  constructor(){
    super()
    this.state = {
      showPass: true,
      press: false
    }
  }

  showPass = () => {
    if (this.state.press == false) {
      this.setState({showPass: false, press: true})
    } else {
      this.setState({showPass: true, press: false})
    }
  }

  render() {
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.logoText}>WELCOME TO SHELTY</Text>
        </View>

        <View styles={styles.inputContainer}>
          <Icon name={'md-person'} size={28} color={'rgba(255, 255, 255, 0.7)'} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={'Username'}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underlineColorAndroid='transparent'
          />
        </View>

        <View styles={styles.inputContainer}>
          <Icon name={'md-lock'} size={28} color={'rgba(255, 255, 255, 0.7)'} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={'Password'}
            secureTextEntry={this.state.showPass}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underlineColorAndroid='transparent'
          />

          <TouchableOpacity style={styles.buttonEye} onPress={this.showPass.bind(this)}>
            <Icon name={this.state.press == false ? 'md-eye' : 'md-eye-off'} size={26} color={'rgba(255, 255, 255, 0.7)'}/>
          </TouchableOpacity>

        </View>

        

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.7,
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 45,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37,
  },
  inputContainer: {
    marginTop: 10,
  },
  buttonEye: {
    position: 'absolute',
    top: 8,
    right: 37,
  },
})
