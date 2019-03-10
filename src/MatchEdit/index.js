import React, { Component } from 'react';
// eslint-disable-next-line
import loadMatch from './loadData';
import View from './View';

export default class extends Component {
  
  state = { loading: true };
  load = this.load.bind(this); // bind this way due to async/await arrow function bug in Babel

  async load (...args) {
    try {
      this.setState({ loading: true, error: false });
      const data = await loadMatch(...args);
      this.setState({ loading: false, data });
    } catch (ex) {
      this.setState({ loading: false, error: true, exception: ex.toString() });
    }
  }

  render() {
    return (
       <View {...this.props} {...this.state} onLoad={this.load} />
    );
  }
}