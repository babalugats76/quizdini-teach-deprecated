import { Component } from 'react';

class Match extends Component {
  componentDidMount() {
    const { onLoad, initialQuery, sleep } = this.props;
    if (initialQuery) {
      onLoad(initialQuery, sleep);
    }
  }

  render() {
    return null;
  }
}

export default Match;
