import React, { Fragment, useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';

import GithubState from './context/github/GithubState';

import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import Search from './components/users/Search';
import User from './components/users/User';
import About from './screens/About';

import './App.css';

const App = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ message, type });

    setTimeout(() => setAlert(null), 5000);
  };

  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route
                path="/"
                render={props => (
                  <Fragment>
                    <Alert alert={alert} hideAlert={hideAlert} />
                    <Search showAlert={showAlert} />
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
    </GithubState>
  );
};

export default App;
