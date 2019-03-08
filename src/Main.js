import React from 'react';
import {
  Container,
} from 'semantic-ui-react';
// eslint-disable-next-line
import Hello from './Hello';
import MatchEdit from './MatchEdit';
// eslint-disable-next-line
import { Switch, Route, Link } from "react-router-dom";

const Main = () => (
  <Container>
    <Switch>
      <Route path="/hello" component={Hello} />
      <Route path="/match" render={(props) => (<MatchEdit {...props} initialQuery='2' /> )} />
    </Switch>
  </Container>
);

export default Main;