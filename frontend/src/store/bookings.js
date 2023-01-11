import { csrfFetch } from "./csrf";

const GET_BOOKINGS = 'bookings/GET';
const CLEAR_BOOKINGS = 'bookings/CLEAR';
const POST_BOOKING = 'bookings/POST';

export const getBookings = (bookings) => {
    return {
        type: GET_BOOKINGS,
        bookings
    }
}

export const clearBookings = () => {
    return {
        type: CLEAR_BOOKINGS
    }
}

export const getBookingsThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/current`);

    if(response.ok) {
        const bookings = await response.json();
        dispatch(getBookings(bookings));
    }
}

export const postBookingThunk = (spotId, booking) => async (dispatch) => {
    return await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'post',
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(booking)
    })
}

export default function bookingsReducer(state = {}, action) {
    const newState = {...state}
    switch (action.type) {
        case GET_BOOKINGS:
            newState.allBookings = action.bookings
            return newState
        case CLEAR_BOOKINGS:
            newState.allBookings = {}
            return newState
        default:
            return state;
    }
}
