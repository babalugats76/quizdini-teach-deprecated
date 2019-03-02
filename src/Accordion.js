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

export default class MyAccordion extends Component {

  state = {
    open: this.props.openOnStart,
    errors: this.props.childErrors
  }

  /**
  * Check for change in childErrors prop
  * If child components are in error, force accordion open
  */
  componentDidUpdate(oldProps) {
    const newProps = this.props
    if (oldProps.childErrors !== newProps.childErrors) {
      this.setState((state) => {
        return {
          errors: !!newProps.childErrors,
          open: state.open || !!newProps.childErrors
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
      if (state.errors) return { open: true }
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
            size='20' />
          Game Options
          <Icon
            icon='arrow'
            size='20'
            classes={open ? "open" : "closed"} />
        </Accordion.Title>
        <Accordion.Content active={open}>{children}</Accordion.Content>
      </Accordion>
    );
  }

}

MyAccordion.propTypes = {
  openOnStart: PropTypes.bool.isRequired,
  childErrors: PropTypes.bool.isRequired,
  children: PropTypes.node
};

MyAccordion.defaultProps = {
  openOnStart: false,
  childErrors: false
};

/* To get around namespace conflicts */
export { MyAccordion as Accordion };