export const SET_TRIPS = 'SET_TRIPS';
export const SET_TRIP_ID = 'SET_TRIP_ID';


export const setTrips = trips => dispatch => {
    dispatch({
        type: SET_TRIPS,
        payload: trips,
    });
};

export const setTripID = tripID => dispatch => {
    dispatch({
        type: SET_TRIP_ID,
        payload: tripID,
    });
};