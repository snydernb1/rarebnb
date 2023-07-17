import { csrfFetch } from "./csrf";

const CREATE_BOOKING = 'bookings/CREATE_BOOKING';

const createBooking = (booking) => {
    return {
        type: CREATE_BOOKING,
        booking
    };
};

export const newBookingThunk = (bookingData) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${bookingData.spotId}/bookings`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(bookingData.data)
    });


    if (response.ok) {
        const newBooking = await response.json();
        dispatch(createBooking(newBooking))
        return null
    } else {
        const errors = await response.json();
        return errors;
    }
}

const initialState = {
    bookings: {}
}


const bookingsReducer = (state = initialState, action) => {
    let bookingState;

    switch (action.type) {
        case CREATE_BOOKING:
            const newBooking = action.booking;

            bookingState = {...state, bookings: {...state.bookings}};

            bookingState.bookings[newBooking.id] = newBooking

            return bookingState;

        default:
            return state;


    }
}

export default bookingsReducer
