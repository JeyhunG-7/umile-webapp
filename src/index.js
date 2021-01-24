import React from 'react';
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

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";


export default function App() {
  return (
    <div style={{display: "flex"}}>
      <Sidebar/>
      <Router style={{flexGrow: 1}}>
        <Switch>
          <Route exact path="/contact" render={(props) => <Contact {...props} pageName="Contact Us" />} />
          <Route exact path="/privacy" render={(props) => <Privacy {...props} pageName="Privacy Policy" />} />
          <Route exact path="/terms" render={(props) => <Terms {...props} pageName="Terms of Use" />} />
          <Route exact path="/signin" render={(props) => <SignIn {...props} pageName="Sign In" />} />
          <Route exact path="/reset-password" render={(props) => <ResetPassword {...props} pageName="Reset Password" />} />
          <Route path="/signup/:token" render={(props) => <SignUp {...props} pageName="Sign Up" />} />
          <Route exact path="/" render={(props) => <Main {...props} pageName="Main" />} />
          <Route exact path="/main2" render={(props) => <Main2 {...props} pageName="Main2" />} />
          <Route path="/404" render={(props) => <NotFound {...props} pageName="404" />} />
          <Redirect from='*' to='/404'/>
        </Switch>
      </Router>
    </div>
  );
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);