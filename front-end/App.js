import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

import { COLORS } from './constants/theme';
import { LAN_ADDRESS } from './constants';
import AppNavigator from './navigation/AppNavigator';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `${LAN_ADDRESS}:8080/graphql`,
});

const client = new ApolloClient({
  cache,
  link,
});

const App = () => {
  const [fontsLoaded] = useFonts({
    Rancho: require('./assets/fonts/Rancho-Regular.ttf'),
    Quicksand: require('./assets/fonts/Quicksand-Regular.ttf'),
    Raleway: require('./assets/fonts/Raleway-Regular.ttf'),
    RalewayBold: require('./assets/fonts/Raleway-Bold.ttf')
  });

  return <ApolloProvider client={client}>{fontsLoaded ? <AppNavigator /> : <AppLoading />}</ApolloProvider>;
};

export default App;
