import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import './index.css';

import { ThemeProvider } from '@material-ui/core/styles';

import Theme from './Components/MUITheme';
import Sidebar from './Components/Sidebar';

// pages
import Main from './Pages/main/Main';
import Profile from './Pages/profile/Profile';
import Orders from './Pages/orders/Orders';
import NewOrder from './Pages/neworder/NewOrder';
import NotFound from './Pages/404/404';
import ResetPassword from './Pages/reset-password/ResetPassword';
import SignIn from './Pages/sign/SignIn';
import SignUp from './Pages/sign/SignUp';

import { IsSignedInAsync } from './Components/Helpers/Authenticator';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: false,
      isLoading: false
    }
  }

  async UNSAFE_componentWillMount() {
    this.setState({
      isLoading: true
    })
    const loggedIn = await IsSignedInAsync();

    this.setState({
      isLoading: false,
      isLoggedIn: loggedIn
    })
  }

  render() {
    // Need to use loading state to wait for log in callback to finish
    if (this.state.isLoading) {
      return <></>
    } else {
      return (
        <div style={{ display: "flex" }}>
          <ThemeProvider theme={Theme}>
            <Router>
              {this.state.isLoggedIn ? <Sidebar /> : <></>}
              <Switch>
                {/* Public Routes */}
                <Route exact path="/signin" render={(props) => <SignIn {...props} pageName="Sign In" />} />
                <Route exact path="/reset-password" render={(props) => <ResetPassword {...props} pageName="Reset Password" />} />
                <Route path="/signup/:token" render={(props) => <SignUp {...props} pageName="Sign Up" />} />
                <Route path="/404" render={(props) => <NotFound {...props} pageName="404" />} />

                {/* Private Routes */}
                <PrivateRoute exact path="/" auth={this.state.isLoggedIn} component={Main} pageName="Main" />
                <PrivateRoute exact path="/profile" auth={this.state.isLoggedIn} component={Profile} pageName="Profile" />
                <PrivateRoute exact path="/orders" auth={this.state.isLoggedIn} component={Orders} pageName="Orders" />
                <PrivateRoute exact path="/neworder" auth={this.state.isLoggedIn} component={NewOrder} pageName="New Order" />

                <Redirect from='*' to='/' />
              </Switch>
            </Router>
          </ThemeProvider>
        </div>
      )
    }
  }
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