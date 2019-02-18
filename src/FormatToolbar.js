import React from 'react';
import { Button } from 'semantic-ui-react';
import { IconUnderline, IconCode, IconSuperscript, IconSubscript, IconClearFormatting, IconPi } from './Icons';

const IconButton = ({ children, ...props }) => (
  <Button icon {...props}>
    {children}
  </Button>
)

const FormatToolbar = ({ buttons, ...props }) => {

  const btns = buttons.map((btn, idx) => {

    const { type, ...props} = btn;
    
    let icon;

    switch (type) {
      case 'underline':
        icon = <IconUnderline />;
        break;
      case 'code':
        icon = <IconCode />;
        break;
      case 'superscript':
        icon = <IconSuperscript />;
        break;     
      case 'subscript':
        icon = <IconSubscript />;
        break; 
      case 'clear-formatting':
        icon = <IconClearFormatting />;
        break;                     
      case 'pi':
        icon = <IconPi />;
        break;  
      default:
        break;
    }

    return (<IconButton key={idx} {...props}>{icon}</IconButton>);

  });

  return (
    <Button.Group>{btns}</Button.Group>
  );

}

export default FormatToolbar;