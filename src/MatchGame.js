import React, { Component } from 'react';
import MatchForm from './MatchForm';

class MatchGame extends Component {

  state = {
    placeholder: "term, definition",
    text: '',
    json: '',
    terms: [],
    definitions: []
  }

  componentDidMount() {
    //setTimeout(() => { this.setState({ text: '', json: ''}); }, 1000);
  }

  componentWillUnmount() {

  }

  handleSubmit = (payload, setSubmitting) => {
    console.log('submitting...wait 10 secs...');
    setTimeout(() => { console.log(payload); setSubmitting(false); }, 10000);
  }

  render() {

    const match = {
      title: '',
      instructions: '',
      matches: [],
      matchText: '',
      config: {
        itemsPerBoard: 4,
        duration: 180
      }
    };

    return (
      <div className="container">
        <h2>Match Game</h2>
        <p>Rise above traditional 'drill and kill' drudgery by providing your students with an opportunity to practice and learn that is sure to engage them! The 'match game' is a frenetic test of wits in which students race against the clock and earn points while demonstrating both content knowledge and comprehension.</p>
        <h4>Step-by-Step</h4>
        <ul>
          <li>Build a bank of knowledge, known as 'matches'</li>
          <li>(Optional) Customize the game, e.g., duration</li>
          <li>Share the URL with your students</li>
        </ul>
        <MatchForm
          match={match}
          onSubmit={(payload, setSubmitting ) => this.handleSubmit(payload, setSubmitting)}
        />
      </div>
    );
  }

}

// eslint-disable-next-line
class Editor extends React.Component {
  render() {
    return (<textarea className="editor w-50 align-top" placeholder={this.props.placeholder} value={this.props.text} onChange={this.props.onChange}></textarea>);
  }
}

// eslint-disable-next-line
class JsonEditor extends React.Component {
  render() {
    return (<textarea className="editor w-50 align-top" placeholder={this.props.placeholder} value={this.props.text} readOnly></textarea>);
  }
}

export default MatchGame;