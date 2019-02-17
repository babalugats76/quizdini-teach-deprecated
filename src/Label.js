import React from 'react';
import { Label as UILabel } from 'semantic-ui-react';

const Label = ({ children, ...props }) => {
  return (
    <UILabel {...props}>
      {children}
    </UILabel>
  );
};

export default Label;