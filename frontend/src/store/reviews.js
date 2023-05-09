import { csrfFetch } from "./csrf";

const ALL_REVIEWS = "spots/getReviews";
const NEW_REVIEW = "spots/newReview";

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

//====THUNKS=======================================

export const fetchReviews = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`)

    if (response.ok) {
    const reviews = await response.json()
    dispatch(getReviews(reviews));
    } //might need an else for errors?
}

export const fetchNewReview = (data) => async (dispatch) => {
    console.log('data in thunk pre fetch', data)
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
            console.log('action in reducer',action.review)
            const newUserReview = action.review
            reviewState = {...state, spot: {...state.spot}, user: {...state.user}}

            reviewState.spot[newUserReview.id] = newUserReview

            return reviewState;

        default:
            return state;
        }
}





export default reviewsReducer
