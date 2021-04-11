import {createStore, combineReducers, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import tokenReducer from './reducers/tokenReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import ethPriceReducer from './reducers/ethPriceReducer';
import dailyBlockReducer from './reducers/dailyBlockReducer';
import walletReducer from './reducers/walletReducer';
import seedReducer from './reducers/jsonSeedReducer';
import snxPriceReducer from './reducers/snxPriceReducer';

// Since current ETH price and the number of block that
// was mined 24 hrs ago are being used virtually by
// every component, they belong to the app state for
// the sake of convenience and optimization
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['tokenIds']
};

const reducer = combineReducers({
    tokenIds: persistReducer(persistConfig, tokenReducer),
    ethPrice: ethPriceReducer,
    snxPrice: snxPriceReducer,
    wallet: walletReducer,
    dailyBlock: dailyBlockReducer,
    seed: seedReducer
})

const composeEnhancers = composeWithDevTools({ trace: true})

export const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)))
export const persistor = persistStore(store)
