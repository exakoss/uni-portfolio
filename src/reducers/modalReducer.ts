import {ModalAction, ModalState} from '../types';

const initialState:ModalState = {
    visible: false
}

//Reducer
const modalReducer= (state:ModalState = initialState, action:ModalAction) => {
    switch (action.type) {
        case 'SET_VISIBILITY':
            return {
                visible: action.data
            }
        default:
            return state
    }
}

//Actions
export const setModal = (visible:boolean):ModalAction => {
    return {
        type: 'SET_VISIBILITY',
        data: visible
    }
}

export default modalReducer
