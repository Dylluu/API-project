import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './CreateSpotForm.css'
import gradient from '../../assets/gradient.png';
import { addSpotThunk, getSpots } from '../../store/spots';
import { useHistory } from 'react-router-dom';
import { addImagesThunk } from '../../store/spots';
import vector from '../../assets/airbnbVector.png';

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
    const [image1URL, setImage1URL] = useState('');
    const [image2URL, setImage2URL] = useState('');
    const [image3URL, setImage3URL] = useState('');
    const [image4URL, setImage4URL] = useState('');
    const [image5URL, setImage5URL] = useState('');
    const imageArray = [image2URL, image3URL, image4URL, image5URL]
    const [errors, setErrors] = useState({})

    function handleNextClick() {
        const imageForm = document.getElementsByClassName('add-images-div');
        const spotForm = document.getElementsByClassName('og-spot-form');
        const navStatusOne = document.getElementsByClassName('nav-bar-first');
        const navStatusTwo = document.getElementsByClassName('nav-bar-second');
        const nextButton = document.getElementsByClassName('next-button');
        const backButton = document.getElementsByClassName('back-button');
        navStatusOne[0].style.backgroundColor = '#E8E8E8'
        navStatusTwo[0].style.backgroundColor = 'black';
        imageForm[0].style.display = 'flex';
        imageForm[0].style.zIndex = '0'
        spotForm[0].style.display = 'none';
        backButton[0].style.display = 'flex';
        // backButton[0].style.zIndex = '-1';
        nextButton[0].style.display = 'none';
        nextButton[0].style.zIndex = '-1';
        backButton[0].style.left = '10%'
        spotForm[0].style.zIndex = '-1';

        setName(name)
        setCity(city)
        setState(state)
        setCountry(country)
        setAddress(address)
        setPrice(price)
        setDescription(description)
        return;
    }

    function handleBackClick() {
        const imageForm = document.getElementsByClassName('add-images-div');
        const spotForm = document.getElementsByClassName('og-spot-form');
        const navStatusOne = document.getElementsByClassName('nav-bar-first');
        const navStatusTwo = document.getElementsByClassName('nav-bar-second');
        const nextButton = document.getElementsByClassName('next-button');
        const backButton = document.getElementsByClassName('back-button');
        navStatusOne[0].style.backgroundColor = 'black'
        navStatusTwo[0].style.backgroundColor = '#E8E8E8';
        imageForm[0].style.display = 'none';
        imageForm[0].style.zIndex = '-1'
        spotForm[0].style.display = 'block';
        backButton[0].style.display = 'none';
        nextButton[0].style.position = 'absolute';
        nextButton[0].style.right = '10%';
        nextButton[0].style.display = 'block';
        nextButton[0].style.zIndex = '0'
        // nextButton[0].style.zIndex = '0';
        spotForm[0].style.zIndex = '0';

        return;
    }

    const handleSubmit = async (e) => {
        function handleOtherImages(imageArray) {
            for (let image of imageArray) {
                if (image) {
                    const newImage = { url: image, preview: false }
                    dispatch(addImagesThunk(newSpot.id, newImage))
                }
            }
        }

        const nextButton = document.getElementsByClassName('next-button');
        const backButton = document.getElementsByClassName('back-button');

        nextButton[0].style.right = '10%'
        // backButton[0].style.zIndex = '-1'

        e.preventDefault();

        const spot = { address, city, state, country, lat, lng, name, description, price }

        const image = { url: image1URL, preview: true }

        const newSpot = await dispatch(addSpotThunk(spot))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors)
                // console.log('LOGGING', errors)
            }

            return handleBackClick();
          });
        // await dispatch(getSpots)
        if(newSpot) {
        await dispatch(addImagesThunk(newSpot.id, image))

        await handleOtherImages(imageArray)

        await history.push(`/spots/${newSpot.id}`)
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
                >Tell us about your spot!</span>
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
                    <div className='add-images-div'>
                        <input
                            value={image1URL}
                            type='text'
                            placeholder='Preview Image URL'
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
                            <button
                            style={{width: '360px'}}
                            className='create-spot-submit' onClick={(e) => handleSubmit(e)}>Submit</button>
                        </div>
                    </div>
                </div>
                <div className='create-spot-nav-div'>
                    <div className='nav-bar-status'>
                        <div className='nav-bar-first'></div>
                        <div className='nav-bar-second'></div>
                    </div>
                    <div className='nav-bar-buttons'>
                        <div className='nav-bar-left-half'>
                            <div className='back-button' onClick={() => handleBackClick()}>Back</div>
                        </div>
                        <div className='nav-bar-right-half'>
                            <button className='next-button' onClick={() => handleNextClick()}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateSpotForm;
