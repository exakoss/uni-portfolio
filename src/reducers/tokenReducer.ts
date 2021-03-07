import {TokenAction, BasicToken} from '../types';
import {TokenState} from '../types';

const initialState:TokenState = {
    tokenIds: []
}

//Reducer
const tokenReducer= (state:TokenState = initialState, action:TokenAction) => {
    switch (action.type) {
        case 'ADD_TOKEN_ID':
            // return state.concat(action.data)
            return {
                tokenIds: [...state.tokenIds,action.data]
            }
        case 'REMOVE_TOKEN_ID':
            // return state.filter(id => id !== action.data)
            return {
                tokenIds: state.tokenIds.filter(id => id !== action.data)
            }
        default:
            return state
    }
}

//Actions
export const addTokenId = (id:BasicToken['id']):TokenAction => {
    return {
        type: 'ADD_TOKEN_ID',
        data: id
    }
}

export const removeTokenId = (id:BasicToken['id']):TokenAction => {
    return {
        type: 'REMOVE_TOKEN_ID',
        data: id
    }
}

export default tokenReducer
