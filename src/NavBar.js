import React from 'react';
import {
  Menu,
  Container,
} from 'semantic-ui-react';
// eslint-disable-next-line
import Hello from './Hello';
// eslint-disable-next-line
import MatchGame from './MatchGame';
// eslint-disable-next-line
import { Switch, Route, Link } from "react-router-dom";

const NavBar = () => (
  <Menu fixed='top' inverted size="massive">
    <Container>
      <Menu.Item as={Link} to='/hello'>Hello, World!</Menu.Item>
      <Menu.Item as={Link} to='/match'>New Match Game</Menu.Item>
    </Container>
  </Menu>
);

export default NavBar;