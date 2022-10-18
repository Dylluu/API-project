import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useModalContext from '../../context/ShowModalContext';
import { postReviewThunk } from '../../store/reviews';
import { getReviews } from '../../store/reviews';
import './ReviewForm.css';

function ReviewForm() {
    const [numStars, setNumStars] = useState(5);
    const [reviewText, setReviewText] = useState('');
    const {setShowReviewModal, showReviewModal} = useModalContext();
    const user = useSelector(state => state.session.user);
    const spotId = useSelector(state => state.spots.id);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault()

        const review = {review: reviewText, stars: numStars}
        dispatch(postReviewThunk(spotId, review))
        .then(() => setShowReviewModal(false))
        .then((getReviews(spotId)))
    }

    return (
        <div className='review-form-wrapper'>
            <form className='review-form-class' onSubmit={(e) => handleSubmit(e)}>
                <div className='review-top-bar'>
                    <span className='how-was-stay'>Tell Us About Your Stay</span>
                </div>
                <div className='star-rating-div'>
                    <span className='star-rating-text'>Star Rating</span>
                </div>
                <div className='rating-wrapper'>
                <div className="rating">
            <input id="star5" name="star" type="radio" value={5} className="radio-btn hide" onChange={() => setNumStars(5)}/>
            <label htmlFor="star5" >☆</label>
            <input id="star4" name="star" type="radio" value={4} className="radio-btn hide"  onChange={() => setNumStars(4)}/>
            <label htmlFor="star4" >☆</label>
            <input id="star3" name="star" type="radio" value={3} className="radio-btn hide"  onChange={() => setNumStars(3)}/>
            <label htmlFor="star3" >☆</label>
            <input id="star2" name="star" type="radio" value={2} className="radio-btn hide"  onChange={() => setNumStars(2)}/>
            <label htmlFor="star2" >☆</label>
            <input id="star1" name="star" type="radio" value={1} className="radio-btn hide"  onChange={() => setNumStars(1)}/>
            <label htmlFor="star1" >☆</label>
            <div className="clear"></div>
        </div>
        </div>
                <div className='how-was-your-experience-div'>
                            <span className='how-was-your-experience-text'>How was your experience?</span>
                        </div>
                    <div className='review-text-div'>
                        <textarea
                        id='review-text'
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                        placeholder='Write review here'
                        className='review-text-input'
                        />
                    </div>
                    <div className='review-submit-div'>
                        <button className='review-submit-button'>Submit</button>
                    </div>
            </form>
        </div>
    )
}

export default ReviewForm;
