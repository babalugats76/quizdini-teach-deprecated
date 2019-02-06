import React from 'react';
import classNames from 'classnames';
import Label from './Label';

const TextInput = ({ type, id, label, maxlength, value, onChange, ...props }) => {

  const txtPct = ((maxlength - value.length) / maxlength) * 100;

  const txtClass = classNames(
    'input-group-text',
    'text-white',
    { 'bg-danger': txtPct <= 10, 'bg-warning': txtPct <= 30, 'bg-success': txtPct > 30 }
  );

  return (
    <div className="form-group">
      <Label htmlFor={id}>{label}</Label>
      <div className="input-group">
        <input
          id={id}
          type="type"
          maxLength={maxlength}
          value={value}
          onChange={onChange}
          className="form-control"
          {...props}
        />
        <div className="input-group-append">
          <span className={txtClass}>{maxlength - value.length}</span>
        </div>
      </div>
    </div>
  );
}

export default TextInput;