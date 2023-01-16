import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, OverlayView } from '@react-google-maps/api';
import './WhereYoullBe.css';



const WhereYoullBe = ({spot}) => {


//This sets the center of the map. This must be set BEFORE the map loads

const [currentPosition, setCurrentPosition] = useState({lat:spot.lat,lng:spot.lng})

// This is the equivalent to a script tag

const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY
  })

  const containerStyle = {
    width: '100%',
    height: '500px'
  };

  const [map, setMap] = useState(null)

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])


    return (
      // Important! Always set the container height explicitly

      <div className="map_page__container">

        <div style={{ height: '500px', width: '100%' }}>
            {isLoaded && <GoogleMap
              mapContainerStyle={containerStyle}
              zoom={12}
              center={currentPosition}
              onUnmount={onUnmount}
              >
                <OverlayView
                position={{lat: spot.lat, lng: spot.lng}}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                    <div id='where-youll-be-house-icon'>
                        <i className='fa-solid fa-house'/>
                    </div>
                </OverlayView>
            </GoogleMap>}
        </div>

      </div>
    );

}

export default WhereYoullBe;
