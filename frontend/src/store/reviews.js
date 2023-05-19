import { csrfFetch } from "./csrf";

const ALL_REVIEWS = "reviews/getReviews";
const NEW_REVIEW = "reviews/newReview";
const DELETE_REVIEW = "reviews/deleteReview";
const CLEAR_REVIEWS = "reviews/clearReviews";
const USER_REVIEWS = "reviews/userReviews"
const EDIT_REVIEW = "reviews/editReview"

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

const clearSpotReviews = () => {
    return {
        type: CLEAR_REVIEWS
    }
}

const getUserReviews = (reviews) => {
    return {
        type: USER_REVIEWS,
        reviews
    }
}

const editUserReview = (review) => {
    return {
        type: EDIT_REVIEW,
        review
    }
}

//====THUNKS=======================================

export const fetchReviews = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`)

    if (response.ok) {
    const reviews = await response.json()
    dispatch(getReviews(reviews));
    } //might need an else for errors?
}

export const fetchUserReviews = () => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/current`)

    if (response.ok) {
    const reviews = await response.json()
    dispatch(getUserReviews(reviews));
    } //might need an else for errors?
}

export const fetchEditReview = (data) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${data.revId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data.reviewData.backend)
    });

    if (response.ok) {
        const editedUserReview = await response.json();
        editedUserReview.User = data.reviewData.frontend.user
        dispatch(newReview(editedUserReview));
        return editedUserReview;
    } else {
        const errors = await response.json();
        return response;
    }
}

export const fetchNewReview = (data) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${data.spotId}/reviews`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data.reviewData.backend)
    });

    if (response.ok) {
        const newUserReview = await response.json();
        newUserReview.User = data.reviewData.frontend.user
        dispatch(newReview(newUserReview));
        return newUserReview;
    } else {
        const errors = await response.json();
        return response;
    }
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

export const fetchClearReviews = () => async (dispatch) => {
    dispatch(clearSpotReviews())
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

        case USER_REVIEWS:
            const userReviews = action.reviews.Reviews
            reviewState = {...state, spot: {...state.spot}, user: {}}
            userReviews.forEach((review) => {
                reviewState.user[review.id] = review;
            });
            return reviewState;

        case NEW_REVIEW:
            const newUserReview = action.review
            reviewState = {...state, spot: {...state.spot}, user: {...state.user}}

            reviewState.spot[newUserReview.id] = newUserReview

            return reviewState;

        case EDIT_REVIEW:
            const editedUserReview = action.review
            reviewState = {...state, spot: {...state.spot}, user: {...state.user}}

            reviewState.spot[editedUserReview.id] = editedUserReview

            return reviewState;

        case DELETE_REVIEW:
            const currState = Object.values(state.spot)
            reviewState = {spot: {}, user: {...state.user}}
            currState.forEach((review) => {
                if (review.id !== action.review)
                reviewState.spot[review.id] = review;
            });
            return reviewState;

        case CLEAR_REVIEWS:
            return initialState

        default:
            return state;
        }
}





export default reviewsReducer
