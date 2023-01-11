import { SET_TRIPS, SET_TRIP_ID } from './actions';

const initialState = {
    trips: [],
    tripID: 1,
}


function tripReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TRIPS:
            return {...state, trips: action.payload};
        case SET_TRIP_ID:
            return {...state, tripID: action.payload};
    
        default:
            return state;
    }
}

export default tripReducer;
