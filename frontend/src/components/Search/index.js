import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import GoogleMaps from '../GoogleMaps';
import SpotCard from '../SpotCard';
import './Search.css';

function Search () {

    const dispatch = useDispatch();
    const history = useHistory();
    const {searchParams} = useParams();
    const spots = useSelector(state => state.spots);
    const spotsArray = Object.values(spots);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        dispatch(getSpots());
        const searchResultsArray = [];
        for (let spot of spotsArray) {
            if (spot.city.toLowerCase().includes(searchParams.toLowerCase())) {
                searchResultsArray.push(spot);
            }
            if (spot.state.toLowerCase().includes(searchParams.toLowerCase())) {
                searchResultsArray.push(spot);
            }
        }
        setSearchResults(searchResultsArray);
    }, [dispatch, searchParams])

    if(!spots || !spotsArray) return null;

    return (
        <div className='search-results-page-container'>
            <div className='search-results-page-spot-cards-div'>
                <span id='suggested-results-for'>{`Suggested results for ${searchParams}`}</span>
                <div className='search-results-page-spot-cards-grid-div'>
                    {searchResults.length > 0 && searchResults.map(spot => (
                        <SpotCard key={spot.id} spot={spot}/>
                    ))}
                    {searchResults.length == 0 && spotsArray.map(spot => (
                        <SpotCard key={spot.id} spot={spot} />
                    ))}
                </div>
            </div>
            <div className='google-maps-api-container'>
                <div className='google-maps-fixed-div'>
                    <GoogleMaps searchParams={searchParams} searchResults={searchResults}/>
                </div>
            </div>
        </div>
    )
}

export default Search;
