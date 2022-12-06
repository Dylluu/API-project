import './SpotCard.css'
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useState } from 'react';

const SpotCard = ({spot}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    setTimeout(() => setIsLoaded(true), 450)

    return (
        <NavLink className='spot-card' to={`/spots/${spot.id}`}>
            <div >
                {!isLoaded && <Skeleton className='spot-image'
                borderRadius='12px'
                style={{zIndex: '-1'}}
                />}
                {isLoaded && <img className='spot-image' alt='previewImage' src={spot.previewImage}/>}
            </div>
            <div style={{fontSize: '14px'}} className='spot-card-text'>
                <div className='spot-top-text'>
                {!isLoaded && <Skeleton
                width='170px'
                height= '15px'
                style={{zIndex: '-1'}}
                />}
                {isLoaded && <span className='spot-location'
                style={{marginBottom: '2px'}}
                >{spot.city}, {spot.state}</span>}
                <div className='card-stars'>
                {!isLoaded && <Skeleton
                width='40px'
                height= '15px'
                style={{zIndex: '-1'}}
                />}
                {isLoaded &&
                <div
                style={{flexDirection: 'row', display: 'flex'}}
                >
                <div className='star-div'>
                <i className="fa-solid fa-star" style={{ fontSize: '11px', color: 'black' }}></i>
                <div className='spacing-div'></div>
                </div>
                    <span> {spot.avgRating}</span>
                    </div>}
                    </div>
                </div>
                {!isLoaded && <Skeleton
                width='100px'
                height='15px'
                style={{zIndex: '-1', marginTop: '7px'}}
                />}
                {isLoaded && <div
                style={{marginTop: '0px'}}
                >
                <span><span style={{fontWeight: '450'}}>${spot.price}</span> night</span>
                </div>}
            </div>
        </NavLink>
    )
}

export default SpotCard;
