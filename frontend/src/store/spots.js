import { csrfFetch } from "./csrf";

const ALL_SPOTS = "spots/getSpots";
const SINGLE_SPOT = "spots/getSpot";
const CREATE_SPOT = "spots/createSpot"
const OWNER_SPOTS = "spots/ownerSpots"
const DELETE_SPOT = "spots/deleteSpot"
const EDIT_SPOT = "spots/editSpot"
const CLEAR_SPOT = "spots/clearSpot"


//====ACTION CREATORS=======================================

const getSpots = (spots) => {
    return {
        type: ALL_SPOTS,
        spots
    };
};

const getSpot = (spot) => {
    return {
        type: SINGLE_SPOT,
        spot
    };
};

const createSpot = (data) => {
    return {
        type: CREATE_SPOT,
        data
    };
};

const getOwnerSpots = (spots) => {
    return {
        type: OWNER_SPOTS,
        spots
    };
};

const deleteSpot = (spot) => {
    return {
        type: DELETE_SPOT,
        spot
    };
};

const editSpot = (spot) => {
    return {
        type: EDIT_SPOT,
        spot
    };
};

const clearSingleSpot = () => {
    return {
        type: CLEAR_SPOT
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
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    if (response.ok) {
    const newSpot = await response.json()
    dispatch(createSpot(newSpot));
    return newSpot;
    } //might need an else for errors?
}

export const fetchNewSpotImgs = (data) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${data.spotId}/images`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    if (response.ok) {
    const newSpot = await response.json()
    // dispatch(createSpot(newSpot));
    // return newSpot;
    } //might need an else for errors?
}

export const fetchUserSpots = () => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/current`)

    if (response.ok) {
    const ownerSpots = await response.json()
    dispatch(getOwnerSpots(ownerSpots));
    } //might need an else for errors?
}

export const fetchDeleteSpot = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
    const deletedSpot = await response.json()
    dispatch(deleteSpot(id));
    } //might need an else for errors?
}

export const fetchEditSpot = (spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(spot)
    })

    if (response.ok) {
    const newEditSpot = await response.json()
    dispatch(editSpot(newEditSpot));
    return newEditSpot;
    } //might need an else for errors?
}

export const fetchClearSpot = () => async (dispatch) => {
    dispatch(clearSingleSpot())
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
            const allSpots = action.spots.Spots
            spotState = {...state, allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot}}
            allSpots.forEach((spot) => {
                spotState.allSpots[spot.id] = spot;
              });
            return spotState;

        case SINGLE_SPOT:
            const singleSpot = action.spot //need to log this
            spotState = {...state, allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot}}

            spotState.singleSpot = singleSpot
            // need to pass single spot action into new spot state.
            return spotState

        case CREATE_SPOT:
            spotState = {...state, allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot}}

            spotState.allSpots[action.data.id] = action.data

            return spotState;

        case OWNER_SPOTS:
            const userSpots = action.spots.Spots
            spotState = {allSpots: {}, singleSpot: {...state.singleSpot}}
            userSpots.forEach((spot) => {
                spotState.allSpots[spot.id] = spot;
                });
            return spotState;

            case DELETE_SPOT:
                // const userSpots = action.spots.Spots
                spotState = {allSpots: {}, singleSpot: {...state.singleSpot}}
                const currState = Object.values(state.allSpots)
                currState.forEach((spot) => {
                    if (spot.id !== action.spot) {
                        spotState.allSpots[spot.id] = spot;

                    }
                });
                return spotState;

            case EDIT_SPOT:
                spotState = {...state, allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot}}

                spotState.allSpots[action.spot.id] = action.spot

                return spotState;

            case CLEAR_SPOT:

                return initialState

        default:
            return state;
    }
}

export default spotsReducer
