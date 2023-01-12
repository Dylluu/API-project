import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { deleteBookingThunk, editBookingThunk, getBookingsThunk, getSpotBookingsThunk } from '../../store/bookings';
import { getReviews } from '../../store/reviews';
import { getSpots } from '../../store/spots';
import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle';
import './ReservationCards.css';

function ReservationCards ({spotId, booking}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const spots = useSelector(state => state.spots);
    const spot = Object.values(spots).find(spot => spot.id == spotId);
    const allBookings = useSelector(state => state.bookings?.allBookings?.Bookings);
    const spotBookings = useSelector(state => state.bookings?.spotBookings?.Bookings);
    const [showEditBookingModal, setShowEditBookingModal] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [startDate, setStartDate] = useState('Add date');
    const [endDate, setEndDate] = useState('Add date');
    const [selectedDates, setSelectedDates] = useState('');
    const [numNights, setNumNights] = useState('Select dates');
    const [numNightsPrice, setNumNightsPrice] = useState(1);
    const [travelDates, setTravelDates] = useState('Add travel dates for exact pricing');
    const [editingDate, setEditingDate] = useState(false);
    const months = {'01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'June', '07': 'July', '08': 'Aug', '09': 'Sept', 10: 'Oct', 11: 'Nov', 12: 'Dec'};

    useEffect(() => {
        dispatch(getSpots());
        dispatch(getBookingsThunk());
        dispatch(getSpotBookingsThunk(spotId));
    }, [dispatch])

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
        setSelectedDates([new Date(parseDateMDY(booking.startDate)), new Date(parseDateMDY(booking.endDate))])
    }, [showEditBookingModal])

    useEffect(() => {
        if (selectedDates[1]) {
            setEndDate(selectedDates[1].toLocaleDateString())
            setStartDate(selectedDates[0].toLocaleDateString())
            setEditingDate(true);
            // console.log(startDate, 'START DATE')
        } else {
            setEditingDate(false);
        }
    }, [selectedDates])

    useEffect(() => {
        if (selectedDates[1]) {
            setTravelDates(`${startDate} - ${endDate}`)
            const timeDifference = new Date(startDate).getTime() - new Date(endDate).getTime()
            const dayDifference = Math.abs(timeDifference / (1000 * 3600 * 24))
            setNumNights(`${Math.round(dayDifference)} ${dayDifference == 1 ? 'night' : 'nights'}`)
            setNumNightsPrice(Math.round(dayDifference))
        }
        // console.log(typeof endDate, 'END DATE')
    }, [endDate])

    function parseDate (date) {
        const year = date.split('-')[0];
        const month = date.split('-')[1];
        const day = date.split('-')[2];

        return `${months[month]} ${day}`
    }

    function getNumNights (start, end) {
        const startDate = `${start.split('-')[1]}/${start.split('-')[2]}/${start.split('-')[0]}`
        const endDate = `${end.split('-')[1]}/${end.split('-')[2]}/${end.split('-')[0]}`

        const timeDifference = new Date(startDate).getTime() - new Date(endDate).getTime()
        const dayDifference = Math.abs(timeDifference / (1000 * 3600 * 24))

        return Math.round(dayDifference);
    }

    const handleClearDates = (e) => {
        setStartDate('Add date')
        setEndDate('Add date')
        setNumNights('Select dates')
        setNumNightsPrice(1)
        setTravelDates('Add travel dates for exact pricing')
        setSelectedDates('')
    }

    const parseDateMDY = (date) => {
        const month = date.split('-')[1];
        const day = date.split('-')[2];
        const year = date.split('-')[0];
        return `${month}-${day}-${year}`;
    }

    const parseDateEdit = (date) => {
        const year = date.split('/')[2];
        const month = date.split('/')[0];
        const day = date.split('/')[1];
        return `${year}-${month}-${day}`;
    }

    const handleConfirmReservation = async (bookingId) => {
        const start = parseDateEdit(startDate);
        const end = parseDateEdit(endDate);
        const booking = {startDate: start, endDate: end};
        await dispatch(editBookingThunk(bookingId, booking));
        await dispatch(getBookingsThunk());
        await dispatch(getSpotBookingsThunk(spotId));
    }

    const today = new Date()

    if(!spots) return null

    if(!spot || !spot.previewImage) return null;

    return (
        <div className='reservation-cards-wrapper'>
            <div className='reservation-cards-left'>
                <div className='reservation-cards-left-inner'>
                    <div className='reservation-cards-left-top'>
                        <span id='reservation-cards-spot-name'>{spot?.name}</span>
                        <span id='reservation-cards-spot-location'>{spot?.city}, {spot?.state}</span>
                    </div>
                    <div className='reservation-cards-left-bottom'>
                        <div className='reservation-cards-left-bottom-left'>
                            <div className='reservation-cards-left-bottom-left-inner'>
                                <span className='reservation-cards-dates-and-nights'>Dates</span>
                                <span id='reservation-cards-dates'>{parseDate(booking.startDate)} - {parseDate(booking.endDate)}</span>
                                <span className='reservation-cards-dates-and-nights'>Nights</span>
                                <span id='reservation-cards-dates'>{getNumNights(booking.startDate, booking.endDate)} {getNumNights(booking.startDate, booking.endDate) == 1 ? 'night' : 'nights'}</span>
                                <div className='reservation-cards-edit-and-cancel'>
                                    <span className='up-del-actual-buttons' id='edit-and-cancel-buttons'
                                    onClick={() => setShowEditBookingModal(true)}
                                    >Edit</span>
                                    <span className='up-del-actual-buttons' id='edit-and-cancel-buttons'
                                    onClick={() => {
                                        dispatch(deleteBookingThunk(booking.id))
                                        history.go(0)
                                    }}
                                    >Cancel</span>
                                </div>
                            </div>
                        </div>
                        <div className='reservation-cards-left-bottom-right'>
                            <div className='reservation-cards-left-bottom-right-inner'>
                                <p id='reservation-cards-spot-description'>{spot?.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img id='reservation-cards-spot-image' alt={spotId} src={spot?.previewImage}
            onClick={() => history.push(`/spots/${spotId}`)}
            />
            {showEditBookingModal && <Modal onClose={() => setShowEditBookingModal(false)}>
                <div>
                <div className='calendar-container' id='edit-booking-container'>
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
                                                        // for(let booking of Object.values(allBookings)) {
                                                        //     let start = booking.startDate
                                                        //     let end = booking.endDate
                                                        //     if(date.toJSON() == start || date.toJSON() == end || (date.toJSON() > start && date.toJSON() < end)) {
                                                        //         return true
                                                        //     }
                                                        // }
                                                        // for(let booking of Object.values(spotBookings)) {
                                                        //     let start = booking.startDate
                                                        //     let end = booking.endDate
                                                        //     if(date.toJSON() == start || date.toJSON() == end || (date.toJSON() > start && date.toJSON() < end)) {
                                                        //         return true
                                                        //     }
                                                        // }
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
                                                            setShowEditBookingModal(false)
                                                            if(editingDate) {
                                                                handleConfirmReservation(booking.id)
                                                            }
                                                        }}
                                                        style={{width: '80px'}}
                                                    >{editingDate ? 'Confirm' : 'Cancel'}</span>
                                                </div>
                                            </div>
                                        </div>
                </div>
            </Modal>}
        </div>
    )
}

export default ReservationCards;
