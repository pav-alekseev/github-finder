import React from 'react';
import PropTypes from 'prop-types';

const UserItem = ({ user: { login, avatar_url, html_url } }) => (
  <div className="card text-center">
    <img
      className="round-img"
      src={avatar_url}
      alt="avatar"
      style={{ backgroundColor: 'red', width: '60px' }}
    />
    <h3>{login}</h3>
    <div>
      <a href={html_url} className="btn btn-dark btn-sm my-1">
        More
      </a>
    </div>
  </div>
);

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
