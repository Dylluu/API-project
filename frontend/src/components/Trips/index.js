import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { clearBookings, getBookingsThunk } from '../../store/bookings';
import './Trips.css';

function Trips() {

    const dispatch = useDispatch();
    const history = useHistory();
    const allBookings = useSelector(state => state.bookings?.allBookings?.Bookings);

    useEffect(() => {
        dispatch(clearBookings());
        dispatch(getBookingsThunk());
    }, [dispatch])

    if(!allBookings) return null;

    return (
        <div className='trips-page-container'>
            <span id='trips-title'>Trips</span>
            <div className='upcoming-reservations'>
                {allBookings?.length > 0 && <span id='upcoming-reservations-text'>Upcoming Reservations</span>}
                {allBookings?.length == 0 && (
                    <div className='no-bookings-yet-wrapper'>
                        <span id='no-bookings-yet-title'>No trips booked...yet!</span>
                        <span id='time-to-dust-text'>Time to dust off your bags and start planning your next adventure</span>
                        <div id='start-searching-button'
                        onClick={() => history.push('/')}
                        ><span>Start searching</span></div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Trips;
