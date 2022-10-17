import './SpotCard.css'
import { NavLink } from 'react-router-dom';

const SpotCard = ({spot}) => {
    return (
        <NavLink className='spot-card' to={`/spots/${spot.id}`}>
            <div >
                <img className='spot-image' alt='previewImage' src={spot.previewImage}/>
            </div>
            <div style={{fontSize: '14px'}} className='spot-card-text'>
                <span className='spot-location'>{spot.city}, {spot.state}</span>
                <span><span style={{fontWeight: '450'}}>${spot.price}</span> night</span>
            </div>
        </NavLink>
    )
}

export default SpotCard;
