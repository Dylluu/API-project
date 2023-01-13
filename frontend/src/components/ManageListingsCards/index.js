import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { deleteSpotThunk } from '../../store/spots';
import './ManageListingsCards.css';

function ManageListingsCards ({spotId}) {

    const dispatch = useDispatch();
    const history = useHistory();
    const spots = useSelector(state => state.spots);
    const spot = Object.values(spots).find(spot => spot.id == spotId);
    const user = useSelector(state => state.session?.user)

    async function handleDeleteListing (e) {
        e.preventDefault();
        await dispatch(deleteSpotThunk(spotId));
        await history.go(0);
    }

    useEffect(() => {
        if(!user) {
            history.push('/');
        }
    }, [user])

    if(!spots) return null;

    if(!spot) return null;

    return (
        <NavLink to={`/spots/${spotId}`} className='manage-listings-card-container'>
            <div className='manage-listings-card-listing'>
                <img alt={spot.id} src={spot.previewImage} className='manage-listings-card-spot-image'/>
                <span id='manage-listings-card-spot-name'>{spot.name}</span>
            </div>
                <span className='manage-listings-card-middle-columns'>
                    <i className="fa-solid fa-circle" id='manage-listings-card-status-circle'/>
                    <span id='manage-listings-card-spot-name' style={{marginLeft: '7px'}}>Listed</span>
                </span>
                <span className='manage-listings-card-middle-columns'>${spot.price}/night</span>
                <span className='manage-listings-card-middle-columns'>{spot.city}</span>
                <div>
                    <span className='manage-listings-buttons' style={{marginRight: '25px'}}
                    onClick={(e) => {
                        e.preventDefault();
                        history.push(`/update/${spotId}`)
                    }}
                    >Edit</span>
                    <span className='manage-listings-buttons'
                    onClick={(e) => handleDeleteListing(e)}
                    >Delete</span>
                </div>
        </NavLink>
    )
}

export default ManageListingsCards;
