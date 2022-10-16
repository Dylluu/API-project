import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadSpots } from '../../store/spots';
import { getSpots } from '../../store/spots';

const SpotsBrowser = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.Spots);
    console.log('NEW STATE', spots)
    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    return (
        <div>
            Spots here
            <ul>
            {/* {spots.map(spot => (
                <li>
                    {spot.address}
                </li>
            ))} */}
            </ul>
        </div>
    )
}

export default SpotsBrowser;
