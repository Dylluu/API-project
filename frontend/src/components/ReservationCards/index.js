import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getReviews } from '../../store/reviews';
import { getSpot } from '../../store/spots';
import './ReservationCards.css';

function ReservationCards ({spotId, booking}) {
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots);
    const reviews = useSelector(state => state.reviews);

    useEffect(() => {
        dispatch(getSpot(spotId));
        dispatch(getReviews(spotId));
        console.log(booking);
    }, [dispatch])

    if(!spot.SpotImages) return null;

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
                                <span>Dates</span>
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
            <img id='reservation-cards-spot-image' alt={spotId} src={spot?.SpotImages[0].url}/>
        </div>
    )
}

export default ReservationCards;
