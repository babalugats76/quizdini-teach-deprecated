import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import Icon from './Icon';

const MyButton = ({ children, icon, type, labelPosition, ...props }) => {
  return (
    <Button 
       icon 
       type={type}
       labelPosition={labelPosition} 
       {...props} >
      {children}
      <Icon icon={icon} size={15} />
    </Button>);
};

MyButton.propTypes = {
  children: PropTypes.any,
  icon: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  labelPosition: PropTypes.string.isRequired,
  props: PropTypes.object
};

MyButton.defaultProps = {
  type: "submit",  // Pass as="label" and provide events to simulate default type="button" behavior
  labelPosition: "left"
};

export default MyButton;
export { MyButton as Button };