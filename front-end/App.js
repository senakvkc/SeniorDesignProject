import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './navigation/AppNavigator';

const Navigator = createAppContainer(AppNavigator);

class App extends Component {
  render() {
    return <Navigator />;
  }
}

export default App;
