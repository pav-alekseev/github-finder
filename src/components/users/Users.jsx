import React, { useContext } from 'react';

import GithubContext from '../../context/github/githubContext';

import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

const Users = () => {
  const githubContext = useContext(GithubContext);

  if (githubContext.loading) {
    return <Spinner />;
  }

  return (
    <div className="grid-3">
      {githubContext.users.map(user => (
        <UserItem user={user} key={user.id} />
      ))}
    </div>
  );
};

export default Users;
