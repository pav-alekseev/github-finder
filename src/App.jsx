import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '@fortawesome/fontawesome-free/css/all.min.css';

import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchGithubUser = async () => {
      const { data: fetchedUsers } = await axios.get(
        'https://api.github.com/users'
      );
      setUsers(fetchedUsers);
    };
    fetchGithubUser();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Users users={users} />
      </div>
    </div>
  );
};

export default App;
