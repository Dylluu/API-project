import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Geocode from 'react-geocode';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';



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
    height: '800px'
  };

  const [map, setMap] = useState(null)

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])


    return (
      // Important! Always set the container height explicitly

      <div className="map_page__container">

        <div style={{ height: '900px', width: '100%' }}>
            {isLoaded && <GoogleMap
              mapContainerStyle={containerStyle}
              zoom={searchParams == 'Anywhere' || searchParams == 'California' || searchParams == 'New York' ? 7 : 12}
              center={currentPosition}
              onUnmount={onUnmount}
              >
                {searchResults.map(spot => (
                    <Marker
                    key={spot.id}
                    position={{lat: spot.lat, lng: spot.lng}}
                    onClick={() => history.push(`/spots/${spot.id}`)}
                    />
                ))}
            </GoogleMap>}
        </div>

      </div>
    );

}

export default GoogleMaps;
