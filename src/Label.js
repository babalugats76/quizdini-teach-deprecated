import React from 'react';
// eslint-disable-next-line
import { Label, Icon } from 'semantic-ui-react';
// eslint-disable-next-line
import { IconSubscript } from './Icons';

const MyLabel = ({ icon = '', children, ...props }) => {
  return (
    <Label image {...props}>
      { icon && <Icon name={icon} />} 
      {children}
      <Label.Detail>{children}</Label.Detail>
    </Label>
  );
};

export default MyLabel;
export {MyLabel as Label};