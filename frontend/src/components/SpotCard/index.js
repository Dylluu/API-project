import './SpotCard.css'

const SpotCard = ({spot}) => {
    return (
        <div className='spot-card'>
            <div className='spot-image'>
                Image
            </div>
            <div className='spot-card-text'>
                <span className='spot-location'>{spot.city}, {spot.state}</span>
                <span><span style={{fontWeight: '450'}}>${spot.price}</span> night</span>
            </div>
        </div>
    )
}

export default SpotCard;
