import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsBrowser from "./components/SpotsBrowser";
import SpotDetails from "./components/SpotDetails";
import CreateSpotForm from "./components/CreateSpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    < div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
    <Switch>
    <Route exact path='/'>
    <Navigation isLoaded={isLoaded}/>
    <SpotsBrowser/>
    </Route>
    <Route path='/spots/:spotId'>
    <Navigation isLoaded={isLoaded}/>
      <SpotDetails/>
    </Route>
    <Route path='/host-spot'>
      <CreateSpotForm />
    </Route>
    </Switch>

    {/* {isLoaded && (
      // <Switch>
      //   <Route path="/login">
      //     <LoginFormPage />
      //   </Route>
      //   <Route path="/signup">
      //     <SignupFormPage />
      //   </Route>
      // </Switch>
    )} */}
  </ div>
  );
}

export default App;
