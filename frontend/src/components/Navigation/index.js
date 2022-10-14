import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import LoginFormModal from '../LoginFormModal/index.js';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

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
                    <i className="fa-solid fa-bars"></i>
                    <i className="fa-solid fa-user"></i>
                </div>
                {showMenu && (
                    <div className='profile-dropdown'>
                        <LoginFormModal />
                        <NavLink to="/signup">
                            <div className='profile-dropdown-text-divs' style={{borderTop: 'solid 1px lightgray'}}>
                                Sign Up
                            </div>
                        </NavLink>
                    </div>
                )
                }
            </>
        );
    }

    return (
        <div className='nav-container'>
            <div className='home-container'>
                <NavLink exact to="/">Home</NavLink>
            </div>
            {isLoaded && sessionLinks}
        </div>
    );
}

export default Navigation;
