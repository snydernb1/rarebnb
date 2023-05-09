import { csrfFetch } from "./csrf";

const ALL_REVIEWS = "spots/getReviews";

//====ACTION CREATORS=======================================

const getReviews = (reviews) => {
    return {
        type: ALL_REVIEWS,
        reviews
    };
};

//====THUNKS=======================================

export const fetchReviews = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`)

    if (response.ok) {
    const reviews = await response.json()
    dispatch(getReviews(reviews));
    } //might need an else for errors?
}

//====REDUCER=======================================

const initialState = {
    spot: {},
    user: {}
};

const reviewsReducer = (state = initialState, action) => {

    let reviewState;

    switch (action.type) {
        case ALL_REVIEWS:
            const allReviews = action.reviews.Reviews
            reviewState = {...state, spot: {}, user: {...state.user}}
            allReviews.forEach((review) => {
                reviewState.spot[review.id] = review;
            });
            console.log('reviews from reducer', reviewState)
            return reviewState;

        default:
            return state;
        }
}





export default reviewsReducer
