import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {
  const initialState = {
    alert: null,
  };

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const showAlert = (message, type) => {
    dispatch({ type: SET_ALERT, payload: { message, type } });

    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
  };

  const hideAlert = () => dispatch({ type: REMOVE_ALERT });

  return (
    <AlertContext.Provider value={{ alert: state.alert, showAlert, hideAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
