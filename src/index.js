import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import './index.css';

import NotFound from './Pages/404/404';
import ResetPassword from './Pages/reset-password/ResetPassword';
import SignIn from './Pages/sign/SignIn';
import SignUp from './Pages/sign/SignUp';




export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signin" render={(props) => <SignIn {...props} pageName="Sign In" />} />
        <Route exact path="/reset-password" render={(props) => <ResetPassword {...props} pageName="Reset Password" />} />
        <Route path="/signup/:token" render={(props) => <SignUp {...props} pageName="Sign Up" />} />
        <Route path="/404" render={(props) => <NotFound {...props} pageName="404" />} />
        <Redirect from='*' to='/404'/>
      </Switch>
    </Router>
  );
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);