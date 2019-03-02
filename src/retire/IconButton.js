import React from 'react';
import { Button } from 'semantic-ui-react';

const IconButton = ({ children, ...props }) => (
  <Button icon {...props}>
     {children}
  </Button>
)

export default IconButton;