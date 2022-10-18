import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useModalContext from '../../context/ShowModalContext';
import './ReviewForm.css';

function ReviewForm() {
    const [numStars, setNumStars] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const {showReviewModal} = useModalContext();
    const user = useSelector(state => state.session.user);
    return (
        <div className='review-form-wrapper'>
            <form className='review-form-class'>
                <div className='review-top-bar'>
                    <span className='how-was-stay'>Tell Us About Your Stay</span>
                </div>
                <div className='star-rating-div'>
                    <span className='star-rating-text'>Star Rating</span>
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
