import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Sidebar from './Components/Sidebar';

// pages
import Contact from './Pages/contact/Contact';
import Main from './Pages/main/Main';
import Main2 from './Pages/main2/Main2';
import NotFound from './Pages/404/404';
import Privacy from './Pages/privacy/Privacy';
import ResetPassword from './Pages/reset-password/ResetPassword';
import SignIn from './Pages/sign/SignIn';
import SignUp from './Pages/sign/SignUp';
import Terms from './Pages/terms/Terms';
import Profile from './Pages/profile/Profile';

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import { IsSignedInAsync } from './Components/Helpers/Authenticator';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(async () => {
    const loggedIn = await IsSignedInAsync();
    setIsLoggedIn(loggedIn);
  }, [])

  return (
    <div style={{display: "flex"}}>
      <Router>
        { isLoggedIn ? <Sidebar/> : <></> }
        <Switch>
          <Route exact path="/contact" render={(props) => <Contact {...props} pageName="Contact Us" />} />
          <Route exact path="/privacy" render={(props) => <Privacy {...props} pageName="Privacy Policy" />} />
          <Route exact path="/terms" render={(props) => <Terms {...props} pageName="Terms of Use" />} />
          <Route exact path="/signin" render={(props) => <SignIn {...props} pageName="Sign In" />} />
          <Route exact path="/reset-password" render={(props) => <ResetPassword {...props} pageName="Reset Password" />} />
          <Route path="/signup/:token" render={(props) => <SignUp {...props} pageName="Sign Up" />} />
          <Route exact path="/" render={(props) => <Main {...props} pageName="Main" />} />
          
          
          <PrivateRoute exact path="/main2" auth={isLoggedIn} component={Main2} pageName="Main2" />
          <PrivateRoute exact path="/profile" auth={isLoggedIn} component={Profile} pageName="Profile" />
          <Route path="/404" render={(props) => <NotFound {...props} pageName="404" />} />
          <Redirect from='*' to='/404'/>
        </Switch>
      </Router>
    </div>
  );
}

function PrivateRoute({ component: Component, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        auth ?
          <Component {...props} /> :
          <Redirect to="/signin" />
      }
    />
  );
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);