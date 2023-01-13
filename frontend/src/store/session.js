import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const CLEAR_SPOT_CURRENT = 'session/clearSpot';
const LOAD_SPOT_CURRENT = 'session/loadSpot';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const loadSpotsCurrent = (spots) => {
  return {
    type: LOAD_SPOT_CURRENT,
    spots
  }
}

export const clearSpotsCurrent = () => {
  return {
    type: CLEAR_SPOT_CURRENT
  }
}

export const loadSpotsCurrentThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots/current');

  if (response.ok) {
    const spots = await response.json();
    await dispatch(loadSpotsCurrent(spots));
  }
}

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  if(!Object.values(data).length) return;

  dispatch(setUser(data));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, firstName, lastName, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      firstName,
      lastName,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    case LOAD_SPOT_CURRENT:
      newState = Object.assign({}, state);
      newState.spots = action.spots
      return newState;
    case CLEAR_SPOT_CURRENT:
      newState = Object.assign({}, state);
      newState.spots = {}
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
