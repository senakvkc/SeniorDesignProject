import React, { Component, useState, useMemo, useContext } from "react";
import { StyleSheet } from "react-native";

import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import { setContext } from "apollo-link-context";

import { GRAPHQL_ENDPOINT } from "./constants";
import AppNavigator from "./navigation/AppNavigator";
import { getToken } from "./utils/User";

global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
global.FormData = global.originalFormData || global.FormData;

if (window.FETCH_SUPPORT) {
  window.FETCH_SUPPORT.blob = false;
} else {
  global.Blob = global.originalBlob || global.Blob;
  global.FileReader = global.originalFileReader || global.FileReader;
}

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  return getToken()
    .then((token) => {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    })
    .catch((err) => {
      console.log("err", err);
      return null;
    });
  // return the headers to the context so httpLink can read them
  return null;
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(link),
});

const App = () => {
  const [fontsLoaded] = useFonts({
    Rancho: require("./assets/fonts/Rancho-Regular.ttf"),
    Quicksand: require("./assets/fonts/Quicksand-Regular.ttf"),
    Raleway: require("./assets/fonts/Raleway-Regular.ttf"),
    RalewayBold: require("./assets/fonts/Raleway-Bold.ttf"),
  });

  return (
      <ApolloProvider client={client}>
        {fontsLoaded ? <AppNavigator /> : <AppLoading />}
      </ApolloProvider>
  );
};

export default App;
