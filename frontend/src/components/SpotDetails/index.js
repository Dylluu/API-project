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
                        <img className='img-1' alt='img1' src={spot.SpotImages[0].url} />
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
            <div className='spot-misc-info'>
                <div className='spot-misc-1'>
                    <div className='icon-div'>
                    <i class="fa-solid fa-crown" style={{ fontSize: '25px', marginTop: '0px', color: 'black' }}></i>
                    </div>
                    <div className='spot-misc-text'>
                        <span style={{ marginLeft: '15px', fontWeight: '450', fontSize: '18px' }}>{spot.ownerId} is a Superhost</span>
                        <span style={{ marginLeft: '15px', marginTop: '5px', color: 'grey', fontWeight: '300' }}>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</span>
                    </div>
                </div>
                <div className='spot-misc-1'>
                    <div className='icon-div'>
                        <i className="fa-solid fa-location-dot" style={{ fontSize: '25px', marginTop: '0px', color: 'black', marginLeft: '5px'}}></i>
                    </div>
                    <div className='spot-misc-text' style={{marginLeft: '4px'}}>
                        <span style={{ marginLeft: '15px', fontWeight: '450', fontSize: '18px' }}>Great Location</span>
                        <span style={{ marginLeft: '15px', marginTop: '5px', color: 'grey', fontWeight: '300' }}>100% of recent guests gave the location a 5-star rating.</span>
                    </div>
                </div>
                <div className='spot-misc-1' style={{height: '40px', marginTop: '20px'}}>
                    <div className='icon-div'>
                        <i className="fa-regular fa-calendar" style={{ fontSize: '25px', marginTop: '0px', marginLeft: '5px' }}></i>
                    </div>
                    <div className='spot-misc-text'>
                        <span style={{ marginLeft: '16px', fontWeight: '450', fontSize: '18px' }}>Free cancellation</span>
                    </div>
                </div>
            </div>
            <div className='spot-reviews'>

            </div>
        </div>
    )
}


export default SpotDetails;
