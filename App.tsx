import React from 'react';
import Main from './src/components/Main'
import { NativeRouter } from 'react-router-native'
import {ApolloProvider} from '@apollo/client';
import { Provider as ReduxProvider} from 'react-redux'
import store from './src/store'
import { client } from './src/graphql/client';

const App:React.FC = () => {
  return (
      <ReduxProvider store={store}>
          <NativeRouter>
              <ApolloProvider client={client}>
                    <Main/>
              </ApolloProvider>
          </NativeRouter>
      </ReduxProvider>
  );
}

export default App
