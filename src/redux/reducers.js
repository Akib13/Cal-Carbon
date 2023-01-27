import { SET_TRIPS, SET_TRIP_ID, GET_EMISSION, SET_BASE_VEHICLE, SET_BASE_VEHICLE_TYPE, SET_BASE_FUEL } from './actions';

const initialState = {
    trips: [],
    tripID: 1,
    emission: [],
    base_vehicle: '',
    base_vehicle_type: '',
    base_fuel: ''
}


function tripReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TRIPS:
            return {...state, trips: action.payload};
        case SET_TRIP_ID:
            return {...state, tripID: action.payload};
        case GET_EMISSION:
            return {...state, emission: action.payload};
        case SET_BASE_VEHICLE:
            return {...state, base_vehicle: action.payload};
        case SET_BASE_VEHICLE_TYPE:
            return {...state, base_vehicle_type: action.payload};
        case SET_BASE_FUEL:
            return {...state, base_fuel: action.payload};
    
        default:
            return state;
    }
}

export default tripReducer;
