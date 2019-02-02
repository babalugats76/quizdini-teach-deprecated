import React, { Component } from 'react';
import { withFormik } from 'formik';


class MatchGameCreator extends Component {

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

    const {values} = this.props;

    return (
      <div class="container">
        <h1>Match Game</h1>
        <div>
          <label htmlFor="title" className="label">Title</label>
          <input id="title" type="text" value={values.title} />
        </div>
        <div>
          <label htmlFor="instructions" className="label">Instructions</label>
          <input id="instructions" type="text" value={values.instructions} />
        </div>
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

export default withFormik({
  mapPropsToValues: () => ({
    title: 'Short, and sweet',
    instructions: 'Keep it real simple'
  })
})(MatchGameCreator);