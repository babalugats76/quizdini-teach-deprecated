import React from 'react';
import StyleTransition from './StyleTransition';

const Accordian = ({ timeout, isOpen, children, ...props }) => {

  /* Define object for the following states: 'default', 'entering', 'entered', 'exiting', 'exited' */
  const transitionStyles = {
    default: { maxHeight: '0', overflow: 'hidden', height: '0' },
    entering: { maxHeight: '0', overflow: 'hidden', height: '0' },
    entered: { transition: `max-height ${timeout}ms ease-in-out`, maxHeight: '1000px', 'height': 'auto', overflow: 'hidden' },
    exiting: { transition: `max-height ${timeout}ms ease-in-out`, maxHeight: '0', 'height': 'auto', overflow: 'hidden' },
    exited: { maxHeight: '0', height: '0', overflow: 'hidden' }
  };

  return (
    <StyleTransition
      mountOnEnter={true}
      unmountOnExit={false}
      appear={true}
      in={isOpen}
      timeout={timeout}
      transitionStyles={transitionStyles}
    >
      {children}
    </StyleTransition>
  );
}

export default Accordian;