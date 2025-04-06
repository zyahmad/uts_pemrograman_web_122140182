import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ message }) => {
  return (
    <div className="error-container">
      <h2>Oops! Something went wrong</h2>
      <p>{message || 'An unexpected error occurred. Please try again later.'}</p>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string
};

export default Error;