import React from 'react';
import { Button } from 'semantic-ui-react';
import Icon from './Icon';
// eslint-disable-next-line


const FormatToolbar = ({ buttons, ...props }) => {

  // Loop through metadata to create buttons
  const btns = buttons.map((btn, idx) => {
    const { icon, tooltip, onClick, ...props } = btn;
    return (
      <Button key={idx} icon title={tooltip} onClick={onClick} {...props}>
        <Icon icon={icon} {...props} />
      </Button>);
  });

  return (
    <Button.Group>{btns}</Button.Group>
  );

}

export default FormatToolbar;