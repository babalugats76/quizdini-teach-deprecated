import React from 'react';

import Label from './Label';

const TextInput = ({type, id, label, value, onChange, ...props}) => {
  return (
    <div className="form-group">
      <Label htmlFor={id}>{label}</Label>
      <input 
        id={id} 
        type="type" 
        value={value} 
        onChange={onChange}
        className="form-control"
        {...props} />
    </div>
  );
}

export default TextInput;