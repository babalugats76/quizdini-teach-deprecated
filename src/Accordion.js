import React, { Component } from 'react';
import { Accordion } from 'semantic-ui-react';

export class MyAccordion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: props.openOnStart
    }
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
        <Accordion.Title active={active} onClick={(event, titleProps) => this.handleClick(event, titleProps)}>Game Options</Accordion.Title>
        <Accordion.Content active={active}>
          {children}
        </Accordion.Content>
      </Accordion>
    );
  }

} 


export default MyAccordion;
export {MyAccordion as Accordion};