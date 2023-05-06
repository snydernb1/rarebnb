import { csrfFetch } from "./csrf";

const ALL_SPOTS = "spots/getSpots";


//====ACTION CREATORS=======================================

const getSpots = (spots) => {
    return {
        type: ALL_SPOTS,
        spots
    }
}

//====THUNKS================================================

export const fetchSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')

    if (response.ok) {
    const spots = await response.json()
    // console.log('spots from thunk')
    dispatch(getSpots(spots));
    } //might need an else for errors?
}

//====REDUCER===============================================

const initialState = {
    allSpots: {},
    singleSpot: {}
};

const spotsReducer = (state = initialState, action) => {
    // let newState;
    switch (action.type) {

        case ALL_SPOTS:
            // console.log('spots from reducer', action.spots.Spots)
            const allSpots = action.spots.Spots
            const spotState = {...state, allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot}}
            // console.log('state from reducer', spotState)
            allSpots.forEach((spot) => {
                spotState.allSpots[spot.id] = spot;
              });
            return spotState;


        default:
            return state;
    }
}

export default spotsReducer
