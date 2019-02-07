import React from 'react';
import { Transition } from 'react-transition-group';

const StyleTransition = ({ children, ...props }) => {

  /**
   * @param {Object} styles - Style objects for each transition state
   */
  const getStyles = (styles) => (transitionState) => {
    return {...styles['default'], ...styles[transitionState] };
  };

  /**
   * Return transition after cloning children and pushing down style
   * Make sure props.styles is pushed down to rendered HTML
   */
  return (<Transition {...props}>
    {(transitionState, innerProps) => React.cloneElement(children, {
      style: getStyles({...props.transitionStyles})(transitionState)
    })}
  </Transition>);

};

export default StyleTransition;