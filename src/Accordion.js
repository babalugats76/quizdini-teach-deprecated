import React, { Component } from 'react';
import { Accordion } from 'semantic-ui-react';
import Icon from './Icon';

export class MyAccordion extends Component {

  state = {
    active: this.props.openOnStart
  }

  handleClick = (event, titleProps) => {
    this.setState((state, props) => {
      return { active: ! state.active }
    });
  }

  render() {

    const { children } = this.props;
    const { active } = this.state;

    return (
      <Accordion fluid styled>
        <Accordion.Title as='h1' active={active} onClick={(event, titleProps) => this.handleClick(event, titleProps)}>
          <Icon icon='cog' size='20' styles={{ 'margin': '5px' }} />
          Game Options
        </Accordion.Title>
        <Accordion.Content active={active}>
          {children}
        </Accordion.Content>
      </Accordion>
    );
  }

} 


export default MyAccordion;
export {MyAccordion as Accordion};