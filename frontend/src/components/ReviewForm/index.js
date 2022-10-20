// import { useParams } from 'react-router-dom'
import React, { useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useModalContext from '../../context/ShowModalContext';
import { postReviewThunk } from '../../store/reviews';
import { getReviews } from '../../store/reviews';
import { getSpot } from '../../store/spots';
import './ReviewForm.css';

function ReviewForm() {
    const [numStars, setNumStars] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const {setShowReviewModal} = useModalContext();
    // const user = useSelector(state => state.session.user);
    const spotId = useSelector(state => state.spots.id);
    const dispatch = useDispatch();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()

        const review = {review: reviewText, stars: numStars}
        const submittedReview = await dispatch(postReviewThunk(spotId, review))
        .catch(async (res) => {
            const data = await res.json();
            if(data && data.errors) {
                setError(data.errors)
                console.log('LOGGING', data.errors)
            }
        })

        if(submittedReview){
        await setShowReviewModal(false)

        await dispatch(getReviews(spotId))
        await dispatch(getSpot(spotId))
        }
    }

    return (
        <div className='review-form-wrapper'>
            <form className='review-form-class' onSubmit={(e) => handleSubmit(e)}>
                <div className='review-top-bar'>
                <div className='review-mark-div' onClick={() => setShowReviewModal(false)}>
        <i className="fa-solid fa-xmark" style={{fontSize: '20px'}}/>
        </div>
                    <span className='how-was-stay'>Tell Us About Your Stay</span>
                </div>
                <div className='star-rating-div'>
                    <span className='star-rating-text'>Star Rating</span>
                </div>
                <div className='rating-wrapper'>
                <div className='select-wrapper'>
                <select className='sel'
                placeholder='Rating'
                onChange={(e) => setNumStars(e.target.value)}
                >
                <option value={0} disabled selected>Rating</option>
                <option
                value={5}
                onChange={() => setNumStars(5)}
                >5</option>
                <option
                value={4}
                onChange={() => setNumStars(4)}>4</option>
                <option
                value={3}
                onChange={() => setNumStars(3)}>3</option>
                <option
                value={2}
                onChange={() => setNumStars(2)}>2</option>
                <option
                value={1}
                onChange={() => setNumStars(1)}>1</option>
                </select>
                </div>
                {/* <div className="rating">
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
        </div> */}
        {error.stars && <div className='rev-error'>Rating is required</div>}
        </div>
                <div className='how-was-your-experience-div'
                style={{marginTop: '5px'}}
                >
                            <span className='how-was-your-experience-text'>How was your experience?</span>
                        </div>
                    <div className='review-text-div'>
                        <textarea
                        id='review-text'
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                        placeholder='Write your review here'
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
