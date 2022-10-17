
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

export default function spotsReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_SPOTS:
            return {...action.spots.Spots};
        case LOAD_SPOT_DETAILS:
            return {...action.spot}
        default:
            return state;
    }
}
