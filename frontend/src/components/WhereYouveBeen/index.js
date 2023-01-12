import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import './WhereYouveBeen.css';

function WhereYouveBeen ({spotId, booking}) {
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

    if(!spots) return null

    if(!spot || !spot.previewImage) return null;

    return (
        <div className='where-youve-been-cards-container'
        onClick={() => {
            history.push(`/spots/${spotId}`)
        }}
        >
            <img alt={spotId} src={spot?.previewImage} id='price-details-top-img' className='where-youve-been-spot-image' />
            <div className='price-details-top-right'>
                <div className='price-details-top-right-top'>
                    <span id='price-details-spot-name'>{spot.name}</span>
                    <span id='price-details-spot-location'>{spot.city}, {spot.state}</span>
                </div>
                <div className='price-details-reviews'>
                    <span id='price-details-num-reviews'>{parseDate(booking.startDate)} - {parseDate(booking.endDate)}, {booking.endDate.split('-')[0]}</span>
                </div>
            </div>
        </div>
    )
}

export default WhereYouveBeen;
