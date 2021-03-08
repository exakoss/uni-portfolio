import {ETHAction, ETHState} from '../types';

const initialState:ETHState = {
    price: 0
}

//Reducer
const ethPriceReducer= (state:ETHState = initialState, action:ETHAction) => {
    switch (action.type) {
        case 'SET_ETH_PRICE':
            return {
                price: action.data
            }
        default:
            return state
    }
}

//Actions
export const setETHPrice = (price:number):ETHAction => {
    return {
        type: 'SET_ETH_PRICE',
        data: price
    }
}

export default ethPriceReducer
