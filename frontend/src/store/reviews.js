import { csrfFetch } from "./csrf";

const ALL_REVIEWS = "spots/getReviews";
const NEW_REVIEW = "spots/newReview";
const DELETE_REVIEW = "spots/deleteReview";

//====ACTION CREATORS=======================================

const getReviews = (reviews) => {
    return {
        type: ALL_REVIEWS,
        reviews
    };
};

const newReview = (review) => {
    return {
        type: NEW_REVIEW,
        review
    };
};

const deleteReview = (review) => {
    return {
        type: DELETE_REVIEW,
        review
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

export const fetchNewReview = (data) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${data.spotId}/reviews`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data.reviewData)
    })

    if (response.ok) {
    const newUserReview = await response.json()
    dispatch(newReview(newUserReview));
    return newUserReview;
    } //might need an else for errors?
}

export const fetchDeleteReview = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
    const deletedMsg = await response.json()
    dispatch(deleteReview(id));
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
            return reviewState;

        case NEW_REVIEW:
            const newUserReview = action.review
            reviewState = {...state, spot: {...state.spot}, user: {...state.user}}

            reviewState.spot[newUserReview.id] = newUserReview

            return reviewState;

        case DELETE_REVIEW:
            const currState = Object.values(state.spot)
            reviewState = {spot: {}, user: {...state.user}}
            currState.forEach((review) => {
                if (review.id !== action.review)
                reviewState.spot[review.id] = review;
            });
            console.log('returned review state', reviewState)
            return reviewState;

        default:
            return state;
        }
}





export default reviewsReducer
