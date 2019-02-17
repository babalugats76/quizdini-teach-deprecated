import React from 'react';
import { Form } from 'semantic-ui-react';
import Label from './Label';


const Dropdown = ({ id, placeholder, value, onChange, label, ...props }) => {
  return (
    <React.Fragment>
      <Label htmlFor={id}>{label}</Label>
      <Form.Dropdown
        placeholder={placeholder}
        value={value}
        labeled
        button
        onChange={onChange}
        {...props}
      />
    </React.Fragment>
  )
}

export default Dropdown;