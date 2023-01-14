import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';
import './MainNavigation.css';
import { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import LoginFormPage from '../LoginFormPage/LoginFormPage';
import logo from '../../assets/airLogo.png';
import SignupFormPage from '../SignupFormPage/SignupFormPage';
import useModalContext from '../../context/ShowModalContext';

function MainNavigation({ isLoaded }) {
    const {showModal, setShowModal, showSUModal, setShowSUModal} = useModalContext();
    const sessionUser = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);
    const [showMainNavSearch, setShowMainNavSearch] = useState(false);
    const [searchBarStatus, setSearchBarStatus] = useState('where');

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        const whereDiv = document.getElementsByClassName('opened-search-bar-where')[0];
        const datesDiv = document.getElementsByClassName('opened-search-bar-dates')[0];
        if(whereDiv && datesDiv) {
            if(searchBarStatus == 'where') {
                whereDiv.setAttribute('id', 'opened-search-bar-focus');
                datesDiv.removeAttribute('id');
                datesDiv.setAttribute('id', 'opened-search-bar-no-focus');
            }
            if(searchBarStatus == 'dates') {
                datesDiv.setAttribute('id', 'opened-search-bar-focus');
                whereDiv.removeAttribute('id');
                whereDiv.setAttribute('id', 'opened-search-bar-no-focus');
            }
        }
    }, [searchBarStatus])

    useEffect(() => {
        if(!showMainNavSearch) {
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

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <div onClick={openMenu} className='menu-user'>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '2px'}}>
                    <i style={{paddingRight: '5px'}} className="fa-solid fa-bars"></i>
                    <div className='user-icon-div'>
                    <i style={{color: 'white'}} className="fa-solid fa-user"></i>
                    </div>
                    </div>
                {showMenu && (
                    <div className='profile-dropdown'
                    style={{marginRight: '5rem', width: '150px'}}
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
                style={{display: 'flex'}}
                >
                    <img alt='logo' className='logo' src={logo} />
                </NavLink>
            </div>
            <div className='search-bar-container' onClick={() => setShowMainNavSearch(true)}></div>
            {isLoaded && sessionLinks}
            </div>
            {showMainNavSearch && (
                <Modal onClose={() => setShowMainNavSearch(false)}>
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
                                    <input id='opened-search-bar-where-input' placeholder='Search destinations' autoFocus></input>
                                </div>
                            </div>
                            <div className='opened-search-bar-separator'></div>
                            <div className='opened-search-bar-dates' id='opened-search-bar-no-focus' onClick={() => setSearchBarStatus('dates')}>
                                <div className='opened-search-bar-where-inner'>
                                    <span id='opened-search-bar-where-label'>Dates</span>
                                    <span id='opened-search-bar-dates-dates'>Add dates</span>
                                </div>
                            </div>
                            {/* <div className='opened-search-bar-separator'></div> */}
                            <div className='opened-search-bar-search-button'>
                                <div className='opened-search-bar-search-button-inner'>
                                    <i class="fa-solid fa-magnifying-glass" id='opened-search-bar-search-icon'/>
                                    <span id='opened-search-bar-search-button-text'>Search</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default MainNavigation;
