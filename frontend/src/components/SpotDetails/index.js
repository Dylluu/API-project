import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpot } from '../../store/spots';
import { useParams } from 'react-router-dom'
import './SpotDetails.css';
import { getReviews } from '../../store/reviews';

const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots);
    const reviews = useSelector(state => state.reviews);
    const reviewsArray = Object.values(reviews);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getSpot(spotId))
        dispatch(getReviews(spotId))
    }, [dispatch])

    setTimeout(() => setIsLoaded(true), 100)

    return (
        <div className='spot-details-container'>
            <div className='spot-name'>
                <span style={{fontSize: '27px'}}>{spot.name}</span>
                <div className='spot-info-under-name'>
                <i class="fa-solid fa-star" style={{fontSize: '12px'}}></i>
                <span className='spot-info-under-name-text'>{spot.avgStarRating}</span>
                <span className='dot'>.</span>
                <span style={{fontWeight: '250'}} className='spot-info-under-name-text'>{spot.numReviews} reviews</span>
                <span className='dot'>.</span>
                <i style={{fontSize: '14px', marginLeft: '6px'}} className="fa-solid fa-medal"></i>
                <span style={{marginLeft: '8px', fontWeight: '250'}}className='spot-info-under-name-text'>Superhost</span>
                </div>
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
                {isLoaded && <span className='spot-name'>{spot.name} hosted by {spot.Owner.firstName}</span>}
            </div>
            <div className='spot-misc-info'>
                <div className='spot-misc-1'>
                    <div className='icon-div'>
                    <i class="fa-solid fa-crown" style={{ fontSize: '25px', marginTop: '0px', color: 'black' }}></i>
                    </div>
                    <div className='spot-misc-text'>
                        {isLoaded && <span style={{ marginLeft: '15px', fontWeight: '450', fontSize: '18px' }}>{spot.Owner.firstName} is a Superhost</span>}
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
            <div className='spot-description'>
            <div className='spot-description-text'>
                <p>{spot.description}</p>
            </div>
            </div>
            <div className='spot-reviews'>
                {isLoaded && reviewsArray.map((review) => (
                    <div className='review-user-name'>{review.User.firstName}</div>
                ))}
            </div>
        </div>
    )
}


export default SpotDetails;
