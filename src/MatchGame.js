import React, { Component } from 'react';
import MatchForm from './MatchForm';

class MatchGame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      placeholder: "term, definition",
      text: '',
      json: '',
      terms: [],
      definitions: []
    }
  }

  componentDidMount() {
    //setTimeout(() => { this.setState({ text: '', json: ''}); }, 1000);
  }

  componentWillUnmount() {

  }

  handleSubmit(match) {
    console.log('Saving game...');
    console.log(match);
  }

  getItems(str) {

    let json = str.split('\n');
    let items = new Array(0).fill(null);

    json.reduce((pairs, line) => {
      let vals = line.split(',') || [];
      if (!Array.isArray(vals)
        || !vals.length
        || vals.length < 2
        || vals[0].trim().length === 0
        || vals[1].trim().length === 0) {
        return items;
      }
      return items.push({ "term": vals[0].trim(), "definition": vals[1].trim() });
    }, items);

    return items;
  }

  toJson(arr, indentSpaces) {
    return ((arr && arr.length > 0) ? JSON.stringify(arr.reverse(), null, indentSpaces) : '');
  }

  handleEditorChange(event) {

    const text = event.target.value;
    let items = this.getItems(text);
    const json = this.toJson(items, 3);
    const definitions = items.map((item) => { return item.definition; });
    const terms = items.map((item) => { return item.term; });

    this.setState({
      text: text,
      json: json,
      terms: terms,
      definitions: definitions
    });

  }

  /*render() {
    return (<div>
      <div className="container align-top">
        <Editor className="" placeholder={this.state.placeholder} text={this.state.text} onChange={(e) => this.handleEditorChange(e)} />
        <JsonEditor className="" placeholder={this.toJson(this.getItems(this.state.placeholder), 3)} text={this.state.json} />
      </div>
    </div>);
  }*/

  render() {

    /*const {values} = this.props; */

    const match = { 
      title: '', 
      instructions: '',
      matches: '',
      config: {
        itemsPerBoard: 9,
        duration: 180
      }
    };

    return (
      /*<div class="container">
        <h1>Match Game</h1>
        <div>
          <label htmlFor="title" className="label">Title</label>
          <input id="title" type="text" value={values.title} />
        </div>
        <div>
          <label htmlFor="instructions" className="label">Instructions</label>
          <input id="instructions" type="text" value={values.instructions} />
        </div>
      </div>*/
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
          onSubmit={(payload) => this.handleSubmit(payload)}
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