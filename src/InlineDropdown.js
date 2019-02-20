import React from 'react';
import { Dropdown } from 'semantic-ui-react';
// eslint-disable-next-line
import { IconSuperscript } from './Icons';
import { Label } from './Label';

const InlineDropdown = ({ id, placeholder, value, onChange, label, ...props }) => {

  const friendOptions = [
    {
      text: 'Jenny Hess',
      value: 'Jenny Hess'
    },
    {
      text: 'James Colestock',
      value: 'James Colestock'
    },
  ];


  return (
    <React.Fragment>
      <Label icon='fa-object-group'>{label}</Label>{' '}
      <Dropdown options={friendOptions} defaultValue={friendOptions[0].value} />
    </React.Fragment>
  );

}

export default InlineDropdown;