import React from 'react';
import PropTypes from 'prop-types';

const InputFeedback = ({ error, ...props }) => (
  <React.Fragment>
    {
      error
      &&
      (<div className="input-feedback" {...props}>{error}</div>)
    }
  </React.Fragment>
);

InputFeedback.propTypes = {
  error: PropTypes.string
};

export default InputFeedback;