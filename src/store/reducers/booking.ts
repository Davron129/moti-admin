import { AnyAction } from 'redux';

interface InitialStateInterface {
    isBooked: boolean
}

const InitialState: InitialStateInterface = {
    isBooked: false
}

export const booking = (state = InitialState, action: AnyAction) => {
    switch (action.type) {
        case 'BOOKED':
            return {
                isBooked: action.payload
            }
        default:
            return state
    }
}