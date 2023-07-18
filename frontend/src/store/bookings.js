import { csrfFetch } from "./csrf";

const CREATE_BOOKING = 'bookings/CREATE_BOOKING';
const USER_BOOKING = 'bookings/USER_BOOKING';
const CANCEL_BOOKING = 'bookings/CANCEL_BOOKING';

const createBooking = (booking) => {
    return {
        type: CREATE_BOOKING,
        booking
    };
};

const userBooking = (bookings) => {
    return {
        type: USER_BOOKING,
        bookings
    };
};

const cancelBooking = (booking) => {
    return {
        type: CANCEL_BOOKING,
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

export const fetchUserTrips = () => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/current`);


    if (response.ok) {
        const bookings = await response.json();
        dispatch(userBooking(bookings))
        return null
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const cancelBookingThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    });


    if (response.ok) {
        const res = await response.json();
        dispatch(cancelBooking(id))
        return null
    } else {
        const errors = await response.json();
        return errors;
    }
}



///////////////////////////////////////////////////////////////////////
const initialState = {
    spotBookings: {},
    userBookings: {},
}


const bookingsReducer = (state = initialState, action) => {
    let bookingState;

    switch (action.type) {
        case CREATE_BOOKING:
            const newBooking = action.booking;

            bookingState = {...state, spotBookings: {...state.spotBookings}, userBookings: {...state.userBookings}};

            bookingState.spotBookings[newBooking.id] = newBooking
            bookingState.userBookings[newBooking.id] = newBooking

            return bookingState;

        case USER_BOOKING:
            const bookings = action.bookings.Bookings;

            bookingState = {...state, spotBookings: {...state.spotBookings}, userBookings: {}};

            bookings.forEach(booking => {
                bookingState.userBookings[booking.id] = booking
            });

            return bookingState;

        case CANCEL_BOOKING:
            const id = action.booking;

            bookingState = {...state, spotBookings: {...state.spotBookings}, userBookings: {...state.userBookings}};

            delete bookingState.spotBookings[id]
            delete bookingState.userBookings[id]

            return bookingState;

        default:
            return state;


    }
}

export default bookingsReducer
