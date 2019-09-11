import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import '@fortawesome/fontawesome-free/css/all.min.css';

import './App.css';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import Search from './components/users/Search';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const searchUsers = async text => {
    setLoading(true);

    try {
      const {
        data: { items },
      } = await axios.get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET} `
      );

      setUsers(items);
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
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} hideAlert={hideAlert} />
          <Switch>
            <Route
              path="/"
              render={props => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0}
                    showAlert={showAlert}
                  />
                  <Users users={users} loading={loading} />
                </Fragment>
              )}
              exact
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
