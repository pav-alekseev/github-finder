import React, { Fragment, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';

const User = ({ getUser, user, loading, match }) => {
  const getUserCallback = useCallback(getUser, []);

  useEffect(() => {
    getUserCallback(match.params.login);
  }, [getUserCallback, match.params.login]);

  if (loading) {
    return <Spinner />;
  }

  console.log(user);

  return (
    <Fragment>
      <Link to="/" className="btn btn-light">
        Back To Search
      </Link>
      <div className="card grid-2">
        <div className="all-center">
          <img src={user.avatar_url} alt="Avatar" style={{ width: '150px' }} />
          <h1>{user.name && user.name}</h1>
          <p>{user.location && `Location: ${user.location}`}</p>
        </div>
        <div>
          {user.bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{user.bio}</p>
            </Fragment>
          )}
          <a href={user.html_url} className="btn btn-dark my-1">
            Visit Github profile
          </a>
          <ul>
            <li>
              {user.login && (
                <Fragment>
                  <strong>Username: </strong>
                  {user.login}
                </Fragment>
              )}
            </li>
            <li>
              {user.company && (
                <Fragment>
                  <strong>Company: </strong>
                  {user.company}
                </Fragment>
              )}
            </li>
            <li>
              {user.blog && (
                <Fragment>
                  <strong>Website: </strong>
                  {user.blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {user.followers}</div>
        <div className="badge badge-success">Following: {user.following}</div>
        <div className="badge badge-light">
          Public Repos: {user.public_repos}
        </div>
        <div className="badge badge-dark">Public Gist: {user.public_gists}</div>
      </div>
    </Fragment>
  );
};

User.propTypes = {
  getUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default User;
