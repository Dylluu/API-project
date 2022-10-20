import { csrfFetch } from "./csrf";

export const getReviews = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
      const list = await response.json();
      dispatch(loadReviews(list));
    }
  };

export const postReviewThunk = (spotId, review) => async () => {
    return await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'post',
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(review)
      }
      )
}

export const deleteReviewThunk = (reviewId) => async() => {
    return await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'delete'
    })
}

const LOAD_REVIEWS = 'reviews/LOAD';

export const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

export default function reviewsReducer(state = {}, action) {
    const newState = {...state}
    switch (action.type) {
        case LOAD_REVIEWS:
            return {...action.reviews.Reviews};
        default:
            return state;
    }
}
