import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './CreateSpotForm.css'
import gradient from '../../assets/gradient.png';
import { addSpotThunk, getSpots } from '../../store/spots';
import {useHistory} from 'react-router-dom';
import { addImagesThunk } from '../../store/spots';

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
    const [image1URL, setImage1URL] = useState(null);
    const [image2URL, setImage2URL] = useState(null);
    const [image3URL, setImage3URL] = useState(null);
    const [image4URL, setImage4URL] = useState(null);
    const [image5URL, setImage5URL] = useState(null);
    const imageArray = [image2URL, image3URL, image4URL, image5URL]

    const handleSubmit = async(e) => {
        function handleOtherImages(imageArray) {
            for(let image of imageArray){
                if(image){
                    const newImage = {url: image, preview: false}
                    dispatch(addImagesThunk(newSpot.id, newImage))
                }
            }
        }

        e.preventDefault();

        const spot = {address, city, state, country, lat, lng, name, description, price}

        const image = {url: image1URL, preview: true}

        const newSpot = await dispatch(addSpotThunk(spot))
        // await dispatch(getSpots)
        await dispatch(addImagesThunk(newSpot.id, image))

        await handleOtherImages(imageArray)

        await history.push(`/spots/${newSpot.id}`)
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
                        <div className='add-images-div'>
                            <input
                            value={image1URL}
                            type='text'
                            required
                            placeholder='Image 1 URL (required)'
                            onChange={(e) => setImage1URL(e.target.value)}
                             />
                             <input
                            value={image2URL}
                            type='text'
                            placeholder='Image 2 URL'
                            onChange={(e) => setImage2URL(e.target.value)}
                             />
                             <input
                            value={image3URL}
                            type='text'
                            placeholder='Image 3 URL'
                            onChange={(e) => setImage3URL(e.target.value)}
                             />
                             <input
                            value={image4URL}
                            type='text'
                            placeholder='Image 4 URL'
                            onChange={(e) => setImage4URL(e.target.value)}
                             />
                             <input
                            value={image5URL}
                            type='text'
                            placeholder='Image 5 URL'
                            onChange={(e) => setImage5URL(e.target.value)}
                             />
                        <div>
                            <button>Submit</button>
                        </div>
                        </div>
                    </form>
                </div>
                <div className='create-spot-nav-div'>
                NavBar
            </div>
            </div>
        </div>
    )
}

export default CreateSpotForm;
