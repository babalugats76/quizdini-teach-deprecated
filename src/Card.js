import React, { Component } from 'react';
import StyleTransition from './StyleTransition';

class Card extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      open: false ,
      timeout: 800
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
      default: {  maxheight: '0', overflow: 'hidden' },
      entering: {  transition: `max-height ${timeout}ms ease-in-out`, maxHeight: '1000px', 'height': 'auto', overflow: 'hidden' },
      entered: {  maxHeight: '1000px', 'height': 'auto', overflow: 'hidden' },
      exiting: { transition: `max-height ${timeout}ms ease-out`, maxHeight: 0, 'height': 'auto', overflow: 'hidden' },
      exited: {  height: '0', overflow: 'hidden' }
    };


    return (
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title" onClick={(e) => this.handleClick(e)}>{title}</h5>
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