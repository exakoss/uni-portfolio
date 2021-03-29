import {dailyBlockState, dailyBlockAction} from '../types';

const initialState:dailyBlockState = {
    blockNumber: 100
}

//Reducer
const dailyBlockReducer = (state:dailyBlockState = initialState, action:dailyBlockAction) => {
    switch (action.type) {
        case 'SET_DAILY_BLOCK':
            return {
                blockNumber: action.data
            }
        default:
            return state
    }
}

//Actions
export const setDailyBlock = (blockNumber:number):dailyBlockAction => {
    return {
        type: 'SET_DAILY_BLOCK',
        data: blockNumber
    }
}

export default dailyBlockReducer
