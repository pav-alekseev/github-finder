import React, { useReducer } from 'react';

import GithubService from '../../api/services/github-service';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING,
} from '../types';

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);
  const githubService = new GithubService();

  const searchUsers = async text => {
    setLoading();

    try {
      const {
        data: { items: users },
      } = await githubService.searchUser(text);

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
      const { data } = await githubService.getUser(login);

      dispatch({ type: GET_USER, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  const getUserRepos = async login => {
    setLoading(true);

    try {
      const { data } = await githubService.getUserRepos(login);

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
