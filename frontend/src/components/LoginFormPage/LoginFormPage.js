import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch} from 'react-redux';
import useModalContext from '../../context/ShowModalContext';
// import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  // const sessionUser = useSelector(state => state.session.user);
  const {setShowModal} = useModalContext();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // if (sessionUser) return (
  //   <Redirect to="/" />
  // );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => setShowModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  const handleDemoButton = (e) => {
    e.preventDefault();

    return dispatch(sessionActions.login({credential: 'Demo-lition', password: 'password'}))
      .then(() => setShowModal(false))
  }

  return (
    <div className='container'>
        <div className="top-bar">
          <div className='mark-div' onClick={() => setShowModal(false)}>
        <i className="fa-solid fa-xmark" style={{fontSize: '20px'}}/>
        </div>
                <span className="log-in">Log In</span>
        </div>
        <div className='welcome'>
            <span>Welcome To Airbenbe</span>
        </div>
        <form onSubmit={handleSubmit}>
        <ul>
            {/* {errors.map((error, idx) => <li key={idx}>{error}</li>)} */}
        </ul>
        <div>
            <input
            name='username'
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            className='username-email'
            // placeholder='Username or Email'
            style={{borderBottom: 'none'}}
            id='login-username'
            />
        </div>
        <label htmlFor='username' className='log-in-to-book-labels' id='login-modal-labels-username'>Username or Email</label>
          <label htmlFor='password' className='log-in-to-book-labels' id='login-modal-labels-password'>Password</label>
        <div>
            <input
            type="password"
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='password'
            // placeholder='Password'
            />
        </div>
        {errors[0] &&
        <div className='error-div'>
          {errors[0]}
        </div>}
        <div>
        <button className='login' type="submit">Continue</button>
        </div>
        <div className='or'>
            <div className='or-sides'>
            </div>
            <span style={{fontSize: '12px', color: 'gray', fontWeight: '250'}}>or</span>
            <div className='or-sides'></div>
        </div>
        <div className='cont-as-demo'>
          <button className='demo-butt' onClick={(e) => handleDemoButton(e)}>Continue as demo user</button>
        </div>
        </form>
    </div>
    );
    }

export default LoginFormPage;
