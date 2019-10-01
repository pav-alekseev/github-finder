import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING,
} from '../types';

const githubClientId =
  process.env.NODE_ENV === 'production'
    ? process.env.GITHUB_CLIENT_ID
    : process.env.REACT_APP_GITHUB_CLIENT_ID;

const githubClientSecret =
  process.env.NODE_ENV === 'production'
    ? process.env.GITHUB_CLIENT_SECRET
    : process.env.REACT_APP_GITHUB_CLIENT_SECRET;

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const searchUsers = async text => {
    setLoading();

    try {
      const {
        data: { items: users },
      } = await axios.get(
        `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret${githubClientSecret} `
      );

      dispatch({
        type: SEARCH_USERS,
        payload: users,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async login => {
    setLoading();

    try {
      const { data } = await axios.get(
        `https://api.github.com/users/${login}?client_id=${githubClientId}&client_secret${githubClientSecret} `
      );

      dispatch({ type: GET_USER, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  const getUserRepos = async login => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        `https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret${githubClientSecret} `
      );

      dispatch({
        type: GET_REPOS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        getUser,
        clearUsers,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
