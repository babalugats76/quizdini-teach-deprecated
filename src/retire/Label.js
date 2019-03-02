import React from 'react';
// eslint-disable-next-line
import { Label, Icon } from 'semantic-ui-react';

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