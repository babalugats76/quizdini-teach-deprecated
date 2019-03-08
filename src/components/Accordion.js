import React, { Component } from 'react';
import { Accordion } from 'semantic-ui-react';
import Icon from './Icon';
import PropTypes from 'prop-types';

/**
 * Wraps Semantic UI's Accordion adding key functionality
 * 
 * CSS styles can be found in site-level accordion.overrides file
 * Custom inline SVG icons are used in lieu of Semantic's
 */

class MyAccordion extends Component {

  state = {
    open: this.props.openOnStart,
    forceOpen: this.props.forceOpen
  }

  /**
  * Check for change in forceOpen prop
  * If true, force accordion open
  */
  componentDidUpdate(oldProps) {
    const newProps = this.props
    if (oldProps.forceOpen !== newProps.forceOpen) {
      this.setState((state) => {
        return {
          forceOpen: !!newProps.forceOpen,
          open: state.open || !!newProps.forceOpen
        }
      });
    }
  }

  /**
   * @param {Event} e Event to handle.
   * If child components are in error, force accordion open
   * Otherwise, toggle open state of accordion
   */
  handleClick = (e, titleProps) => {
    this.setState((state, props) => {
      if (state.forceOpen) return { open: true }
      return { open: !state.open }
    });
  }

  /**
   * Render children in wrapped Semantic Accordion component 
   * Use custom Icon component throughout
   */
  render() {

    const { children } = this.props;
    const { open } = this.state;

    return (
      <Accordion fluid styled>
        <Accordion.Title
          active={open}
          onClick={(event, titleProps) => this.handleClick(event, titleProps)}>
          <Icon 
            icon='cog' 
            size={20} />
          Game Options
          <Icon
            icon='arrow'
            size={20}
            classes={open ? "open" : "closed"} />
        </Accordion.Title>
        <Accordion.Content active={open}>{children}</Accordion.Content>
      </Accordion>
    );
  }

}

MyAccordion.propTypes = {
  openOnStart: PropTypes.bool.isRequired,
  forceOpen: PropTypes.bool.isRequired,
  children: PropTypes.node
};

MyAccordion.defaultProps = {
  openOnStart: false,
  forceOpen: false
};

/* To get around namespace conflicts */
export default MyAccordion;
export { MyAccordion as Accordion };