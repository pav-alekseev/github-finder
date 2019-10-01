import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import GithubContext from '../../context/github/githubContext';

const Search = ({ clearUsers, showClear, showAlert }) => {
  const [text, setText] = useState('');
  const githubContext = useContext(GithubContext);

  const onChange = e => setText(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    if (!text) {
      showAlert('Please enter something', 'light');
    } else {
      githubContext.searchUsers(text);
      setText('');
    }
  };

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          value={text}
          onChange={onChange}
          placeholder="Search Users..."
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {showClear && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default Search;
