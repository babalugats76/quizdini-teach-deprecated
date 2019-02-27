import React, { Component } from 'react';
import FixedMenu from './FixedMenu';
import Header from './Header';
import Main from './Main';
export default class Layout extends Component {

  render() {
    return (
      <div>
        <Header />
        <FixedMenu />
        <Main />
      </div>);
  }
}