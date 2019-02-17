import React from 'react';
import { Label } from 'semantic-ui-react';

const MyLabel = ({ children, ...props }) => {
  return (
    <Label {...props}>
      {children}
    </Label>
  );
};

export default MyLabel;
export {MyLabel as Label};