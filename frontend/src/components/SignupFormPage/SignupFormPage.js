import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css'
import useModalContext from "../../context/ShowModalContext";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const {setShowSUModal} = useModalContext();

  // if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(() => setShowSUModal(false))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className='su-container'>
      <div className="top-bar">
      <div className='signup-mark-div' onClick={() => setShowSUModal(false)}>
        <i className="fa-solid fa-xmark" style={{fontSize: '20px'}}/>
        </div>
        <span className="sign-up">Sign Up</span>
      </div>
      <div className='welcome'>
        <span>Welcome To Airbenbe</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            minLength='6'
            maxLength='40'
            placeholder="Email (Must be between 6 and 40 characters)"
            className="su-input"
          />
        </div>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            maxLength='30'
            minLength='4'
            placeholder="Username (Must be between 4 and 30 characters)"
            className="su-input"
          />
        </div>
        <div>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          // required
          maxLength='30'
          placeholder="First Name (Must be between 1 and 30 characters)"
          className="su-input"
        />
        </div>
        <div>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          // required
          maxLength='30'
          placeholder="Last Name (Must be between 1 and 30 characters)"
          className="su-input"
        />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password (Must be at least 6 characters)"
            className="su-input"
          />
          </div>
          <div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
            className="su-input"
            style={{marginBottom: '0px'}}
          />
          </div>
          <ul className="ul-errors">
          {errors?.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div>
        <button className='signup' type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;
