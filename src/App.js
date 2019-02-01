import React, { Component } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MatchGameCreator from './MatchGameCreator';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={MatchGameCreator} />
      </Router>
    );
  }
}

export default App;