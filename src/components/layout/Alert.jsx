import React from 'react';

const Alert = ({ alert, hideAlert }) => {
  return (
    alert && (
      <div
        className={`alert alert-${alert.type}`}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <i className="fas fa-info-circle" style={{ marginRight: '0.3rem' }} />
        {alert.message}
        <button className="btn" style={{ marginLeft: 'auto', padding: 0 }}>
          <i className="far fa-times-circle" onClick={hideAlert} />
        </button>
      </div>
    )
  );
};

export default Alert;
