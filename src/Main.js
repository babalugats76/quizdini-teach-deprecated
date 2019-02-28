import React from 'react';
import {
  Container,
} from 'semantic-ui-react';
// eslint-disable-next-line
import Hello from './Hello';
import MatchGame from './MatchGame';
// eslint-disable-next-line
import { Switch, Route, Link } from "react-router-dom";

const Main = () => (
  <Container>
    <Switch>
      <Route path="/hello" component={Hello} />
      <Route exact path="/match" component={MatchGame} />
    </Switch>
  </Container>
);

export default Main;