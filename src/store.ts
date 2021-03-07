import {createStore, combineReducers, applyMiddleware} from 'redux';

import tokenReducer from './reducers/tokenReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const reducer = combineReducers({
    tokenIds: tokenReducer
})

const composeEnhancers = composeWithDevTools({ trace: true})

const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)))

export default store
