import React, { Component } from 'react';
// eslint-disable-next-line
import loadMatch from './loadData';
import View from './View';

export default class extends Component {

  state = { loading: true };
  load = this.load.bind(this); // bind this way due to async/await arrow function bug in Babel

  async load(query) {
    console.log('Inside load function...');
    try {
      this.setState({ loading: true, error: false });
      const data = await loadMatch(query);
      this.setState({ loading: false, data });
    } catch (ex) {
      this.setState({ loading: false, error: true, exception: ex.toString() });
    }
  }

  save(values, setSubmitting) {
    console.log('Inside save function...');
    console.log('Here are the submitted values');
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
    },
      10000);
  }

  render() {
    return (
      <View
        {...this.props}
        {...this.state}
        onLoad={this.load}
        onSave={this.save} />
    );
  }
}