import React, { Component } from 'react';

class MatchLoader extends Component {

  componentDidMount() {
    const { onLoad, initialQuery } = this.props;
    if (initialQuery) {
      onLoad(initialQuery);
    }
  }

  render() {
    return (
      <div>Match Loader is running!</div>
    );
  }
}

export default MatchLoader;