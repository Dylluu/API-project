import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './CreateSpotForm.css'
import gradient from '../../assets/gradient.png';
import { addSpotThunk, getSpots } from '../../store/spots';
import {useHistory} from 'react-router-dom';

function CreateSpotForm() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const spot = {address, city, state, country, lat, lng, name, description, price}

        await dispatch(addSpotThunk(spot))

        await dispatch(getSpots)

        await history.push('/')
    }

    return (
        <div className='create-spot-page-wrapper'>
                <img alt='gradient' className='create-spot-left' src={gradient}/>
            <div className='create-spot-right'>
                <div className='create-spot-form-wrapper'>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div>
                        <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder='Name'
                        />
                        </div>
                        <div>
                        <input
                        type='text'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        placeholder='City'
                        />
                        </div>
                        <div>
                        <input
                        type='text'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        placeholder='State'
                        />
                        </div>
                        <div>
                        <input
                        type='text'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        placeholder='Country'
                        />
                        </div>
                        <div>
                        <input
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        placeholder='Address'
                        />
                        </div>
                        <div>
                        <input
                        type='number'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        placeholder='Price'
                        />
                        </div>
                        <div>
                        <textarea
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder='Description'
                        />
                        </div>
                        <div>
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateSpotForm;
