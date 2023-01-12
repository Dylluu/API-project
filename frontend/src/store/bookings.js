import { csrfFetch } from "./csrf";

const GET_BOOKINGS = 'bookings/GET';
const GET_SPOT_BOOKINGS = 'bookings/spot/GET';
const CLEAR_BOOKINGS = 'bookings/CLEAR';

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

export const getSpotBookings = (bookings) => {
    return {
        type: GET_SPOT_BOOKINGS,
        bookings
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

export const deleteBookingThunk = (bookingId) => async (dispatch) => {
    return await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'delete'
    })
}

export const getSpotBookingsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

    if(response.ok) {
        const bookings = await response.json();
        dispatch(getSpotBookings(bookings))
    }
}

export const editBookingThunk = (bookingId, booking) => async (dispatch) => {
    return await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'put',
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
        case GET_SPOT_BOOKINGS:
            newState.spotBookings = action.bookings
            return newState
        case CLEAR_BOOKINGS:
            newState.allBookings = {}
            return newState
        default:
            return state;
    }
}
