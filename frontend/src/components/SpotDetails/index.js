import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpot } from '../../store/spots';
import { useParams, useHistory } from 'react-router-dom'
import './SpotDetails.css';
import { getReviews } from '../../store/reviews';
import useModalContext from '../../context/ShowModalContext';
import ReviewForm from '../ReviewForm';
import { Modal } from '../../context/Modal';
import UpdateSpotForm from '../UpdateSpotForm';
import { deleteSpotThunk } from '../../store/spots';
import { deleteReviewThunk } from '../../store/reviews';
import airCover from '../../assets/airCover.webp'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle';

const SpotDetails = () => {
    const history = useHistory();
    const {showReviewModal, setShowReviewModal} = useModalContext();
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots);
    const reviews = useSelector(state => state.reviews);
    const user = useSelector(state => state.session.user);
    const reviewsArray = Object.values(reviews);
    const reviewIdsArray = reviewsArray.map(review => review.userId);
    const [isLoaded, setIsLoaded] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [startDate, setStartDate] = useState('Add date');
    const [endDate, setEndDate] = useState('Add date');
    const [selectedDates, setSelectedDates] = useState('');
    const [numNights, setNumNights] = useState('Select dates');
    const [numNightsPrice, setNumNightsPrice] = useState(1);
    const [travelDates, setTravelDates] = useState('Add travel dates for exact pricing');
    const months = { 1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December' }
    const dateArray = (date) => {
        const newDate = date.split('-')
        return `${months[newDate[1].toString()]} ${newDate[0]}`
    }
    const totalPrice = ((spot.price * numNightsPrice) + (spot.price/5) + (spot.price/4))

    useEffect(() => {
        dispatch(getSpot(spotId))
        dispatch(getReviews(spotId))
    }, [dispatch])

    useEffect(() => {
        const yearPrevArrow = document.getElementsByClassName('react-calendar__navigation__prev2-button')[0]
        const yearNextArrow = document.getElementsByClassName('react-calendar__navigation__next2-button')[0]
        const monthPrevArrow = document.getElementsByClassName('react-calendar__navigation__prev-button')[0]
        const monthNextArrow = document.getElementsByClassName('react-calendar__navigation__next-button')[0]
        const calendarNavigationLabel = document.getElementsByClassName('react-calendar__navigation__label')[0]
        if(yearPrevArrow) {
            yearPrevArrow.classList.add('invisible-arrow')
        }
        if(yearNextArrow) {
            yearNextArrow.classList.add('invisible-arrow')
        }
        if(monthPrevArrow) {
            monthPrevArrow.setAttribute('id', 'month-arrows')
        }
        if(monthNextArrow) {
            monthNextArrow.setAttribute('id', 'month-arrows')
        }
        if(calendarNavigationLabel) {
            calendarNavigationLabel.style.backgroundColor = 'white'
        }
    }, [calendarOpen])

    useEffect(() => {
        if(selectedDates[1]) {
            setEndDate(selectedDates[1].toLocaleDateString())
        }
    }, [selectedDates])

    useEffect(() => {
        if(selectedDates) {
            setTravelDates(`${startDate} - ${endDate}`)
            const timeDifference = new Date(startDate).getTime() - new Date(endDate).getTime()
            const dayDifference = Math.abs(timeDifference / (1000 * 3600 * 24))
            setNumNights(`${dayDifference} ${dayDifference == 1 ? 'night' : 'nights'}`)
            setNumNightsPrice(dayDifference)
        }
    }, [endDate])

    setTimeout(() => setIsLoaded(true), 600)

    const handleDeleteClick = async(e) => {
        e.preventDefault();

        await dispatch(deleteSpotThunk(spotId))

        await history.push('/')

        return
    }

    const handleUpdateClick = async (e) => {
        e.preventDefault();

        history.push(`/update/${spotId}`)
    }

    const handleDeleteReview = async (e) => {
        e.preventDefault();

        const reviewId = parseInt(e.target.id);

        await dispatch(deleteReviewThunk(reviewId));

        await dispatch(getReviews(spotId));

        await dispatch(getSpot(spotId));
    }

    if(!Object.values(spot).length) return null;

    if(!spot.SpotImages) return null;

    return (
        <div className='spot-details-container'>
            <div className='spot-name'>
                <span style={{ fontSize: '27px' }}>{spot.name}</span>
                <div className='spot-info-under-name'>
                    <div className='under-name-wrapper'>
                    <i className="fa-solid fa-star" style={{ fontSize: '12px' }}></i>
                    <span className='spot-info-under-name-text'>{spot.avgStarRating}</span>
                    <span className='dot'>∙</span>
                    <span style={{ fontWeight: '250' }} className='spot-info-under-name-text'>{spot.numReviews} reviews</span>
                    <span className='dot'>∙</span>
                    {/* <i style={{ fontSize: '14px', marginLeft: '6px', marginTop: '.1cm' }} className="fa-solid fa-medal"></i> */}
                    <span style={{ marginLeft: '4px', fontWeight: '250',
                maxWidth: '500px', maxHeight: '20px', overflow: 'hidden' }} className='spot-info-under-name-text'>{spot?.city}, {spot?.state}, {spot?.country}</span>
                    </div>
                    {isLoaded && !!user && spot?.Owner?.id === user?.id && <div className='update-delete-buttons'>
                        <span className='up-del-actual-buttons' onClick={(e) => handleUpdateClick(e)} style={{cursor: 'pointer'}}>Update</span>
                        <span className='up-del-actual-buttons' onClick={(e) => handleDeleteClick(e)} style={{cursor: 'pointer'}}>Delete</span>
                    </div>}

                </div>
            </div>
            <div className='spot-details-images'>
                <div className='img-1-container'>
                    {!isLoaded && <Skeleton
                    style={{height: '400px', minWidth: '80%', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px'}}
                    />}
                    {isLoaded && spot?.SpotImages && spot?.SpotImages[0] &&
                        <img className='img-1' alt='img1' src={spot?.SpotImages[0].url} />
                    }
                    {isLoaded && !spot?.SpotImages[0] && <div className='img-1'></div>}
                </div>
                <div className='rest-images-container'>
                    {!isLoaded && <div className='img-2'><Skeleton height='100%'
                    /></div>}
                    {isLoaded && spot?.SpotImages && spot?.SpotImages[1] &&
                        <img className='img-2' alt='img2' src={spot?.SpotImages[1].url} />
                    }
                    {isLoaded && !spot?.SpotImages[1] && <div className='img-2'></div>}
                    {!isLoaded && <div className='img-3'><Skeleton height='100%'
                    style={{borderTopRightRadius: '12px'}}
                    /></div>}
                    {isLoaded && spot?.SpotImages && spot?.SpotImages[2] &&
                        <img className='img-3' alt='img3' src={spot?.SpotImages[2].url} />
                    }
                    {isLoaded && !spot?.SpotImages[2] && <div className='img-3'></div>}
                    {!isLoaded && <div className='img-4'><Skeleton height='100%'/></div>}
                    {isLoaded && spot?.SpotImages && spot?.SpotImages[3] &&
                        <img className='img-4' alt='img4' src={spot?.SpotImages[3].url} />
                    }
                    {isLoaded && !spot?.SpotImages[3] && <div className='img-4'></div>}
                    {!isLoaded && <div className='img-5'><Skeleton height='100%'
                    style={{borderBottomRightRadius: '12px'}}
                    /></div>}
                    {isLoaded && spot?.SpotImages && spot?.SpotImages[4] &&
                        <img className='img-5' alt='img5' src={spot?.SpotImages[4].url} />
                    }
                    {isLoaded && !spot?.SpotImages[4] && <div className='img-5'></div>}
                </div>
            </div>
            <div className='spot-details-middle-section'>
            <div className='spot-details-middle-left'>
            <div>
                {isLoaded && <span className='spot-name'>{spot.name} hosted by {spot.Owner.firstName}</span>}
            </div>
            <div className='spot-misc-info'>
                <div className='spot-misc-1'>
                    <div className='icon-div'>
                        <i className="fa-solid fa-crown" style={{ fontSize: '23px', marginTop: '0px', color: 'black' }}></i>
                    </div>
                    <div className='spot-misc-text'>
                        {isLoaded && <span style={{ marginLeft: '15px', fontWeight: '450', fontSize: '16px' }}>{spot.Owner.firstName} is a Superhost</span>}
                        <span style={{ marginLeft: '15px', marginTop: '5px', color: 'grey', fontWeight: '300', fontSize: '15px' }}>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</span>
                    </div>
                </div>
                <div className='spot-misc-1'>
                    <div className='icon-div'>
                        <i className="fa-solid fa-location-dot" style={{ fontSize: '23px', marginTop: '0px', color: 'black', marginLeft: '5px' }}></i>
                    </div>
                    <div className='spot-misc-text' style={{ marginLeft: '4px' }}>
                        <span style={{ marginLeft: '15px', fontWeight: '450', fontSize: '16px' }}>Great Location</span>
                        <span style={{ marginLeft: '15px', marginTop: '5px', color: 'grey', fontWeight: '300', fontSize: '15px' }}>100% of recent guests gave the location a 5-star rating.</span>
                    </div>
                </div>
                <div className='spot-misc-1' style={{ height: '40px', marginTop: '20px' }}>
                    <div className='icon-div'>
                        <i className="fa-regular fa-calendar" style={{ fontSize: '23px', marginTop: '0px', marginLeft: '5px' }}></i>
                    </div>
                    <div className='spot-misc-text'>
                        <span style={{ marginLeft: '16px', fontWeight: '450', fontSize: '16px' }}>Free cancellation</span>
                    </div>
                </div>
            </div>
            <div className='spot-description'
            style={{flexDirection: 'column'}}
            >
                <img
                id='airCover'
                alt='airCover' src={airCover}
                />
                <div className='spot-description-text'
                style={{marginTop: '5px'}}
                >
                    <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
                </div>
            </div>
            <div className='spot-description'>
                <div className='spot-description-text'>
                    <p>{spot.description}</p>
                </div>
            </div>
            </div>
            <div className='spot-details-middle-right'>
                <div className='price-form'>
                    <div className='inner-price-form'>
                    <div className='first-pf'>
                        {isLoaded &&
                        <div className='ppn'>
                        <div className='left-ppn'>
                        <span
                        style={{fontSize: '23px', fontWeight: '500'}}
                        >${spot.price}</span>
                        </div>
                        <div className='right-ppn'>
                        <span
                        style={{fontWeight: '300', marginBottom: '2px'}}
                        >night</span>
                        </div>
                        </div>
                        }
                        {isLoaded && <div className='repeated-stars'>
                        <i className="fa-solid fa-star" style={{ fontSize: '12px', marginBottom: '3px' }}></i>
                    <span className='spot-info-under-name-text'>{spot.avgStarRating}</span>
                    <span className='dot'>∙</span>
                    <span style={{ fontWeight: '250' }} className='spot-info-under-name-text'>{spot.numReviews} reviews</span>
                        </div>}
                    </div>
                    {isLoaded && <div className='reservation-dates'>
                        <div className='check-in-check-out'
                        onClick={(e) => {
                            e.stopPropagation();
                            setCalendarOpen(true)
                            document.addEventListener('click', () => {
                                setCalendarOpen(false);
                            })
                        }}
                        >
                            <div className='check-in-date'>
                                <div className='check-in-date-inner'>
                                <span id='check-in'>CHECK-IN</span>
                                <span id='check-in-mdy'>{startDate}</span>
                                </div>
                            </div>
                            <div className='check-out-date'>
                            <div className='check-in-date-inner'>
                                <span id='check-in'>CHECKOUT</span>
                                <span id='check-in-mdy'>{endDate}</span>
                                </div>
                            </div>
                            {calendarOpen && (
                            <div className='calendar-container'>
                            <div className='calendar-wrapper'>
                                <div className='date-range-top-info'>
                                    <div className='date-range-top-info-left'>
                                        <span id='date-range-top-info-nights'>{numNights}</span>
                                        <span id='date-range-top-info-range'>{travelDates}</span>
                                    </div>
                                    <div id='datepicker-checkin-checkout'>
                                    <div className='check-in-date' id='datepicker-checkin'>
                                <div className='check-in-date-inner'>
                                <span id='check-in'>CHECK-IN</span>
                                <span id='check-in-mdy'>{startDate}</span>
                                </div>
                            </div>
                            <div className='check-out-date' id='datepicker-checkout'>
                            <div className='check-in-date-inner'>
                                <span id='check-in'>CHECKOUT</span>
                                <span id='check-in-mdy'>{endDate}</span>
                                </div>
                            </div>
                                    </div>
                                </div>
                            <DateRangePicker
                            calendarClassName='daterangepicker'
                            onClick={(e) => e.stopPropagation()}
                            onChange={setSelectedDates}
                            value={selectedDates}
                            rangeDivider={false}
						    showDoubleView={true}
						    monthPlaceholder={'mm'}
						    yearPlaceholder={'yyyy'}
						    dayPlaceholder={'dd'}
						    showNeighboringMonth={false}
                            showFixedNumberOfWeeks={false}
                            isOpen={true}
                            closeCalendar={false}
                            calendarType={'US'}
                            minDetail={'month'}
                            onClickDay={(value) => {
                                if(startDate == 'Add date') {
                                    setStartDate(value.toLocaleDateString())
                                }
                            }}
                            />
                            <div className='calendar-clear-and-close'>
                                <span id='clear-dates'
                                onClick={() => {
                                    setStartDate('Add date')
                                    setEndDate('Add date')
                                    setNumNights('Select dates')
                                    setNumNightsPrice(1)
                                    setTravelDates('Add travel dates for exact pricing')
                                    setSelectedDates('')
                                }}
                                >Clear dates</span>
                                <span id='close-calendar'
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setCalendarOpen(false)
                                }}
                                >Close</span>
                            </div>
                            </div>
                            </div>
                            )}
                        </div>
                        <div id='reserve-button'>
                            <span id='reserve-button-text'>Reserve</span>
                        </div>
                    </div>}
                    <div className='third-pf'>
                    {isLoaded &&
                        <div style={{width: '100%'}}>
                            <div className='seven-nights'>
                                <span
                                style={{textDecoration: 'underline'}}
                                >${spot.price} x {numNightsPrice} {numNightsPrice == 1 ? 'night' : 'nights'}</span>
                                <span>${spot.price * numNightsPrice}</span>
                            </div>
                            <div className='seven-nights'>
                                <span
                                style={{textDecoration: 'underline'}}
                                >Cleaning fee</span>
                                <span>${(spot.price/5).toFixed(0)}</span>
                            </div>
                            <div className='seven-nights'>
                                <span
                                style={{textDecoration: 'underline'}}
                                >Service fee</span>
                                <span>${(spot.price/4).toFixed(0)}</span>
                            </div>
                        </div>}
                    </div>
                    <div className='second-pf'
                    style={{marginTop: '5px'}}
                    ></div>
                    {isLoaded &&
                    <div className='total'>
                        <span>Total before taxes</span>
                        <span>${totalPrice.toFixed(0)}</span>
                    </div>
                    }
                    </div>
                </div>
            </div>
            </div>
            <div className='spot-reviews'>
                <div className='review-header'>
                    <div className='review-header-left'>
                    <i className="fa-solid fa-star" style={{ fontSize: '15px' }}></i>
                    <span style={{ fontSize: '21px', marginLeft: '10px' }} className='spot-info-under-name-text'>{spot.avgStarRating}</span>
                    <span className='dot-2'>.</span>
                    <span style={{ fontWeight: '350', fontSize: '21px' }} className='spot-info-under-name-text'>{spot.numReviews} reviews</span>
                    </div>
                    {isLoaded && user && spot?.ownerId !== user.id && !reviewIdsArray.includes(user.id) &&
                        <div className='link-to-review-form' onClick={() => setShowReviewModal(true)}>
                            <span>Write a review</span>
                        </div>
                    }
                </div>
                {isLoaded && !!reviewsArray.length && reviewsArray.map((review) => (
                    <div key={review.id} className='each-review'>
                        <div className='each-review-top'>
                            <div className='each-rev-top-left'>
                            <div className='profile-img-wrapper'>
                                <i className="fa-regular fa-circle-user" style={{ fontSize: '35px', color: 'grey' }}></i>
                            </div>
                            <div className='review-top-text'>
                                <span style={{ fontWeight: '600', marginLeft: '10px', marginTop: '-2px' }} className='review-user-name-date'>{review.User.firstName}</span>
                                <span style={{ marginLeft: '10px', fontWeight: '300', color: 'gray' }}>{dateArray(review.createdAt)}</span>
                            </div>
                            </div>
                            {!!user && review?.userId === user.id && <div id={review.id} key={review.id} className='delete-review-button' onClick={(e) => handleDeleteReview(e)}>
                                <span id={review.id} key={review.id}>Delete</span>
                            </div>}
                        </div>
                        <div className='each-review-bottom'>
                            <p>{review.review}</p>
                        </div>
                    </div>
                ))}
            </div>
            {showReviewModal && (
                    <Modal onClose={() => setShowReviewModal(false)}>
                        <ReviewForm />
                    </Modal>
                )}
        </div>
    )
}


export default SpotDetails;
