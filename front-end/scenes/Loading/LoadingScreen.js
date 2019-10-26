import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';

class LoadingScreen extends Component {
  componentDidMount = () => {
    setTimeout(() => {
      this.props.navigation.navigate('HomeScreen');
    }, 2000);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ paddingBottom: 20 }}>This is the LoadingScreen.</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default LoadingScreen;
