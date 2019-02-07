import React, { Component } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MatchGame from './MatchGame';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={MatchGame} />
      </Router>
    );
  }
}

export default App;