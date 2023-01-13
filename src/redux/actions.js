export const SET_TRIPS = 'SET_TRIPS';
export const SET_TRIP_ID = 'SET_TRIP_ID';
export const GET_EMISSION = 'GET_EMISSION';

const API_URL = "https://mocki.io/v1/0c4af3bb-75a3-41aa-98ca-729dc2f1a313";

export const getEmission = () => {
    try {
        return async dispatch => {
            const result = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            /*const result = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify ({
                    param1: "ypur value",
                    param2: "your value"
                })
            });*/
            const json = await result.json();
            if (json) {
                dispatch({
                    type: GET_EMISSION,
                    payload: json
                });
            } else {
                console.log("Unable to fetch!");
            }
        }
    } catch (error) {
        console.log(error);
    }
};

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