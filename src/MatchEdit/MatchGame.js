import React, { Component } from 'react';
import MatchForm from './MatchForm';

class MatchGame extends Component {

  componentDidMount() {
    const { onLoad, initialQuery } = this.props;
    if (initialQuery) {
      onLoad(initialQuery);
    }
  }

  handleMatchFormSubmit = (values, formikBag) => {
    console.log('Match form submitting...wait 10 secs...');
    const { setSubmitting } = formikBag;
    setTimeout(() => { console.log(values); setSubmitting(false); }, 10000);
  }

  render() {

    return (
        <MatchForm
          match={this.props.data}
          onSubmit={(values, setSubmitting ) => this.handleMatchFormSubmit(values, setSubmitting)}
        />
    );
  }

}

export default MatchGame;