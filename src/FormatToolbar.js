import React from 'react';
import { Button } from 'semantic-ui-react';
import SVGIcon from './SVGIcon';
// eslint-disable-next-line
import { IconUnderline, IconCode, IconSuperscript, IconSubscript, IconClearFormatting, IconPi } from './Icons';

const IconButton = ({ children, ...props }) => (
  <Button icon {...props}>
    {children}
  </Button>
)

const FormatToolbar = ({ buttons, ...props }) => {

  const btns = buttons.map((btn, idx) => {
    const { icon, ...props } = btn;
    return (
      <IconButton key={idx} {...props}>
        <SVGIcon name={icon} className="icon" />
      </IconButton>);
  });

  return (
    <Button.Group>{btns}</Button.Group>
  );

}

export default FormatToolbar;