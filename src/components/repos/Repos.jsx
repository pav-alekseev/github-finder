import React from 'react';
import PropTypes from 'prop-types';

import RepoItem from './RepoItem';

const Repos = ({ repos }) =>
  repos.map(repo => <RepoItem repo={repo} key={repo.id} />);

Repos.propType = {
  repos: PropTypes.array.isRequired,
};

export default Repos;
