import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from "apollo-client";
import { InMemoryCache } from 'apollo-cache-inmemory';

import Contact from './Pages/contact/Contact';
import Main from './Pages/main/Main';
import NotFound from './Pages/404/404';
import Privacy from './Pages/privacy/Privacy';
import Sign from './Pages/sign/Sign';
import Terms from './Pages/terms/Terms';

import { createHttpLink } from "apollo-link-http";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const cache = new InMemoryCache();

const link = createHttpLink({
  uri: 'http://localhost:8080/graphql'
});

const client = new ApolloClient({
  cache,
  link
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/contact" render={(props) => <Contact {...props} pageName="Contact Us" />} />
          <Route path="/privacy" render={(props) => <Privacy {...props} pageName="Privacy Policy" />} />
          <Route path="/terms" render={(props) => <Terms {...props} pageName="Terms of Use" />} />
          <Route path="/sign" render={(props) => <Sign {...props} pageName="Sign In" />} />
          <Route exact path="/" render={(props) => <Main {...props} pageName="Main" />} />
          <Route path="*" render={(props) => <NotFound {...props} pageName="404" />} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);