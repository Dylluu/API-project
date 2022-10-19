import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
// import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
// import LoginFormModal from '../LoginFormPage/index';
import { Modal } from '../../context/Modal';
import LoginFormPage from '../LoginFormPage/LoginFormPage';
import logo from '../../assets/airbnbLogo.png';
import SignupFormPage from '../SignupFormPage/SignupFormPage';
import useModalContext from '../../context/ShowModalContext';

function Navigation({ isLoaded }) {
    const {showModal, setShowModal, showSUModal, setShowSUModal} = useModalContext();
    const sessionUser = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);
    // const menuProfile = document.querySelector('.menu-user')

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
        // menuProfile.style.boxShadow = '0 2px 10px lightgray'
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
            // menuProfile.style.boxShadow = 'none'
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
                </div>
                {showMenu && (
                    <div className='profile-dropdown'>
                        <div id='login-div' onClick={() => setShowModal(true)} className='profile-dropdown-text-divs'>
                            Login
                        </div>
                        <div id='sign-up-div' onClick={() => setShowSUModal(true)} className='profile-dropdown-text-divs'>
                            Sign Up
                        </div>
                    </div>
                )
                }
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
        <div className='nav-container'>
            <div className='inner-nav-div'>
            <div className='home-container'>
                <NavLink exact to="/">
                    <img alt='logo' className='logo' src={logo} />
                </NavLink>
            </div>
            {sessionUser &&
                <NavLink  className='host-spot-div' to='/host-spot'>
                    <div>
                    <span>Host a new spot</span>
                    </div>
                </NavLink>
            }
            {isLoaded && sessionLinks}
            </div>
        </div>
    );
}

export default Navigation;
