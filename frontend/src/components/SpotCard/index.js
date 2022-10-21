import './SpotCard.css'
import { NavLink } from 'react-router-dom';

const SpotCard = ({spot}) => {
    return (
        <NavLink className='spot-card' to={`/spots/${spot.id}`}>
            <div >
                <img className='spot-image' alt='previewImage' src={spot.previewImage}/>
            </div>
            <div style={{fontSize: '14px'}} className='spot-card-text'>
                <div className='spot-top-text'>
                <span className='spot-location'
                style={{marginBottom: '2px'}}
                >{spot.city}, {spot.state}</span>
                <div className='card-stars'>
                <div className='star-div'>
                <i className="fa-solid fa-star" style={{ fontSize: '11px', color: 'black' }}></i>
                <div className='spacing-div'></div>
                </div>
                    <span> {spot.avgRating}</span>
                    </div>
                </div>
                <span><span style={{fontWeight: '450'}}>${spot.price}</span> night</span>
            </div>
        </NavLink>
    )
}

export default SpotCard;
