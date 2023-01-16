import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
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
import { clearBookings, getBookings, getBookingsThunk, getSpotBookingsThunk, postBookingThunk } from '../../store/bookings';

const SpotDetails = () => {
    const history = useHistory();
    const { showReviewModal, setShowReviewModal } = useModalContext();
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots);
    const reviews = useSelector(state => state.reviews);
    const user = useSelector(state => state.session.user);
    const reviewsArray = Object.values(reviews);
    const reviewIdsArray = reviewsArray.map(review => review.userId);
    const allBookings = useSelector(state => state.bookings?.allBookings?.Bookings);
    const spotBookings = useSelector(state => state.bookings?.spotBookings?.Bookings);
    const [isLoaded, setIsLoaded] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [startDate, setStartDate] = useState('Add date');
    const [endDate, setEndDate] = useState('Add date');
    const [selectedDates, setSelectedDates] = useState('');
    const [numNights, setNumNights] = useState('Select dates');
    const [numNightsPrice, setNumNightsPrice] = useState(1);
    const [travelDates, setTravelDates] = useState('Add travel dates for exact pricing');
    const [isConfirmation, setIsConfirmation] = useState(false);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const months = { '01': 'January', '2': 'February', '3': 'March', '4': 'April', '5': 'May', '6': 'June', '7': 'July', '8': 'August', '9': 'September', '10': 'October', '11': 'November', '12': 'December' }

    const dateArray = (date) => {
        const newDate = date.split('-')
        return `${months[newDate[1].toString()]} ${newDate[0]}`
    }

    const totalPrice = ((spot.price * numNightsPrice) + (spot.price / 5) + (spot.price / 4))

    useEffect(() => {
        dispatch(clearBookings());
        dispatch(getSpot(spotId));
        dispatch(getReviews(spotId));
        dispatch(getBookingsThunk());
        dispatch(getSpotBookingsThunk(spotId));
    }, [dispatch, user])

    useEffect(() => {
        const yearPrevArrow = document.getElementsByClassName('react-calendar__navigation__prev2-button')[0]
        const yearNextArrow = document.getElementsByClassName('react-calendar__navigation__next2-button')[0]
        const monthPrevArrow = document.getElementsByClassName('react-calendar__navigation__prev-button')[0]
        const monthNextArrow = document.getElementsByClassName('react-calendar__navigation__next-button')[0]
        const calendarNavigationLabel = document.getElementsByClassName('react-calendar__navigation__label')[0]
        if (yearPrevArrow) {
            yearPrevArrow.classList.add('invisible-arrow')
        }
        if (yearNextArrow) {
            yearNextArrow.classList.add('invisible-arrow')
        }
        if (monthPrevArrow) {
            monthPrevArrow.setAttribute('id', 'month-arrows')
        }
        if (monthNextArrow) {
            monthNextArrow.setAttribute('id', 'month-arrows')
        }
        if (calendarNavigationLabel) {
            calendarNavigationLabel.style.backgroundColor = 'white'
        }
        if (endDate == 'Add date') {
            handleClearDates()
        }
    }, [calendarOpen])

    useEffect(() => {
        if (selectedDates[1]) {
            setEndDate(selectedDates[1].toLocaleDateString())
            // console.log(startDate, 'START DATE')
        }
    }, [selectedDates])

    useEffect(() => {
        if (selectedDates) {
            setTravelDates(`${startDate} - ${endDate}`)
            const timeDifference = new Date(startDate).getTime() - new Date(endDate).getTime()
            const dayDifference = Math.abs(timeDifference / (1000 * 3600 * 24))
            setNumNights(`${Math.round(dayDifference)} ${dayDifference == 1 ? 'night' : 'nights'}`)
            setNumNightsPrice(Math.round(dayDifference))
        }
        // console.log(typeof endDate, 'END DATE')
    }, [endDate])

    useEffect(() => {
        const priceForm = document.getElementsByClassName('price-form')[0];
        const updateButton = document.getElementsByClassName('up-del-actual-buttons')[0];
        const reservationDates = document.getElementsByClassName('reservation-dates')[0];
        if(priceForm && updateButton) {
            priceForm.setAttribute('id', 'fit-content');
            reservationDates.classList.add('negative-zindex');
        } else if(priceForm && reservationDates) {
            priceForm.removeAttribute('id');
            reservationDates.classList.remove('negative-zindex');
        }
    }, [isLoaded, user])

    setTimeout(() => setIsLoaded(true), 600)

    const handleDeleteClick = async (e) => {
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

    const handleClearDates = (e) => {
        setStartDate('Add date')
        setEndDate('Add date')
        setNumNights('Select dates')
        setNumNightsPrice(1)
        setTravelDates('Add travel dates for exact pricing')
        setSelectedDates('')
    }

    const handleOpenCalendar = (e) => {
        setCalendarOpen(true);
        // const calendarContainer = document.getElementsByClassName('price-form')[0];
        // calendarContainer.scrollIntoView();
        document.addEventListener('click', () => {
            setCalendarOpen(false);
        })
    }

    const handleDemoButton = (e) => {
        e.preventDefault();

        return dispatch(sessionActions.login({credential: 'Demo-lition', password: 'password'}))
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
      }

    const parseDate = (date) => {
        const year = date.split('/')[2];
        const month = date.split('/')[0];
        const day = date.split('/')[1];
        return `${year}-${month}-${day}`;
    }

    const handleConfirmReservation = async (e) => {
        const start = parseDate(startDate);
        const end = parseDate(endDate);
        const booking = {startDate: start, endDate: end};
        await dispatch(postBookingThunk(spotId, booking));
        await history.push('/trips');
    }

    const today = new Date()

    if (!Object.values(spot).length) return null;

    if (!spot.SpotImages) return null;

    if (!allBookings || !spotBookings) return null;

    if(!isConfirmation) return (
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
                        <span style={{
                            marginLeft: '4px', fontWeight: '250',
                            maxWidth: '500px', maxHeight: '20px', overflow: 'hidden'
                        }} className='spot-info-under-name-text'>{spot?.city}, {spot?.state}, {spot?.country}</span>
                    </div>
                    {isLoaded && !!user && spot?.Owner?.id === user?.id && <div className='update-delete-buttons'>
                        <span className='up-del-actual-buttons' onClick={(e) => handleUpdateClick(e)} style={{ cursor: 'pointer' }}>Update</span>
                        <span className='up-del-actual-buttons' onClick={(e) => handleDeleteClick(e)} style={{ cursor: 'pointer' }}>Delete</span>
                    </div>}

                </div>
            </div>
            <div className='spot-details-images'>
                <div className='img-1-container'>
                    {!isLoaded && <Skeleton
                        style={{ height: '400px', minWidth: '80%', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' }}
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
                        style={{ borderTopRightRadius: '12px' }}
                    /></div>}
                    {isLoaded && spot?.SpotImages && spot?.SpotImages[2] &&
                        <img className='img-3' alt='img3' src={spot?.SpotImages[2].url} />
                    }
                    {isLoaded && !spot?.SpotImages[2] && <div className='img-3'></div>}
                    {!isLoaded && <div className='img-4'><Skeleton height='100%' /></div>}
                    {isLoaded && spot?.SpotImages && spot?.SpotImages[3] &&
                        <img className='img-4' alt='img4' src={spot?.SpotImages[3].url} />
                    }
                    {isLoaded && !spot?.SpotImages[3] && <div className='img-4'></div>}
                    {!isLoaded && <div className='img-5'><Skeleton height='100%'
                        style={{ borderBottomRightRadius: '12px' }}
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
                        style={{ flexDirection: 'column' }}
                    >
                        <img
                            id='airCover'
                            alt='airCover' src={airCover}
                        />
                        <div className='spot-description-text'
                            style={{ marginTop: '5px' }}
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
                                                style={{ fontSize: '23px', fontWeight: '500' }}
                                            >${spot.price}</span>
                                        </div>
                                        <div className='right-ppn'>
                                            <span
                                                style={{ fontWeight: '300', marginBottom: '2px' }}
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
                            {isLoaded && user && spot?.Owner?.id === user?.id && (
                                <div className='cannot-book-own-spot'>
                                    <span>* Hosts cannot book their own listings</span>
                                </div>
                            )}
                            {isLoaded && (<div className='reservation-dates'>
                                <div className='check-in-check-out'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenCalendar();
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
                                                        if (startDate == 'Add date') {
                                                            setStartDate(value.toLocaleDateString())
                                                        }
                                                        if (selectedDates[1]) {
                                                            setStartDate(value.toLocaleDateString())
                                                            setEndDate('Add date')
                                                            setNumNights('Select dates')
                                                            setNumNightsPrice(1)
                                                            setTravelDates('Add travel dates for exact pricing')
                                                            setSelectedDates('')
                                                        }
                                                    }}
                                                    tileDisabled={({ a, date, c }) => {
                                                        const startDateToJSON = new Date(startDate)
                                                        // console.log(startDateToJSON, 'JSON START DATE')
                                                        if (date.toJSON() < today.toJSON() || ((startDate !== 'Add date') && date.toJSON() < startDateToJSON.toJSON())) {
                                                            // console.log(date.toJSON(), 'DATE IN CALENDAR')
                                                            return true
                                                        }
                                                        for(let booking of Object.values(allBookings)) {
                                                            let start = booking.startDate
                                                            let end = booking.endDate
                                                            if(date.toJSON() == start || date.toJSON() == end || (date.toJSON() > start && date.toJSON() < end)) {
                                                                return true
                                                            }
                                                        }
                                                        for(let booking of Object.values(spotBookings)) {
                                                            let start = booking.startDate
                                                            let end = booking.endDate
                                                            if(date.toJSON() == start || date.toJSON() == end || (date.toJSON() > start && date.toJSON() < end)) {
                                                                return true
                                                            }
                                                        }
                                                    }}
                                                />
                                                <div className='calendar-clear-and-close'>
                                                    <span id='clear-dates'
                                                        onClick={() => {
                                                            handleClearDates()
                                                        }}
                                                    >Clear dates</span>
                                                    <span id='close-calendar'
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            setCalendarOpen(false)
                                                        }}
                                                    >{endDate == 'Add date' ? 'Close' : 'Ok'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div id='reserve-button'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if(!selectedDates[1]) {
                                        handleOpenCalendar()
                                    } else {
                                        setIsConfirmation(true);
                                        window.scrollTo(0, 0)
                                    }
                                }}
                                >
                                    <span id='reserve-button-text'>{selectedDates[1] ? 'Reserve' : 'Check Availability'}</span>
                                </div>
                            </div>)}
                            <div className='third-pf'>
                                {isLoaded &&
                                    <div style={{ width: '100%' }}>
                                        <div className='seven-nights'>
                                            <span
                                                style={{ textDecoration: 'underline' }}
                                            >${spot.price} x {numNightsPrice} {numNightsPrice == 1 ? 'night' : 'nights'}</span>
                                            <span>${spot.price * numNightsPrice}</span>
                                        </div>
                                        <div className='seven-nights'>
                                            <span
                                                style={{ textDecoration: 'underline' }}
                                            >Cleaning fee</span>
                                            <span>${(spot.price / 5).toFixed(0)}</span>
                                        </div>
                                        <div className='seven-nights'>
                                            <span
                                                style={{ textDecoration: 'underline' }}
                                            >Service fee</span>
                                            <span>${(spot.price / 4).toFixed(0)}</span>
                                        </div>
                                    </div>}
                            </div>
                            <div className='second-pf'
                                style={{ marginTop: '5px' }}
                            ></div>
                            {isLoaded &&
                                <div className='total'>
                                    <span>Total</span>
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

    if(isConfirmation) return (
        <div className='confirmation-page-container'>
            <div className='confirmation-page-wrapper'>
                <div className='confirmation-page-inner-wrapper'>
                    <div className='confirm-and-pay-wrapper'>
                        <i className="fa-solid fa-chevron-left" id='confirm-and-pay-prev-arrow'
                        onClick={() => {setIsConfirmation(false)}}
                        />
                        <span id='confirm-and-pay-text'>Confirm and pay</span>
                    </div>
                    <div className='confirmation-page-middle-wrapper'>
                        <div className='confirmation-page-middle-left-wrapper'>
                            <span id='your-trip'>Your trip</span>
                            <div className='your-trip-dates'>
                                <div className='your-trip-dates-left'>
                                    <span id='your-trip-dates-title'>Dates</span>
                                    <span id='your-trip-dates-dates'>{travelDates}</span>
                                </div>
                                <span id='your-trip-edit' className='up-del-actual-buttons'
                                onClick={async (e) => {
                                    e.stopPropagation()
                                    await setIsConfirmation(false)
                                    const checkIn = document.getElementsByClassName('check-in-date')[0];
                                    await checkIn.scrollIntoView();
                                    await setCalendarOpen(true);
                                }}
                                >Edit</span>
                            </div>
                            <div className='your-trip-dates' id='your-trip-nights'>
                                <div className='your-trip-dates-left'>
                                    <span id='your-trip-dates-title'>Nights</span>
                                    <span id='your-trip-dates-dates'>{numNights}</span>
                                </div>
                            </div>
                            {user && (
                                <div id='confirm-registration'
                                onClick={handleConfirmReservation}
                                >Confirm Reservation</div>
                            )}
                            {!user && (
                                <form className='log-in-to-book-container'
                                onSubmit={(e) => handleSubmit(e)}
                                >
                                    <span id='log-in-to-book-text'>Log in to book</span>
                                    <div className='log-in-to-book-input-div'>
                                        <label htmlFor='username' className='log-in-to-book-labels'>Username or Email</label>
                                        <input id='log-in-to-book-username'
                                        name='username'
                                        value={credential}
                                        onChange={(e) => setCredential(e.target.value)}
                                        required
                                        ></input>
                                        <label htmlFor='password'
                                        className='log-in-to-book-labels'
                                        id='log-in-to-book-labels-password'
                                        >Password</label>
                                        <input id='log-in-to-book-password'
                                        name='password'
                                        type='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        ></input>
                                    </div>
                                    {errors[0] &&
                                        <div className='error-div' id='confirmation-page-errors'>
                                            {errors[0]}
                                        </div>}
                                    <button id='log-in-to-book-submit' type='submit'>Continue</button>
                                    <div className='or' id='log-in-to-book-or'>
                                        <div className='or-sides'>
                                        </div>
                                        <span style={{ fontSize: '12px', color: 'gray', fontWeight: '250' }}>or</span>
                                        <div className='or-sides'></div>
                                    </div>
                                    <div id='log-in-to-book-demo'
                                    onClick={(e) => handleDemoButton(e)}
                                    >Continue as demo user</div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
                <div className='price-details-wrapper'>
                    <div className='price-details-inner-wrapper'>
                        <div className='price-details-top'>
                            <img alt={spot.name} src={spot.SpotImages[0].url} id='price-details-top-img'/>
                            <div className='price-details-top-right'>
                                <div className='price-details-top-right-top'>
                                    <span id='price-details-spot-name'>{spot.name}</span>
                                    <span id='price-details-spot-location'>{spot.city}, {spot.state}</span>
                                </div>
                                <div className='price-details-reviews'>
                                    <i className="fa-solid fa-star" style={{marginRight: '3px', fontSize: '10px'}}></i>
                                    <span>{spot.avgStarRating}</span>
                                    <span id='price-details-num-reviews'>({spot.numReviews} {spot.numReviews == 1 ? 'review' : 'reviews'})</span>
                                </div>
                            </div>
                        </div>
                            <span id='price-details-text'>Price Details</span>
                        <div className='third-pf'>
                                {isLoaded &&
                                    <div style={{ width: '100%' }}>
                                        <div className='seven-nights'>
                                            <span
                                                style={{ textDecoration: 'underline' }}
                                            >${spot.price} x {numNightsPrice} {numNightsPrice == 1 ? 'night' : 'nights'}</span>
                                            <span>${spot.price * numNightsPrice}</span>
                                        </div>
                                        <div className='seven-nights'>
                                            <span
                                                style={{ textDecoration: 'underline' }}
                                            >Cleaning fee</span>
                                            <span>${(spot.price / 5).toFixed(0)}</span>
                                        </div>
                                        <div className='seven-nights'>
                                            <span
                                                style={{ textDecoration: 'underline' }}
                                            >Service fee</span>
                                            <span>${(spot.price / 4).toFixed(0)}</span>
                                        </div>
                                    </div>}
                            </div>
                            <div className='second-pf' id='price-details-second-pf'
                                style={{ marginTop: '5px' }}
                            ></div>
                            {isLoaded &&
                                <div className='total'>
                                    <span>Total</span>
                                    <span>${totalPrice.toFixed(0)}</span>
                                </div>
                            }
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SpotDetails;
