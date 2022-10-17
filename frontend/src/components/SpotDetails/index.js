import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpot } from '../../store/spots';
import { useParams } from 'react-router-dom'
import './SpotDetails.css';

const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getSpot(spotId))
    }, [dispatch])

    setTimeout(() => setIsLoaded(true), 300)

    return (
        <div className='spot-details-container'>
            <div className='spot-name'>
                <span>{spot.name}</span>
            </div>
            <div className='spot-details-images'>
                <div className='img-1-container'>
                    {!isLoaded && <div className='img-1'></div>}
                    {isLoaded &&
                <img className='img-1' alt='img1' src={spot.SpotImages[0].url}/>
                    }
                </div>
                <div className='rest-images-container'>
                <div className='img-2'></div>
                <div className='img-3'></div>
                <div className='img-4'></div>
                <div className='img-5'></div>
                </div>
            </div>
            <div>
                <span className='spot-name'>{spot.name} hosted by {spot.ownerId}</span>
            </div>
        </div>
    )
}


export default SpotDetails;
