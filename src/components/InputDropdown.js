import React from 'react';
// eslint-disable-next-line
import { Dropdown, Image, Label, Segment, Header } from 'semantic-ui-react';
import Icon from './Icon';

const InputDropdown = ({ name, label, icon, options, error, value, setFieldValue, ...props }) => {

  const onChange = (event, data) => {
    event.preventDefault();
    setFieldValue(name, data.value);
  } 
 
  return (
    <React.Fragment>
      <Header as='h4' icon textAlign="center">
         <Icon size={48} icon={icon} />
         {label}
      </Header>
      <Dropdown
        id={name}
        name={name}
        options={options}
        value={value}
        onChange={(event, data) => onChange(event, data)}
        error={!!error}
        {...props}
      />
    </React.Fragment>
  );
}

export default InputDropdown;