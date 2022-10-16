
export const getSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`);

    if (response.ok) {
      const list = await response.json();
      dispatch(loadSpots(list));
    }
  };

const LOAD_SPOTS = 'spots/LOAD';

export const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

export default function spotsReducer(state = {}, action) {
    const newState = {...state}
    switch (action.type) {
        case LOAD_SPOTS:
            console.log('----------', {...action.spots.Spots})
            newState.Spots = action.spots.Spots
            return newState;
        default:
            return state;
    }
}
