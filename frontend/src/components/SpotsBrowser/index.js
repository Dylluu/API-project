import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpots } from '../../store/spots';
import './Spots.css';
import SpotCard from '../SpotCard';

const SpotsBrowser = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots);
    const spotsArray = Object.values(spots)
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    setTimeout(() => setIsLoaded(true), 300)

    return (
        <div className='spots-container'>
            {isLoaded && spotsArray.map(spot => (
                <SpotCard key={spot.id} spot={spot}/>
            ))}
            <div className='bott-bar'>
                <div className='bott-inner'>
                    <div className='bott-left'>
                        <span
                        style={{fontWeight: '250', fontSize: '14px'}}
                        >© 2022 Airbenbe, Inc.</span>
                    </div>
                    <div className='bott-right'>
                        <i className="fa-brands fa-github"
                        style={{marginRight: '5px'}}
                        />
                        <a
                        className='git-linked'
                        style={{color: 'black', cursor: 'pointer'}}
                        href='https://github.com/Dylluu/API-project' target='_blank'>Github</a>
                        <i className="fa-brands fa-linkedin"
                        style={{marginLeft: '20px'}}
                        />
                        <a
                        className='git-linked'
                        style={{color: 'black', marginLeft: '5px', cursor: 'pointer'}}
                        href='https://www.linkedin.com/in/dylan-luu-0a869b1b8/' target='_blank'>LinkedIn</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpotsBrowser;
