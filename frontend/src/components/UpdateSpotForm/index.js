import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './UpdateSpotForm.css';
import gradient from '../../assets/gradient.png';
import { addSpotThunk, getSpots } from '../../store/spots';
import { useHistory } from 'react-router-dom';
import { addImagesThunk } from '../../store/spots';
import {useParams} from 'react-router-dom';
import { getSpot } from '../../store/spots';
import { editSpotThunk } from '../../store/spots';
import vector from '../../assets/airbnbVector.png';

function UpdateSpotForm() {
    const dispatch = useDispatch();
    const {spotId} = useParams();
    useEffect(() => {
        const spotDetails = dispatch(getSpot(spotId))
        // console.log(spotDetails)
    },[dispatch])
    const spot = useSelector(state => state.spots);

    useEffect(() => {
        setName(spot.name);
        setCity(spot.city);
        setState(spot.state);
        setCountry(spot.country);
        setAddress(spot.address);
        setPrice(spot.price);
        setDescription(spot.description);
        if(spot.SpotImages){
        if(spot.SpotImages[0]) setImage1URL(spot.SpotImages[0].url);
        if(spot.SpotImages[1]) setImage2URL(spot.SpotImages[1].url);
        if(spot.SpotImages[2]) setImage3URL(spot.SpotImages[2].url);
        if(spot.SpotImages[3]) setImage4URL(spot.SpotImages[3].url);
        if(spot.SpotImages[4]) setImage5URL(spot.SpotImages[4].url);
        }
    }, [spot])

    const history = useHistory();
    // const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [image1URL, setImage1URL] = useState('');
    const [image2URL, setImage2URL] = useState('');
    const [image3URL, setImage3URL] = useState('');
    const [image4URL, setImage4URL] = useState('');
    const [image5URL, setImage5URL] = useState('');
    const imageArray = [image2URL, image3URL, image4URL, image5URL]
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const spot = { address, city, state, country, lat, lng, name, description, price }

        // const image = { url: image1URL, preview: true }

        const newSpot = await dispatch(editSpotThunk(spot, spotId))
        .catch(async(res) => {
            const data = await res.json();
            if(data && data.errors){
                setErrors(data.errors);
                // console.log('LOGGING', errors)
            }
        })
        // await dispatch(getSpots)
        // await dispatch(addImagesThunk(newSpot.id, image))

        // await handleOtherImages(imageArray)
        if(newSpot){
        await history.push(`/manage`);
        }
    }

    const handleRefresh = async (e) => {
        e.preventDefault();

        await history.push('/')
    }

    return (
        <div className='create-spot-page-wrapper'>
            <div className='white-logo-home' onClick={(e) => handleRefresh(e)}>
                <img alt='vector' src={vector} className='vector'/>
            </div>
            <div className='tell-us-about-spot'>
                <span
                style={{color: 'white', fontSize: '40px', fontWeight: '400'}}
                >Need to make some changes?</span>
            </div>
            <img alt='gradient' className='create-spot-left' src={gradient} />
            <div className='create-spot-right'>
                <div className='create-spot-form-wrapper'>
                    <form onSubmit={(e) => handleSubmit(e)} className='og-spot-form'>
                        <div>
                            <input
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder='Name'
                                className='input'
                            />
                        </div>
                        {errors && errors.name && <div className='create-errors'>
                            {errors.name}
                        </div>}
                        <div>
                            <input
                                type='text'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                                placeholder='City'
                                className='input'
                            />
                        </div>
                        {errors && errors.city && <div className='create-errors'>
                            {errors.city}
                        </div>}
                        <div>
                            <input
                                type='text'
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                                placeholder='State'
                                className='input'
                            />
                        </div>
                        {errors && errors.state && <div className='create-errors'>
                            {errors.state}
                        </div>}
                        <div>
                            <input
                                type='text'
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                                placeholder='Country'
                                className='input'
                            />
                        </div>
                        {errors && errors.country && <div className='create-errors'>
                            {errors.country}
                        </div>}
                        <div>
                            <input
                                type='text'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                placeholder='Address'
                                className='input'
                            />
                        </div>
                        {errors && errors.address && <div className='create-errors'>
                            {errors.address}
                        </div>}
                        <div>
                            <input
                                type='number'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                placeholder='Price'
                                className='input'
                            />
                        </div>
                        {errors && errors.price && <div className='create-errors'>
                            {errors.price}
                        </div>}
                        <div>
                            <textarea
                                type='text'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                placeholder='Description'
                                className='text-area'
                            />
                        </div>
                        {errors && errors.description && <div className='create-errors'
                        style={{marginTop: '0px'}}
                        >
                            {errors.description}
                        </div>}
                    </form>
                    {/* <div className='add-images-div'>
                        <input
                            value={image1URL}
                            type='text'
                            placeholder='Image 1 URL (required)'
                            onChange={(e) => setImage1URL(e.target.value)}
                            className='input'
                        />
                        <input
                            value={image2URL}
                            type='text'
                            placeholder='Image 2 URL'
                            onChange={(e) => setImage2URL(e.target.value)}
                            className='input'
                        />
                        <input
                            value={image3URL}
                            type='text'
                            placeholder='Image 3 URL'
                            onChange={(e) => setImage3URL(e.target.value)}
                            className='input'
                        />
                        <input
                            value={image4URL}
                            type='text'
                            placeholder='Image 4 URL'
                            onChange={(e) => setImage4URL(e.target.value)}
                            className='input'
                        />
                        <input
                            value={image5URL}
                            type='text'
                            placeholder='Image 5 URL'
                            onChange={(e) => setImage5URL(e.target.value)}
                            className='input'
                        />
                        <div>
                            <button className='create-spot-submit' onClick={(e) => handleSubmit(e)}>Submit</button>
                        </div>
                    </div> */}
                </div>
                <div className='create-spot-nav-div'>
                    <div className='nav-bar-status'>
                        <div className='nav-bar-first'></div>
                        <div className='nav-bar-second'
                        style={{backgroundColor: 'black'}}
                        ></div>
                    </div>
                    <div className='nav-bar-buttons'>
                        <div className='nav-bar-left-half'>
                            {/* <div className='back-button' onClick={() => handleBackClick()}>Back</div> */}
                        </div>
                        <div className='nav-bar-right-half'>
                        <div>
                            <button className='create-spot-submit'
                            style={{width: '90px', height: '45px', zIndex: '11', position: 'absolute', right: '10%', bottom: '23%'}}
                            onClick={(e) => handleSubmit(e)}>Confirm</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateSpotForm;
