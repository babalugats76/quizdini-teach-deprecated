import React, { Component } from 'react';
// eslint-disable-next-line
import { Switch, Route, Link } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Hello from './Hello';
import MatchGame from './MatchGame';
import './App.scss';
import './fomantic/dist/semantic.css';

class App extends Component {
  render() {
    return (
        <Container>
          <Switch>
            <Route path="/hello" component={Hello} />
            <Route exact path="/" component={MatchGame} />
          </Switch>
        </Container>
    );
  }
}

export default App;