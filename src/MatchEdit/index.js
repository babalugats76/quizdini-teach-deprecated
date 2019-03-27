import React, { Component } from 'react';
// eslint-disable-next-line
import { loadMatch, saveMatch } from './data';
import View from './View';

export default class extends Component {
  state = { loading: true };
  // bind this way due to async/await arrow function bug in Babel
  load = this.load.bind(this); 
  save = this.save.bind(this);

  loadSuccess = data => {
    this.setState({ loading: false, data });
  };

  loadFail = message => {
    this.setState({ loading: false, error: true, errmsg: message });
  };

  async load(query, sleep) {
    this.setState({ loading: true, error: false });
    await loadMatch(query, sleep, this.loadSuccess, this.loadFail);
  }

  saveSuccess = (data, setSubmitting) => {
    this.setState({ data });
    setSubmitting(false);
  }

  saveFail = message => {
    this.setState({ error: true, errmsg: message });
  }
  
  async save(values, setSubmitting, sleep) {
    this.setState({ error: false });
    await saveMatch(values, setSubmitting, sleep, this.saveSuccess, this.saveFail);
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
