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
  const [errors, setErrors] = useState([]);

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

  return (
    <div className='container'>
        <div className="top-bar">
                {/* <span className="x">X</span> */}
                <span className="log-in">Log In</span>
        </div>
        <div className='welcome'>
            <span>Welcome To Airbenbe</span>
        </div>
        <form onSubmit={handleSubmit}>
        <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div>
            <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            className='username-email'
            placeholder='Username or Email'
            style={{borderBottom: 'none'}}
            />
        </div>
        <div>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='password'
            placeholder='Password'
            />
        </div>
        <div>
        <button className='login' type="submit">Continue</button>
        </div>
        </form>
    </div>
    );
    }

export default LoginFormPage;
