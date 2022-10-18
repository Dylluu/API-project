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
            <form>
                    <div>
                        <input
                        type='text'
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                        placeholder='Write review here'
                        className='review-text-input'
                        />
                    </div>
            </form>
        </div>
    )
}

export default ReviewForm;
