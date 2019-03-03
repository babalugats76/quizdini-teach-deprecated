import React from 'react';
// eslint-disable-next-line
import { Button } from 'semantic-ui-react';
import Icon from './Icon';
// eslint-disable-next-line


const FormatToolbar = ({ buttons, ...props }) => {

  // Loop through metadata to create buttons
  const btns = buttons.map((btn, idx) => {
    const { icon, tooltip, onClick, ...props } = btn;
    return (
      <button className="button-toolbar" key={idx} title={tooltip} onClick={onClick} {...props}>
        <Icon icon={icon} size={16} {...props} />
      </button>);
  });

  return (
    <div className="format-toolbar">{btns}</div>
  );

}

export default FormatToolbar;