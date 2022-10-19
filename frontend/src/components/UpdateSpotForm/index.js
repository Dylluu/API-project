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

function UpdateSpotForm() {
    const dispatch = useDispatch();
    const {spotId} = useParams();
    useEffect(() => {
        const spotDetails = dispatch(getSpot(spotId))
        console.log(spotDetails)
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
        // function handleOtherImages(imageArray) {
        //     for (let image of imageArray) {
        //         if (image) {
        //             const newImage = { url: image, preview: false }
        //             dispatch(addImagesThunk(newSpot.id, newImage))
        //         }
        //     }
        // }

        const nextButton = document.getElementsByClassName('next-button');
        const backButton = document.getElementsByClassName('back-button');

        nextButton[0].style.right = '10%'
        backButton[0].style.zIndex = '-1'

        e.preventDefault();

        const spot = { address, city, state, country, lat, lng, name, description, price }

        const image = { url: image1URL, preview: true }

        const newSpot = await dispatch(editSpotThunk(spot, spotId))
        // await dispatch(getSpots)
        // await dispatch(addImagesThunk(newSpot.id, image))

        // await handleOtherImages(imageArray)

        await history.push(`/spots/${newSpot.id}`)
    }

    return (
        <div className='create-spot-page-wrapper'>
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

                    </form>
                    <div className='add-images-div'>
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

export default UpdateSpotForm;
