import React, { Fragment, useState } from 'react';
import axios from 'axios';

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
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const getUser = async login => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        `https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET} `
      );

      setUser(data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const getUserRepos = async login => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        `https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET} `
      );

      setRepos(data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const clearUsers = () => {
    setUsers([]);
  };

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
                    <Search
                      clearUsers={clearUsers}
                      showClear={users.length > 0}
                      showAlert={showAlert}
                    />
                    <Users />
                  </Fragment>
                )}
                exact
              />
              <Route path="/about" component={About} />
              <Route
                path="/user/:login"
                render={props => (
                  <User
                    {...props}
                    getUser={getUser}
                    getUserRepos={getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
