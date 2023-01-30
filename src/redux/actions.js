export const SET_TRIPS = 'SET_TRIPS';
export const SET_TRIP_ID = 'SET_TRIP_ID';
export const GET_EMISSION = 'GET_EMISSION';
export const GET_FUELS = 'GET_FUELS';
export const GET_ELECTRICITY = 'GET_ELECTRICITY';
export const SET_BASE_VEHICLE = 'SET_BASE_VEHICLE';
export const SET_BASE_VEHICLE_TYPE = 'SET_BASE_VEHICLE_TYPE';
export const SET_BASE_FUEL = 'SET_BASE_FUEL';
export const SET_BASE_FUEL_TYPE = 'SET_BASE_FUEL_TYPE';
export const SET_BASE_EMISSION = 'SET_BASE_EMISSION';
export const SET_BASE_CONSUMPTION = 'SET_BASE_CONSUMPTION';
export const SET_BASE_FUEL_EMISSION = 'SET_BASE_FUEL_EMISSION';
export const SET_BASE_PASSENGERS = 'SET_BASE_PASSENGERS';

const API_URL = "http://localhost:3000/api/methodData";
const API_URL_FUEL = "http://localhost:3000/api/fuelData";
const API_URL_ELECTRICITY = "http://localhost:3000/api/electricityData";
// api 1: https://mocki.io/v1/fd443ca4-354e-4847-9bc7-314ca4ad7b89
// api 2: https://mocki.io/v1/fedd681d-d84f-46b0-931c-91a540f2686d
// api 3: https://mocki.io/v1/38263fcd-0ad8-4902-a53e-0b3c522f35e4

export const setBaseVehicle = base_vehicle => dispatch => {
    dispatch({
        type: SET_BASE_VEHICLE,
        payload: base_vehicle,
    });
};

export const setBaseVehicleType = base_vehicle_type => dispatch => {
    dispatch({
        type: SET_BASE_VEHICLE_TYPE,
        payload: base_vehicle_type,
    });
};

export const setBaseEmission = base_emission => dispatch => {
    dispatch({
        type: SET_BASE_EMISSION,
        payload: base_emission,
    });
};

export const setBaseFuel = base_fuel => dispatch => {
    dispatch({
        type: SET_BASE_FUEL,
        payload: base_fuel,
    });
};

export const setBaseFuelType = base_fuel_type => dispatch => {
    dispatch({
        type: SET_BASE_FUEL_TYPE,
        payload: base_fuel_type,
    });
};

export const setBaseFuelEmission = base_fuel_emission => dispatch => {
    dispatch({
        type: SET_BASE_FUEL_EMISSION,
        payload: base_fuel_emission,
    });
};

export const setBaseConsumption = base_consumption => dispatch => {
    dispatch({
        type: SET_BASE_CONSUMPTION,
        payload: base_consumption,
    });
};

export const setBasePassengers = base_passengers => dispatch => {
    dispatch({
        type: SET_BASE_PASSENGERS,
        payload: base_passengers,
    });
};

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

export const getFuels = () => {
    try {
        return async dispatch => {
            const result = await fetch(API_URL_FUEL, {
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
                    type: GET_FUELS,
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

export const getElectricity = () => {
    try {
        return async dispatch => {
            const result = await fetch(API_URL_ELECTRICITY, {
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
                    type: GET_ELECTRICITY,
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