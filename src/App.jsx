import React, { useState } from 'react';
import axios from 'axios';

import '@fortawesome/fontawesome-free/css/all.min.css';

import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Search searchUsers={searchUsers} />
        <Users users={users} loading={loading} />
      </div>
    </div>
  );
};

export default App;
