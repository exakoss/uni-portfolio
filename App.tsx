import React from 'react';
import Main from './src/components/Main'
import { NativeRouter } from 'react-router-native'
import {ApolloProvider} from '@apollo/client';
import { Provider as ReduxProvider} from 'react-redux'
import {store, persistor} from './src/store'
import { PersistGate } from 'redux-persist/integration/react'
import { client } from './src/graphql/client';


const App:React.FC = () => {
  return (
      <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <NativeRouter>
                  <ApolloProvider client={client}>
                        <Main/>
                  </ApolloProvider>
              </NativeRouter>
          </PersistGate>
      </ReduxProvider>
  );
}

export default App
