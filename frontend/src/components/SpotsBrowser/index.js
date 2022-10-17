import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpots } from '../../store/spots';
import './Spots.css';
import SpotCard from '../SpotCard';

const SpotsBrowser = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots);
    const spotsArray = Object.values(spots)
    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    return (
        <div className='spots-container'>
            {spotsArray.map(spot => (
                <SpotCard key={spot.id} spot={spot}/>
            ))}
        </div>
    )
}

export default SpotsBrowser;
