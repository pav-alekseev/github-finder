import React, { Fragment } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import Search from './components/users/Search';
import User from './components/users/User';
import About from './screens/About';

import './App.css';

const App = () => (
  <GithubState>
    <AlertState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route
                path="/"
                render={props => (
                  <Fragment>
                    <Alert />
                    <Search />
                    <Users />
                  </Fragment>
                )}
                exact
              />
              <Route path="/about" component={About} />
              <Route path="/user/:login" component={User} />
            </Switch>
          </div>
        </div>
      </Router>
    </AlertState>
  </GithubState>
);

export default App;
