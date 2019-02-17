import React from 'react';
import { Dropdown as UIDropdown } from 'semantic-ui-react';
import Label from './Label';

const Dropdown = ({ id, placeholder, value, onChange, label, ...props }) => {
  return (
    <React.Fragment>
      <Label htmlFor={id}>{label}</Label>
      <UIDropdown
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </React.Fragment>
  )
}

export default Dropdown;