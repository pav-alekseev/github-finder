import React, { useContext } from 'react';

import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alert && (
      <div
        className={`alert alert-${alertContext.alert.type}`}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <i className="fas fa-info-circle" style={{ marginRight: '0.3rem' }} />
        {alertContext.alert.message}
        <button className="btn" style={{ marginLeft: 'auto', padding: 0 }}>
          <i className="far fa-times-circle" onClick={alertContext.hideAlert} />
        </button>
      </div>
    )
  );
};

export default Alert;
