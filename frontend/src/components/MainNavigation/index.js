import React from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';
import './MainNavigation.css';
import { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import LoginFormPage from '../LoginFormPage/LoginFormPage';
import logo from '../../assets/airLogo.png';
import SignupFormPage from '../SignupFormPage/SignupFormPage';
import useModalContext from '../../context/ShowModalContext';
import allRegionsMap from '../../assets/allRegionsMap.png';
import california from '../../assets/california.png';
import newYork from '../../assets/newYork.png';
import florida from '../../assets/florida.png';
import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle';

function MainNavigation({ isLoaded }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const {searchParams} = useParams();
    const { showModal, setShowModal, showSUModal, setShowSUModal } = useModalContext();
    const sessionUser = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);
    const [showMainNavSearch, setShowMainNavSearch] = useState(false);
    const [searchBarStatus, setSearchBarStatus] = useState('where');
    const [searchLocation, setSearchLocation] = useState('');
    const [startDate, setStartDate] = useState('Add date');
    const [endDate, setEndDate] = useState('Add date');
    const [selectedDates, setSelectedDates] = useState('');
    const [numNights, setNumNights] = useState('Select dates');
    const [numNightsPrice, setNumNightsPrice] = useState(1);
    const [travelDates, setTravelDates] = useState('Add dates');

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const handleClearDates = (e) => {
        setStartDate('Add date')
        setEndDate('Add date')
        setNumNights('Select dates')
        setNumNightsPrice(1)
        setTravelDates('Add dates')
        setSelectedDates('')
    }

    function getNumNights(start, end) {
        const startDate = `${start.split('-')[1]}/${start.split('-')[2]}/${start.split('-')[0]}`
        const endDate = `${end.split('-')[1]}/${end.split('-')[2]}/${end.split('-')[0]}`

        const timeDifference = new Date(startDate).getTime() - new Date(endDate).getTime()
        const dayDifference = Math.abs(timeDifference / (1000 * 3600 * 24))

        return Math.round(dayDifference);
    }

    const today = new Date();

    useEffect(() => {
        if (searchBarStatus == 'dates') {
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
        }
    }, [searchBarStatus])

    useEffect(() => {
        if (selectedDates[1]) {
            setEndDate(selectedDates[1].toLocaleDateString())
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
    }, [endDate])

    useEffect(() => {
        const whereDiv = document.getElementsByClassName('opened-search-bar-where')[0];
        const datesDiv = document.getElementsByClassName('opened-search-bar-dates')[0];
        const openedSearchBarBoxContainer = document.getElementsByClassName('opened-search-bar-box-container')[0]
        if (whereDiv && datesDiv) {
            if (searchBarStatus == 'where') {
                whereDiv.setAttribute('id', 'opened-search-bar-focus');
                datesDiv.removeAttribute('id');
                datesDiv.setAttribute('id', 'opened-search-bar-no-focus');
                if (openedSearchBarBoxContainer) {
                    openedSearchBarBoxContainer.classList.remove('opened-search-bar-box-container-new-height');
                }
            }
            if (searchBarStatus == 'dates') {
                datesDiv.setAttribute('id', 'opened-search-bar-focus');
                whereDiv.removeAttribute('id');
                whereDiv.setAttribute('id', 'opened-search-bar-no-focus');
                if (openedSearchBarBoxContainer) {
                    openedSearchBarBoxContainer.classList.add('opened-search-bar-box-container-new-height');
                }
            }
        }
    }, [searchBarStatus])

    useEffect(() => {
        if (!showMainNavSearch) {
            setSearchBarStatus('where');
        }
    }, [showMainNavSearch])

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    useEffect(() => {
        const mainFormDivInner = document.getElementsByClassName('main-form-div-inner')[0];
        const searchResultsPageContainer = document.getElementsByClassName('search-results-page-container')[0];
        if(mainFormDivInner && searchParams) {
            mainFormDivInner.setAttribute('id', 'search-results-top-nav');
        } else {
            mainFormDivInner.removeAttribute('id');
        }
    }, [searchParams])

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <div onClick={openMenu} className='menu-user'>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '2px' }}>
                        <i style={{ paddingRight: '5px' }} className="fa-solid fa-bars"></i>
                        <div className='user-icon-div'>
                            <i style={{ color: 'white' }} className="fa-solid fa-user"></i>
                        </div>
                    </div>
                    {showMenu && (
                        <div className='profile-dropdown'
                            style={{ marginRight: '5rem', width: '150px' }}
                        >
                            <div id='login-div' onClick={() => setShowModal(true)} className='profile-dropdown-text-divs'>
                                Login
                            </div>
                            <div id='sign-up-div' onClick={() => setShowSUModal(true)} className='profile-dropdown-text-divs'>
                                Sign Up
                            </div>
                        </div>
                    )
                    }
                </div>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <LoginFormPage />
                    </Modal>
                )}
                {showSUModal && (
                    <Modal onClose={() => setShowSUModal(false)}>
                        <SignupFormPage />
                    </Modal>
                )}
            </>
        );
    }

    return (
        <div className='navMain-container'>
            <div className='main-form-div-inner'>
                <div className='home-container'>
                    <NavLink exact to="/"
                        style={{ display: 'flex' }}
                    >
                        <img alt='logo' className='logo' src={logo} />
                    </NavLink>
                </div>
                <div className='search-bar-container' onClick={() => setShowMainNavSearch(true)}>
                    <div className='search-bar-inner-wrapper'>
                        <span className='search-bar-inner-thirds'>
                            Anywhere
                        </span>
                        <span className='search-bar-inner-thirds'>
                            Any week
                        </span>
                        <span className='search-bar-inner-thirds-last'>
                            Search
                        </span>
                        <div className='search-bar-inner-search-button'>
                            <i className="fa-solid fa-magnifying-glass" id='search-bar-inner-search-icon' />
                        </div>
                    </div>
                </div>
                {isLoaded && sessionLinks}
            </div>
            {showMainNavSearch && (
                <Modal onClose={() => {
                    setShowMainNavSearch(false);
                    setSearchLocation('');
                    handleClearDates();
                }}>
                    <div className='navMain-container' id='opened-navMain-container'>
                        <div className='main-form-div-inner'>
                            <div className='home-container'>
                                <NavLink exact to="/"
                                    style={{ display: 'flex' }}
                                >
                                    <img alt='logo' className='logo' src={logo} />
                                </NavLink>
                            </div>
                            {isLoaded && sessionLinks}
                        </div>
                        <div className='opened-search-bar-container'>
                            <div className='opened-search-bar-where' id='opened-search-bar-focus' onClick={() => setSearchBarStatus('where')}>
                                <div className='opened-search-bar-where-inner'>
                                    <span id='opened-search-bar-where-label'>Where</span>
                                    <input id='opened-search-bar-where-input' placeholder='Search destinations' autoFocus
                                        value={searchLocation}
                                        onChange={(e) => setSearchLocation(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <div className='opened-search-bar-separator'></div>
                            <div className='opened-search-bar-dates' id='opened-search-bar-no-focus' onClick={() => setSearchBarStatus('dates')}>
                                <div className='opened-search-bar-where-inner'>
                                    <span id='opened-search-bar-where-label'>Dates</span>
                                    <span id='opened-search-bar-dates-dates'>{travelDates}</span>
                                </div>
                            </div>
                            <div className='opened-search-bar-separator'></div>
                            <div className='opened-search-bar-search-button'
                            onClick={() => {
                                history.push(`/search/${searchLocation ? searchLocation : 'Anywhere'}`);
                                setShowMainNavSearch(false);
                            }}
                            >
                                <div className='opened-search-bar-search-button-inner'>
                                    <i className="fa-solid fa-magnifying-glass" id='opened-search-bar-search-icon' />
                                    <span id='opened-search-bar-search-button-text'>Search</span>
                                </div>
                            </div>
                            <div className='opened-search-bar-box-container'>
                                {searchBarStatus == 'where' && (<div className='opened-search-bar-box-inner'>
                                    <div className='opened-search-bar-box-suggested-div'>
                                        <span id='suggested-searches'>Suggested searches</span>
                                        <div className='suggested-searches-cards'
                                            onClick={() => setSearchLocation('Miami')}
                                        >
                                            <div id='suggested-searches-icon'>
                                                <i className='fa-regular fa-clock' id='suggested-searches-icon-icon' />
                                            </div>
                                            <div className='suggested-searches-text-div'>
                                                <span id='suggested-searches-state-name'>Miami</span>
                                                <span id='suggested-searches-any-week'>Any week</span>
                                            </div>
                                        </div>
                                        <div className='suggested-searches-cards'
                                            onClick={() => setSearchLocation('San Fransisco')}
                                        >
                                            <div id='suggested-searches-icon'>
                                                <i className='fa-regular fa-clock' id='suggested-searches-icon-icon' />
                                            </div>
                                            <div className='suggested-searches-text-div'>
                                                <span id='suggested-searches-state-name'>San Fransisco</span>
                                                <span id='suggested-searches-any-week'>Any week</span>
                                            </div>
                                        </div>
                                        <div className='suggested-searches-cards'
                                            onClick={() => setSearchLocation('Los Angeles')}
                                        >
                                            <div id='suggested-searches-icon'>
                                                <i className='fa-regular fa-clock' id='suggested-searches-icon-icon' />
                                            </div>
                                            <div className='suggested-searches-text-div'>
                                                <span id='suggested-searches-state-name'>Los Angeles</span>
                                                <span id='suggested-searches-any-week'>Any week</span>
                                            </div>
                                        </div>
                                        <div className='suggested-searches-cards'
                                            onClick={() => setSearchLocation('Santa Barbara')}
                                        >
                                            <div id='suggested-searches-icon'>
                                                <i className='fa-regular fa-clock' id='suggested-searches-icon-icon' />
                                            </div>
                                            <div className='suggested-searches-text-div'>
                                                <span id='suggested-searches-state-name'>Santa Barbara</span>
                                                <span id='suggested-searches-any-week'>Any week</span>
                                            </div>
                                        </div>
                                        <div className='suggested-searches-cards'
                                            onClick={() => setSearchLocation('Santa Cruz')}
                                        >
                                            <div id='suggested-searches-icon'>
                                                <i className='fa-regular fa-clock' id='suggested-searches-icon-icon' />
                                            </div>
                                            <div className='suggested-searches-text-div'>
                                                <span id='suggested-searches-state-name'>Santa Cruz</span>
                                                <span id='suggested-searches-any-week'>Any week</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='opened-search-bar-box-region-div'>
                                        <span id='suggested-searches'>Search by region</span>
                                        <div className='opened-search-bar-box-region-cards-wrapper'>
                                            <div className='opened-search-bar-box-region-cards'>
                                                <img alt='allRegions' src={allRegionsMap} id='opened-search-bar-box-region-cards-img'
                                                    onClick={() => setSearchLocation('Anywhere')}
                                                />
                                                <span id='opened-search-bar-box-region-img-label'>I'm flexible</span>
                                            </div>
                                            <div className='opened-search-bar-box-region-cards'>
                                                <img alt='allRegions' src={california} id='opened-search-bar-box-region-cards-img'
                                                    onClick={() => setSearchLocation('California')}
                                                />
                                                <span id='opened-search-bar-box-region-img-label'>California</span>
                                            </div>
                                            <div className='opened-search-bar-box-region-cards'>
                                                <img alt='allRegions' src={newYork} id='opened-search-bar-box-region-cards-img'
                                                    onClick={() => setSearchLocation('New York')}
                                                />
                                                <span id='opened-search-bar-box-region-img-label'>New York</span>
                                            </div>
                                            <div className='opened-search-bar-box-region-cards'>
                                                <img alt='allRegions' src={florida} id='opened-search-bar-box-region-cards-img'
                                                    onClick={() => setSearchLocation('Florida')}
                                                />
                                                <span id='opened-search-bar-box-region-img-label'>Florida</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>)}
                                {searchBarStatus == 'dates' && (
                                    <div>
                                        <div className='calendar-container' id='opened-search-bar-box-dates-container'>
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
                                                            setTravelDates('Add dates')
                                                            setSelectedDates('')
                                                        }
                                                    }}
                                                    tileDisabled={({ a, date, c }) => {
                                                        const startDateToJSON = new Date(startDate)
                                                        // console.log(startDateToJSON, 'JSON START DATE')
                                                        if (date.toJSON() < today.toJSON() || ((startDate !== 'Add date') && date.toJSON() < startDateToJSON.toJSON())) {
                                                            return true
                                                        }
                                                    }}
                                                />
                                                <div className='calendar-clear-and-close'>
                                                    <span id='clear-dates'
                                                        onClick={() => {
                                                            handleClearDates()
                                                        }}
                                                    >Clear dates</span>
                                                    {/* <span id='close-calendar'
                                                                            onClick={(e) => {
                                                                                e.stopPropagation()
                                                                                if(editingDate) {
                                                                                    handleConfirmReservation(booking.id)
                                                                                }
                                                                            }}
                                                                            style={{width: '80px'}}
                                                                        >{editingDate ? 'Confirm' : 'Cancel'}</span> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default MainNavigation;
