import React from 'react';
// eslint-disable-next-line
import { Dropdown, Image, Label, Segment, Header } from 'semantic-ui-react';
import SVGIcon from "./SVGIcon";


const InputDropdown = ({ id, label, icon, options, error, value, setFieldValue, ...props }) => {

  const onChange = (event, data) => {
    event.preventDefault();
    setFieldValue(id, data.value);
  } 
 

  return (
    <React.Fragment>
      <Header>
        <SVGIcon name={icon} />
        <p>{label}</p>
      </Header>
      <Dropdown
        id={id}
        options={options}
        error={error}
        value={value}
        onChange={(event, data) => onChange(event, data)}
        {...props}
      />
    </React.Fragment>
  );
}

export default InputDropdown;