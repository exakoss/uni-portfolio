import {createStore, combineReducers, applyMiddleware} from 'redux';

import tokenReducer from './reducers/tokenReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import ethPriceReducer from './reducers/ethPriceReducer';
import dailyBlockReducer from './reducers/dailyBlockReducer';

// Since current ETH price and the number of block that
// was mined 24 hrs ago are being used virtually by
// every component, I put them into the app state for
// the sake of convenience and optimization

const reducer = combineReducers({
    tokenIds: tokenReducer,
    ethPrice: ethPriceReducer,
    dailyBlock: dailyBlockReducer
})

const composeEnhancers = composeWithDevTools({ trace: true})

const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)))

export default store
