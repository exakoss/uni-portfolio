import {SNXAction, SNXState} from '../types';

const initialState:SNXState = {
    price: 0
}

//Reducer
const snxPriceReducer= (state:SNXState = initialState, action:SNXAction) => {
    switch (action.type) {
        case 'SET_SNX_PRICE':
            return {
                price: action.data
            }
        default:
            return state
    }
}

//Actions
export const setSNXPrice = (price:number):SNXAction => {
    return {
        type: 'SET_SNX_PRICE',
        data: price
    }
}

export default snxPriceReducer
