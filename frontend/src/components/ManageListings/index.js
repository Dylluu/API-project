import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { clearSpotsCurrent, loadSpotsCurrentThunk } from '../../store/session';
import { getSpots } from '../../store/spots';
import ManageListingsCards from '../ManageListingsCards';
import './ManageListings.css';

function ManageListings () {

    const dispatch = useDispatch();
    const history = useHistory();
    const spots = useSelector(state => state.session?.spots?.Spots);

    useEffect(() => {
        dispatch(clearSpotsCurrent());
        dispatch(loadSpotsCurrentThunk());
        dispatch(getSpots());
    }, [dispatch])

    if(!spots) return null;

    return (
        <div className='manage-listings-page-container'>
            <span id='listings-title'>Listings</span>
            {spots?.length == 0 && (<div className='no-listings-main-div'>
                <div className='no-bookings-yet-wrapper'>
                    <span id='no-bookings-yet-title'>No listings posted...yet!</span>
                    <span id='time-to-dust-text'>Time to become a host</span>
                    <div id='start-searching-button'
                        onClick={() => history.push('/host-spot')}
                    ><span>Start hosting</span></div>
                </div>
            </div>)}
            {spots?.length > 0 && (<div className='manage-listings-cards-div'>
            <div className='listings-header-div'>
                <span id='listing'>Listing</span>
                <span id='status'>Status</span>
                <span id='status'>Price</span>
                <span id='status'>Location</span>
            </div>
            {spots.map(spot => <ManageListingsCards key={spot.id} spotId={spot.id}/>)}
            </div>)}
        </div>
    )
}

export default ManageListings;
