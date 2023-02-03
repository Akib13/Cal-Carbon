import { SET_TRIPS, SET_TRIP_ID, GET_EMISSION, SET_BASE_VEHICLE, SET_BASE_VEHICLE_TYPE, SET_BASE_FUEL, SET_BASE_FUEL_TYPE, GET_FUELS, GET_ELECTRICITY, SET_BASE_EMISSION, SET_BASE_CONSUMPTION, SET_BASE_FUEL_EMISSION, SET_BASE_PASSENGERS } from './actions';

const initialState = {
    trips: [],
    tripID: 1,
    emission: [],
    fuels: [],
    electricity: [],
    base_vehicle: '',
    base_vehicle_type: '',
    base_fuel: '',
    base_fuel_type: '',
    base_emission: 0,
    base_consumption: 0,
    base_fuel_emission: 0,
    base_passengers: 0
}


function tripReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TRIPS:
            return {...state, trips: action.payload};
        case SET_TRIP_ID:
            return {...state, tripID: action.payload};
        case GET_EMISSION:
            return {...state, emission: action.payload};
        case GET_FUELS:
            return {...state, fuels: action.payload};
        case GET_ELECTRICITY:
            return {...state, electricity: action.payload};
        case SET_BASE_VEHICLE:
            return {...state, base_vehicle: action.payload};
        case SET_BASE_VEHICLE_TYPE:
            return {...state, base_vehicle_type: action.payload};
        case SET_BASE_FUEL:
            return {...state, base_fuel: action.payload};
        case SET_BASE_FUEL_TYPE:
            return {...state, base_fuel_type: action.payload};
        case SET_BASE_EMISSION:
            return {...state, base_emission: action.payload};
        case SET_BASE_CONSUMPTION:
            return {...state, base_consumption: action.payload};
        case SET_BASE_FUEL_EMISSION:
            return {...state, base_fuel_emission: action.payload};
        case SET_BASE_PASSENGERS:
            return {...state, base_passengers: action.payload};
    
        default:
            return state;
    }
}

export default tripReducer;
