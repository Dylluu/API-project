import { csrfFetch } from "./csrf";

export const getSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`);

    if (response.ok) {
      const list = await response.json();
      dispatch(loadSpots(list));
    }
  };

export const getSpot = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`);

    if (response.ok) {
      const list = await response.json();
      dispatch(loadSpotDetails(list));
    }
  };

const LOAD_SPOTS = 'spots/LOAD';

export const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

const LOAD_SPOT_DETAILS = 'spotDetails/LOAD';

export const loadSpotDetails = (spot) => {
    return {
        type: LOAD_SPOT_DETAILS,
        spot
    }
}

export const addSpotThunk = (spot) => async() => {
    const newSpot = await csrfFetch(`/api/spots`, {
        method: 'post',
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(spot)
      }
      )

    const actualNewSpot = await newSpot.json();
    return actualNewSpot
}

export const addImagesThunk = (spotId, image) => async() => {
    const newImage = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'post',
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(image)
      }
      )

    const actualNewImage = await newImage.json();
    return actualNewImage
}

// const ADD_SPOT = 'spot/ADD';

// export const addSpot = (spot) => {
//     return {
//         type: ADD_SPOT,
//         spot
//     }
// }

export default function spotsReducer(state = {}, action) {
    const newState = {...state}
    switch (action.type) {
        case LOAD_SPOTS:
            return {...action.spots.Spots};
        case LOAD_SPOT_DETAILS:
            return {...action.spot};
        default:
            return state;
    }
}
