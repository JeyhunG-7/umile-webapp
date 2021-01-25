import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import './index.css';

import Sidebar from './Components/Sidebar';

// pages
import Main from './Pages/main/Main';
import NotFound from './Pages/404/404';
import ResetPassword from './Pages/reset-password/ResetPassword';
import SignIn from './Pages/sign/SignIn';
import SignUp from './Pages/sign/SignUp';

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
          <Route exact path="/signin" render={(props) => <SignIn {...props} pageName="Sign In" />} />
          <Route exact path="/reset-password" render={(props) => <ResetPassword {...props} pageName="Reset Password" />} />
          <Route path="/signup/:token" render={(props) => <SignUp {...props} pageName="Sign Up" />} />
          
          
          <PrivateRoute exact path="/" auth={isLoggedIn} component={Main} pageName="Main" />
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