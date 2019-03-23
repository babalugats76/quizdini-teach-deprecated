import React from 'react';
import { Accordion } from 'semantic-ui-react';
import Icon from './Icon';
import PropTypes from 'prop-types';

/**
 * Wraps Semantic UI's Accordion adding key functionality
 *
 * CSS styles can be found in site-level accordion.overrides file
 * Custom inline SVG icons are used in lieu of Semantic's
 */

const MyAccordion = ({ index, open, forceOpen, onClick, children }) => {
  /**
   * Render children in wrapped Semantic Accordion component
   * Use custom Icon component throughout
   */
  return (
    <Accordion fluid styled>
      <Accordion.Title
        index={index}
        active={open || forceOpen}
        onClick={(event, titleProps) => onClick(event, titleProps)}
      >
        <Icon icon='cog' size={15} />
        Game Options
        <Icon
          icon='arrow'
          size={20}
          classes={open || forceOpen ? 'open' : 'closed'}
        />
      </Accordion.Title>
      <Accordion.Content active={open || forceOpen}>
        {children}
      </Accordion.Content>
    </Accordion>
  );
};

MyAccordion.propTypes = {
  index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  open: PropTypes.bool.isRequired,
  forceOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node
};

MyAccordion.defaultProps = {
  open: false,
  forceOpen: false
};

/* To get around namespace conflicts */
export default MyAccordion;
export { MyAccordion as Accordion };
