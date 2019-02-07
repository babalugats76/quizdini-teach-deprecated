import React, { Component } from 'react';
import classNames from 'classnames';
import Accordian from './Accordian';

class Card extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      isOpen: true,
      timeout: 500
    }
  }

  /**
   * @param {Event} e  Event to handle.
   * Toggle the collapse state of component (used to power the accordian)
   */
  handleTitleClick = (e) => {
    this.setState((state, props) => {
      return { isOpen: !state.isOpen }
    });
  }

  render() {

    const { title, text } = this.props;
    const { timeout, isOpen } = this.state;

    const cardClass = classNames(
      'card',
      'text-center',
      { 'expand': isOpen, 'collapse': !isOpen, 'show': !isOpen }
    );

    return (
      <div className={cardClass}>
        <div className="card-body">
          <h5 className="card-title" onClick={(e) => this.handleTitleClick(e)}>{title}</h5>
            <Accordian timeout={timeout} isOpen={isOpen}>
              <p className="card-text">{text}</p>
            </Accordian>
        </div>
      </div>
    );
  }

}

export default Card;