import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { clearBookings, getBookingsThunk } from '../../store/bookings';
import ReservationCards from '../ReservationCards';
import WhereYouveBeen from '../WhereYouveBeen';
import './Trips.css';

function Trips() {

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const allBookings = useSelector(state => state.bookings?.allBookings?.Bookings);
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [pastBookings, setPastBookings] = useState([]);
    let upcomingBookingsArray = [];
    let pastBookingsArray = [];

    useEffect(() => {
        if(allBookings && allBookings.length) {
            for(let booking of allBookings) {
                if(new Date().toJSON() > new Date(booking.startDate).toJSON()) {
                    pastBookingsArray.push(booking)
                } else {
                    upcomingBookingsArray.push(booking)
                }
            }
            setUpcomingBookings(upcomingBookingsArray)
            setPastBookings(pastBookingsArray)
        }
    }, [allBookings])

    useEffect(() => {
        dispatch(clearBookings());
        dispatch(getBookingsThunk());
    }, [dispatch])

    useEffect(() => {
        if(!user) {
            history.push('/');
        }
    }, [user])

    if(!allBookings) return null;

    return (
        <div className='trips-page-container'>
            <span id='trips-title'>Trips</span>
            <div className='upcoming-reservations'>
                {upcomingBookings?.length > 0 && <span id='upcoming-reservations-text'>Upcoming Reservations</span>}
                {upcomingBookings?.length > 0 && (upcomingBookings.map(booking => <ReservationCards key={booking.id} spotId={booking.spotId} booking={booking}/>))}
                {upcomingBookings?.length == 0 && (
                    <div className='no-bookings-yet-wrapper'>
                        <span id='no-bookings-yet-title'>No upcoming trips booked...yet!</span>
                        <span id='time-to-dust-text'>Time to dust off your bags and start planning your next adventure</span>
                        <div id='start-searching-button'
                        onClick={() => history.push('/')}
                        ><span>Start searching</span></div>
                    </div>
                )}
            </div>
            {pastBookings.length > 0 && (<div className='where-youve-been'>
                <span id='upcoming-reservations-text'>Where You've Been</span>
                <div className='where-youve-been-spots-wrapper'>
                    {pastBookings?.map(booking => (
                        <WhereYouveBeen spotId={booking.spotId} booking={booking} />
                    ))}
                </div>
            </div>)}
        </div>
    )
}

export default Trips;
