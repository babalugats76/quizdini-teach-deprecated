import React, { Component } from 'react';
// eslint-disable-next-line
import loadMatch from './loadData';
import View from './View';

export default class extends Component {
  
  state = { loading: true };
  load = this.load.bind(this); // bind this way due to async/await arrow function bug in Babel

  componentDidMount() {
    console.log('Component mounted...');
    console.log(this.props.initialQuery);
  }

  async load (...args) {
    console.log('calling load in index...');
    console.log('here are the args...', args);
    try {
      console.log('attempting to set loading state...');
      this.setState({ loading: true, error: false });
      console.log('attempting to load match data...');
      const data = await loadMatch(...args);
      this.setState({ loading: false, data });
    } catch (ex) {
      console.log('There was an error');
      this.setState({ loading: false, error: true });
    }
  }

  render() {
    return (
       <View {...this.props} {...this.state} onLoad={this.load} />
    );
  }
}