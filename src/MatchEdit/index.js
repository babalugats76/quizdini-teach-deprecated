import React, { Component } from 'react';
// eslint-disable-next-line
import loadMatch from './loadData';
import View from './View';

export default class extends Component {
  state = { loading: true };
  load = this.load.bind(this); // bind this way due to async/await arrow function bug in Babel

  loadSuccess = data => {
    this.setState({ loading: false, data });
  };

  loadFail = message => {
    this.setState({ loading: false, error: true, exception: message });
  };

  async load(query, sleep) {
    this.setState({ loading: true, error: false });
    await loadMatch(query, sleep, this.loadSuccess, this.loadFail);
  }

  save(values, setSubmitting) {
    console.log('Inside save function...');
    console.log('Here are the submitted values');
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
    }, 10000);
  }

  render() {
    return (
      <View
        {...this.props}
        {...this.state}
        onLoad={this.load}
        onSave={this.save}
      />
    );
  }
}
