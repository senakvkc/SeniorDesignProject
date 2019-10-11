import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Homepage from './scenes/Homepage';

export default function App() {
  return (
    <>
      <StatusBar hidden />
      <Homepage />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
