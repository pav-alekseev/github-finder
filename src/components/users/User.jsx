import React, { Fragment, useEffect, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';

import GithubContext from '../../context/github/githubContext';

import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);

  const getUserCallback = useCallback(githubContext.getUser, []);
  const getUserReposCallback = useCallback(githubContext.getUserRepos, []);

  useEffect(() => {
    getUserCallback(match.params.login);
  }, [getUserCallback, match.params.login]);

  useEffect(() => {
    getUserReposCallback(match.params.login);
  }, [getUserReposCallback, match.params.login]);

  if (githubContext.loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <Link to="/" className="btn btn-light">
        Back To Search
      </Link>
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={githubContext.user.avatar_url}
            alt="Avatar"
            style={{ width: '150px' }}
          />
          <h1>{githubContext.user.name && githubContext.user.name}</h1>
          <p>
            {githubContext.user.location &&
              `Location: ${githubContext.user.location}`}
          </p>
        </div>
        <div>
          {githubContext.user.bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{githubContext.user.bio}</p>
            </Fragment>
          )}
          <a href={githubContext.user.html_url} className="btn btn-dark my-1">
            Visit Github profile
          </a>
          <ul>
            <li>
              {githubContext.user.login && (
                <Fragment>
                  <strong>Username: </strong>
                  {githubContext.user.login}
                </Fragment>
              )}
            </li>
            <li>
              {githubContext.user.company && (
                <Fragment>
                  <strong>Company: </strong>
                  {githubContext.user.company}
                </Fragment>
              )}
            </li>
            <li>
              {githubContext.user.blog && (
                <Fragment>
                  <strong>Website: </strong>
                  {githubContext.user.blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">
          Followers: {githubContext.user.followers}
        </div>
        <div className="badge badge-success">
          Following: {githubContext.user.following}
        </div>
        <div className="badge badge-light">
          Public Repos: {githubContext.user.public_repos}
        </div>
        <div className="badge badge-dark">
          Public Gist: {githubContext.user.public_gists}
        </div>
      </div>
      <Repos repos={githubContext.repos} />
    </Fragment>
  );
};

export default User;
