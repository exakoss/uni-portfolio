import {createStore, combineReducers, applyMiddleware} from 'redux';

import tokenReducer from './reducers/tokenReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import ethPriceReducer from './reducers/ethPriceReducer';

const reducer = combineReducers({
    tokenIds: tokenReducer,
    ethPrice: ethPriceReducer
})

const composeEnhancers = composeWithDevTools({ trace: true})

const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)))

export default store
