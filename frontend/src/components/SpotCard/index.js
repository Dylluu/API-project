import './SpotCard.css'

const SpotCard = ({spot}) => {
    return (
        <div className='spot-card'>
            <div >
                <img className='spot-image' alt='previewImage' src={spot.previewImage}/>
            </div>
            <div className='spot-card-text'>
                <span className='spot-location'>{spot.city}, {spot.state}</span>
                <span><span style={{fontWeight: '450'}}>${spot.price}</span> night</span>
            </div>
        </div>
    )
}

export default SpotCard;
