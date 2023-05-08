import { csrfFetch } from "./csrf";

const ALL_SPOTS = "spots/getSpots";
const SINGLE_SPOT = "spots/getSpot";
const CREATE_SPOT = "spots/createSpot"


//====ACTION CREATORS=======================================

const getSpots = (spots) => {
    return {
        type: ALL_SPOTS,
        spots
    }
}

const getSpot = (spot) => {
    return {
        type: SINGLE_SPOT,
        spot
    }
}

const createSpot = (data) => {
    return {
        type: CREATE_SPOT,
        data
    }
}

//====THUNKS================================================

export const fetchSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')

    if (response.ok) {
    const spots = await response.json()
    dispatch(getSpots(spots));
} //might need an else for errors?
}

export const fetchSpot = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`)

    if (response.ok) {
    const spot = await response.json()
    dispatch(getSpot(spot));
    } //might need an else for errors?
}

export const fetchNewSpot = (data) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    if (response.ok) {
    const newSpot = await response.json()
    dispatch(createSpot(newSpot));
    } //might need an else for errors?
}

//====REDUCER===============================================

const initialState = {
    allSpots: {},
    singleSpot: {}
};

const spotsReducer = (state = initialState, action) => {
    let spotState;

    switch (action.type) {

        case ALL_SPOTS:
            // console.log('spots from reducer', action.spots.Spots)
            const allSpots = action.spots.Spots
            spotState = {...state, allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot}}
            // console.log('state from reducer', spotState)
            allSpots.forEach((spot) => {
                spotState.allSpots[spot.id] = spot;
              });
            return spotState;

        case SINGLE_SPOT:
            // console.log('spot action', action)
            const singleSpot = action.spot //need to log this
            // console.log('reducer single spot action', singleSpot)
            spotState = {...state, allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot}}

            spotState.singleSpot = singleSpot
            // need to pass single spot action into new spot state.
            return spotState

        case CREATE_SPOT:
              //console.log to determine data after component is set up
            spotState = {...state, allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot}}

            return state;

        default:
            return state;
    }
}

export default spotsReducer