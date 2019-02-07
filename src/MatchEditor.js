import React, { Component } from 'react';
import Label from './Label';

class MatchEditor extends Component {

  /**
   * @param {string} str  Text to parse matches out of.
   * Split text by newline
   * Split into term and definition by comma
   * Perform other cleanup, sanitizing, etc.
   */
  parseMatches = (str) => {

    let json = str.split('\n');
    let matches = new Array(0).fill(null);

    json.reduce((pairs, line) => {
      let vals = line.split(',') || [];
      if (!Array.isArray(vals)
        || !vals.length
        || vals.length < 2
        || vals[0].trim().length === 0
        || vals[1].trim().length === 0) {
        return matches;
      }
      return matches.push({ "term": vals[0].trim(), "definition": vals[1].trim() });
    }, matches);

    return matches;
  }

  toJson = (arr, indentSpaces) => {
    return ((arr && arr.length > 0) ? JSON.stringify(arr.reverse(), null, indentSpaces) : '');
  }

  /**
   * @param {Event} e  Event to handle.
   * Perform any necessary processing
   * Notify Formik of fields' new values
   */
  handleEditorChange = (e) => {
    const text = e.target.value;
    const { id, setFieldValue } = this.props;
    setFieldValue(id, text, true);
    const matches = this.parseMatches(text);
    setFieldValue('matches', matches);

    /*const json = this.toJson(matches, 3);
    console.log(json); */
    /*const definitions = matches.map((item) => { return item.definition; });
    const terms = matches.map((item) => { return item.term; }); 

    this.setState({
      text: text,
      json: json,
      terms: terms,
      definitions: definitions
    }); */

  }

  render() {
    // eslint-disable-next-line
    const { id, label, placeholder, value } = this.props;

    /* Pull other supported attributes out of props that may be present */
    const fieldAttrs = (({ rows, cols }) => ({ rows, cols }))(this.props);

    return (
      <div className="form-group">
        <Label htmlFor={id}>{label}</Label>
        <textarea
          id={id}
          placeholder={placeholder.split('\\n').join('\n')}
          value={value.split('\\n').join('\n')}
          onChange={(e) => this.handleEditorChange(e)}
          {...fieldAttrs}
        />
      </div>
    );
  }
}

export default MatchEditor;