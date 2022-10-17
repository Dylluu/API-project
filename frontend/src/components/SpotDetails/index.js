import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpot } from '../../store/spots';
import { useParams } from 'react-router-dom'

const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots);

    useEffect(() => {
        dispatch(getSpot(spotId))
    }, [dispatch])

    return (
        <div style={{marginTop: '100px'}}>
            {spot.id}
        </div>
    )
}


export default SpotDetails;
