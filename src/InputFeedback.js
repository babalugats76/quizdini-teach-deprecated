import React from 'react';

const InputFeedback = ({ error, ...props }) => {

  return (
    <React.Fragment>
    { error 
      ? (<div className="input-feedback" {...props}>{error}</div>) 
      : null }
    </React.Fragment>
  );
  
}

export default InputFeedback;