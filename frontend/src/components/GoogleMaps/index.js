import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, OverlayView } from '@react-google-maps/api';
import Geocode from 'react-geocode';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './GoogleMaps.css';



const GoogleMaps = ({ searchParams, searchResults, setSearchResults }) => {
    const history = useHistory();

    // This is the equivalent to a script tag

    //This sets the center of the map. This must be set BEFORE the map loads

const [currentPosition, setCurrentPosition] = useState({lat:43.11016617798622,lng:-89.48826131670266})

// This is the equivalent to a script tag
Geocode.setApiKey(process.env.REACT_APP_MAPS_KEY);

// set response language. Defaults to english.
Geocode.setLanguage("en");

Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
Geocode.enableDebug();


// Get latitude & longitude from address
useEffect(() => {
    const makeMap = () => {
        // e.preventDefault()
        Geocode.fromAddress(searchResults[0]?.address ? searchResults[0].address : '4347 Marina Dr, Santa Barbara, CA 93110').then(
            (response) => {
              const {lat, lng} = response.results[0].geometry.location
              setCurrentPosition({lat, lng})

            },
            (error) => {
              console.error(error);
            }
          );


    }
    makeMap()
}, [searchResults])

const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY
  })

  const containerStyle = {
    width: '76%',
    height: '100%'
  };

  const [map, setMap] = useState(null)

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])


    return (
      // Important! Always set the container height explicitly
      <>
            {isLoaded && <GoogleMap
              mapContainerStyle={containerStyle}
              zoom={searchParams == 'Anywhere' || searchParams == 'California' || searchParams == 'New York' ? 7 : 13}
              center={currentPosition}
              onUnmount={onUnmount}
              >
                {searchResults.map(spot => (
                    <OverlayView
                    // key={spot.id}
                    position={{lat: spot.lat, lng: spot.lng}}
                    // onClick={() => history.push(`/spots/${spot.id}`)}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                      <div className='google-maps-price-overlay'
                      onClick={() => history.push(`/spots/${spot.id}`)}
                      >${spot.price}</div>
                    </OverlayView>
                ))}
            </GoogleMap>}
        </>
    );

}

export default GoogleMaps;
