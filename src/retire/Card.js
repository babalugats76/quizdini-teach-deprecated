import React, { Component } from 'react';
import classNames from 'classnames';
import Accordian from '../Accordion';

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
// eslint-disable-next-line
    const { title, text } = this.props;
    const { timeout, isOpen } = this.state;

    const cardClass = classNames(
      'card',
      'text-center',
      { 'expand': isOpen, 'collapse': !isOpen, 'show': !isOpen }
    );

    const createMarkup = (text) => { return {__html: text }; };

    return (
      <div className={cardClass}>
        <div className="card-body">
          <h5 
             className="card-title" 
             dangerouslySetInnerHTML={createMarkup(title)}
             onClick={(e) => this.handleTitleClick(e)}>
          </h5>
            <Accordian timeout={timeout} isOpen={isOpen}>
              <p className="card-text" dangerouslySetInnerHTML={createMarkup(text)} />
            </Accordian>
        </div>
      </div>
    );
  }

}

export default Card;