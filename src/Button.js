import React from 'react';
import { Button } from 'semantic-ui-react';
import Icon from './Icon';

const MyButton = ({ children, icon, ...props }) => {
  return (
    <Button icon labelPosition='left' {...props} >
      Save
      <Icon icon={icon} size={15} />
    </Button>);
};

export default MyButton;
export { MyButton as Button };