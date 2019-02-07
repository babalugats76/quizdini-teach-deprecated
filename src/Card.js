import React, { Component } from 'react';
import StyleTransition from './StyleTransition';

class Card extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      open: false ,
      timeout: 500
    }
  }

  /**
   * @param {Event} e  Event to handle.
   * Toggle the open/close state of component (used as psuedo-accordian)
   */
  handleClick = (e) => {
    this.setState((state, props) => {
      return { open: !state.open }
    });
  }

  render() {
    const { title, text } = this.props;
    const { open, timeout } = this.state;

    /* Define object for the following states: 'default', 'entering', 'entered', 'exiting', 'exited' */
    const transitionStyles = {
      default: {  maxHeight: '0', overflow: 'hidden' },
      entering: { maxHeight: '0', overflow: 'hidden' },
      entered: { transition: `visibility 0ms linear {timeout}ms, opacity {timeout}ms linear`, maxHeight: 'none', overflow: 'visible' },
      exiting: { transition: `opacity {timeout}ms ease-in-out, max-height {timeout} ease-out`, opacity: 1.0, visibility: 'visible', maxHeight: 'none', overflow: 'visible' },
      exited: { opacity: 0, 'color': '#FFFFFF', 'borderColor': '#FFFFFF', maxHeight: '0', overflow: 'hidden' }
    };


    return (
      <div className="card">
        <div className="card-body">
          <p className="card-title" onClick={(e) => this.handleClick(e)}>{title}</p>
          <StyleTransition
            mountOnEnter={true}
            unmountOnExit={true}
            appear={true}
            key={title}
            in={open}
            timeout={timeout}
            transitionStyles={transitionStyles}
          >
            <p className="card-text">{text}</p>
          </StyleTransition> 
        </div>
      </div>
    );
  }

}

export default Card;