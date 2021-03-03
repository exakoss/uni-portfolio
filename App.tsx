import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './src/components/Main'
import { NativeRouter } from 'react-router-native'
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink} from '@apollo/client';

const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
    })
})

const App:React.FC = () => {
  return (
      <NativeRouter>
          <ApolloProvider client={apolloClient}>
                <Main/>
          </ApolloProvider>
      </NativeRouter>
  );
}

export default App
