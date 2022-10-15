import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import LoginFormModal from '../LoginFormPage/index';
import { Modal } from '../../context/Modal';
import LoginFormPage from '../LoginFormPage/LoginFormPage';
import logo from '../../assets/airbnbLogo.png';

function Navigation({ isLoaded }) {
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);
    const menuProfile = document.querySelector('.menu-user')

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
        menuProfile.style.boxShadow = '0 2px 10px lightgray'
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
            menuProfile.style.boxShadow = 'none'
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
                    <i class="fa-solid fa-bars"></i>
                    <i class="fa-solid fa-user"></i>
                </div>
                {showMenu && (
                    <div className='profile-dropdown'>
                        <div id='login-div' onClick={() => setShowModal(true)} className='profile-dropdown-text-divs'>
                            Login
                        </div>
                        <NavLink to="/signup">
                            <div id='sign-up-div' className='profile-dropdown-text-divs'>
                                Sign Up
                            </div>
                        </NavLink>
                    </div>
                )
                }
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <LoginFormPage />
                    </Modal>
                )}
            </>
        );
    }

    return (
        <div className='nav-container'>
            <div className='home-container'>
                <NavLink exact to="/">
                    <img alt='logo' className='logo' src={logo}/>
                </NavLink>
            </div>
            {isLoaded && sessionLinks}
        </div>
    );
}

export default Navigation;
