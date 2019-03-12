import React, { Component } from 'react';

class Match extends Component {

  componentDidMount() {
    const { onLoad, initialQuery } = this.props;
    if (initialQuery) {
      onLoad(initialQuery);
    }
  }

  render() {
    return (<React.Fragment></React.Fragment>)
  }

}

export default Match;