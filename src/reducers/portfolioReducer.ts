import {PortfolioAction, WatchlistEntry, PortfolioState} from '../types';
import {SNX_ADDRESS} from '../constants';

const initialState:PortfolioState = {
    portfolioEntries: [
        {
            dataSource:'UNI',
            id:SNX_ADDRESS
        },
        {
            dataSource:'SYNTH',
            id:'sUSD'
        }
    ]
}

//Reducer
const portfolioReducer = (state:PortfolioState = initialState, action:PortfolioAction) => {
    switch (action.type) {
        case 'ADD_PORTFOLIO_ENTRY':
            return {
                portfolioEntries: [...state.portfolioEntries,action.data]
            }
        case 'REMOVE_PORTFOLIO_ENTRY':
            return {
                portfolioEntries: state.portfolioEntries.filter(e => e.id !== action.data.id)
            }
        default:
            return state
    }
}

//Actions
export const addPortfolioEntry = (entry:WatchlistEntry):PortfolioAction => {
    return {
        type: 'ADD_PORTFOLIO_ENTRY',
        data: entry
    }
}

export const removePortfolioEntry = (entry:WatchlistEntry):PortfolioAction => {
    return {
        type: 'REMOVE_PORTFOLIO_ENTRY',
        data: entry
    }
}

export default portfolioReducer
