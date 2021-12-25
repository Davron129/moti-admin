import { AnyAction } from 'redux';

interface InitialStateInterface {
    isOrdered: boolean
}

const InitialState: InitialStateInterface = {
    isOrdered: false
}

export const order = (state = InitialState, action: AnyAction) => {
    switch (action.type) {
        case 'ORDERED':
            return {
                isOrdered: action.payload
            }
        default:
            return state
    }
}