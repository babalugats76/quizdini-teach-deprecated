import React, { Component } from 'react';
import { Accordion } from 'semantic-ui-react';
import Icon from './Icon';

export class MyAccordion extends Component {

  state = {
    open: this.props.openOnStart,
    errors: this.props.childErrors
  }

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

  handleClick = (event, titleProps) => {
    this.setState((state, props) => {
      if (state.errors) return { open: true }
      return { open: !state.open }
    });
  }

  render() {

    const { children } = this.props;
    const { open } = this.state;

    return (
      <Accordion fluid styled>
        <Accordion.Title active={open} onClick={(event, titleProps) => this.handleClick(event, titleProps)}>
          <Icon icon='cog' size='20' verticalAlign='middle' styles={{ 'margin': '5px' }} />
          Game Options
        </Accordion.Title>
        <Accordion.Content active={open}>
          {children}
        </Accordion.Content>
      </Accordion>
    );
  }

} 


export default MyAccordion;
export {MyAccordion as Accordion};