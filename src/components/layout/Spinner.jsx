import React, { Fragment } from 'react';

import spinner from './spinner.gif';

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      alt="Loading"
      style={{ display: 'block', width: '200px', margin: 'auto' }}
    />
  </Fragment>
);

export default Spinner;
