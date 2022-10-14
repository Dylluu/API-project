import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';

function Navigation({ isLoaded }){
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
      <ProfileButton user={sessionUser}/>
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
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
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
