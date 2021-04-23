import {createStore, combineReducers, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import ethPriceReducer from './reducers/ethPriceReducer';
import dailyBlockReducer from './reducers/dailyBlockReducer';
import walletReducer from './reducers/walletReducer';
import seedReducer from './reducers/jsonSeedReducer';
import snxPriceReducer from './reducers/snxPriceReducer';
import modalReducer from './reducers/modalReducer';
import watchlistReducer from './reducers/watchlistReducer';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
// Since current ETH price and the number of block that
// was mined 24 hrs ago are being used virtually by
// every component, they belong to the app state for
// the sake of convenience and optimization

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: hardSet
    // whitelist: ['watchlist']
};

const reducer = combineReducers({
    watchlist: persistReducer(persistConfig, watchlistReducer),
    ethPrice: ethPriceReducer,
    snxPrice: snxPriceReducer,
    wallet: walletReducer,
    dailyBlock: dailyBlockReducer,
    seed: seedReducer,
    modal: modalReducer
})

const composeEnhancers = composeWithDevTools({ trace: true})

export const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)))
export const persistor = persistStore(store)
