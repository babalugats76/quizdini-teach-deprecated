import React, { Component } from 'react';
import NavBar from './NavBar';
import Header from './Header';
import Main from './Main';
export default class extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Header />
        <Main />
      </div>);
  }
}