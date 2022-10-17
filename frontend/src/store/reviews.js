export const getReviews = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots//${spotId}/reviews`);

    if (response.ok) {
      const list = await response.json();
      dispatch(loadReviews(list));
    }
  };

const LOAD_REVIEWS = 'reviews/LOAD';

export const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

export default function reviewsReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_REVIEWS:
            return {...action.reviews.Reviews};
        default:
            return state;
    }
}
