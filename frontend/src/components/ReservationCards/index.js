import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { deleteBookingThunk } from '../../store/bookings';
import { getReviews } from '../../store/reviews';
import { getSpots } from '../../store/spots';
import './ReservationCards.css';

function ReservationCards ({spotId, booking}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const spots = useSelector(state => state.spots);
    const spot = Object.values(spots).find(spot => spot.id == spotId);

    const months = {'01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'June', '07': 'July', '08': 'Aug', '09': 'Sept', 10: 'Oct', 11: 'Nov', 12: 'Dec'};

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch])

    function parseDate (date) {
        const year = date.split('-')[0];
        const month = date.split('-')[1];
        const day = date.split('-')[2];

        return `${months[month]} ${day}`
    }

    function getNumNights (start, end) {
        const startDate = `${start.split('-')[1]}/${start.split('-')[2]}/${start.split('-')[0]}`
        const endDate = `${end.split('-')[1]}/${end.split('-')[2]}/${end.split('-')[0]}`

        const timeDifference = new Date(startDate).getTime() - new Date(endDate).getTime()
        const dayDifference = Math.abs(timeDifference / (1000 * 3600 * 24))

        return Math.round(dayDifference);
    }

    if(!spots) return null

    if(!spot || !spot.previewImage) return null;

    return (
        <div className='reservation-cards-wrapper'>
            <div className='reservation-cards-left'>
                <div className='reservation-cards-left-inner'>
                    <div className='reservation-cards-left-top'>
                        <span id='reservation-cards-spot-name'>{spot?.name}</span>
                        <span id='reservation-cards-spot-location'>{spot?.city}, {spot?.state}</span>
                    </div>
                    <div className='reservation-cards-left-bottom'>
                        <div className='reservation-cards-left-bottom-left'>
                            <div className='reservation-cards-left-bottom-left-inner'>
                                <span className='reservation-cards-dates-and-nights'>Dates</span>
                                <span id='reservation-cards-dates'>{parseDate(booking.startDate)} - {parseDate(booking.endDate)}</span>
                                <span className='reservation-cards-dates-and-nights'>Nights</span>
                                <span id='reservation-cards-dates'>{getNumNights(booking.startDate, booking.endDate)} {getNumNights(booking.startDate, booking.endDate) == 1 ? 'night' : 'nights'}</span>
                                <div className='reservation-cards-edit-and-cancel'>
                                    <span className='up-del-actual-buttons' id='edit-and-cancel-buttons'>Edit</span>
                                    <span className='up-del-actual-buttons' id='edit-and-cancel-buttons'
                                    onClick={() => {
                                        dispatch(deleteBookingThunk(booking.id))
                                        history.go(0)
                                    }}
                                    >Cancel</span>
                                </div>
                            </div>
                        </div>
                        <div className='reservation-cards-left-bottom-right'>
                            <div className='reservation-cards-left-bottom-right-inner'>
                                <p id='reservation-cards-spot-description'>{spot?.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img id='reservation-cards-spot-image' alt={spotId} src={spot?.previewImage}
            onClick={() => history.push(`/spots/${spotId}`)}
            />
        </div>
    )
}

export default ReservationCards;
