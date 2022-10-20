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
    // if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(() => setShowSUModal(false))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
          console.log(data)
          if (password !== confirmPassword) errors.push('Confirm Password field must be the same as the Password field')
        });
    // }
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
        <ul>
          {/* {errors?.map((error, idx) => <li key={idx}>{error}</li>)} */}
        </ul>
        <div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="su-input"
          />
        </div>
        {errors[0] && <div style={{top: '200px'}} className="su-err-div">{errors[0]}</div>}
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username (Must be at least 4 characters)"
            className="su-input"
          />
        </div>
        {errors[1] && <div style={{top: '270px'}} className="su-err-div">{errors[1]}</div>}
        <div>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          placeholder="First Name"
          className="su-input"
        />
        </div>
        <div>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          placeholder="Last Name"
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
          {errors[2] && <div style={{top: '480px'}} className="su-err-div">{errors[2]}</div>}
          <div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
            className="su-input"
          />
          </div>
        <div>
        <button className='signup' type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;
