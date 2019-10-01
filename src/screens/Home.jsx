import React, { Fragment } from 'react';

import Alert from '../components/layout/Alert';
import Users from '../components/users/Users';
import Search from '../components/users/Search';

const Home = () => (
  <Fragment>
    <Alert />
    <Search />
    <Users />
  </Fragment>
);

export default Home;
