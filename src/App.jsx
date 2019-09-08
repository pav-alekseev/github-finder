import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Users />
      </div>
    </div>
  );
};

export default App;
