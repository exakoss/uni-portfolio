import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './src/components/Main'
import { NativeRouter } from 'react-router-native'
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink} from '@apollo/client';
import { Provider as ReduxProvider} from 'react-redux'
import store from './src/store'

const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
    })
})

const App:React.FC = () => {
  return (
      <ReduxProvider store={store}>
          <NativeRouter>
              <ApolloProvider client={apolloClient}>
                    <Main/>
              </ApolloProvider>
          </NativeRouter>
      </ReduxProvider>
  );
}

export default App
