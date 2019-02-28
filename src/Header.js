import React, { Component } from 'react';
import {
  Container,
  Header
} from 'semantic-ui-react';


export default class extends Component {
  render() {
    return (
      <Container style={{'marginTop': '1em'}} fluid>
        <Header as='h1'>Content of Header goes in here</Header>
      </Container>
    );
  }
}