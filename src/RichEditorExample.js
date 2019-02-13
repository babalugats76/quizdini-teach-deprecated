import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { isKeyHotkey } from 'is-hotkey';
// eslint-disable-next-line
import Plain from 'slate-plain-serializer';

import Icon from './Icon';

class RichEditorExample extends Component {

  initialValue = Value.fromJSON({
    document: {
      nodes: [
        {
          object: 'block',
          type: 'paragraph',
          nodes: [
            {
              object: 'text',
              leaves: [
                {
                  text: 'A line of text in a paragraph.',
                },
              ],
            },
          ],
        },
        {
          object: 'block',
          type: 'paragraph',
          nodes: [
            {
              object: 'text',
              leaves: [
                {
                  text: 'A second line of text in a paragraph.',
                },
              ],
            },
          ],
        },
        {
          object: 'block',
          type: 'paragraph',
          nodes: [
            {
              object: 'text',
              leaves: [
                {
                  text: 'A third line of text in a paragraph.',
                },
              ],
            },
          ],
        },
      ],
    },
  })

  /**
   * Initialize component.
   * Set editor's initial state.
   * 
   * @param {Object} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      //value: Plain.deserialize('')
      value: this.initialValue
    };
  }

  schema = {
    document: {
      nodes: [
        {
          match: { type: 'paragraph' },
          min: 1,
          max: 1
        },
      ],
    },
    blocks: {
      paragraph: {
        marks: [
          { type: 'underline' },
          { type: 'code' },
          { type: 'superscript' },
          { type: 'subscript' }
        ],
        nodes: [
          { match: { object: 'text' } }
        ]
      },
    }
  };

  /* Used to reference instance of Editor component */
  ref = (editor) => {
    this.editor = editor
  }

  /**
   * If any marks in selection match, return true
   * 
   * @param {String} type  Type of mark to search selection for
   * @return {Boolean}    
   */
  hasMark = (type) => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type === type);
  }

  /**
   * On change, save the new `value` to state
   *
   * @param {Editor} editor
   */
  onChange = ({ value }) => {
    this.setState((state, props) => {
      return { value };
    });
  }

  /**
   * Renders a mark (used for formatting) with props
   * 
   * @param {Object} props 
   * @param {Editor} editor 
   * @param {function} next Callback function (if no custom action to take)
   * @return {Element}
   */
  renderMark(props, editor, next) {

    const { attributes, children, mark } = props;

    switch (mark.type) {
      case 'code':
        return <code {...attributes}>{children}</code>;
      case 'underline':
        return <u {...attributes}>{children}</u>;
      case 'superscript':
        return <sup {...attributes}>{children}</sup>;
      case 'subscript':
        return <sub {...attributes}>{children}</sub>;
      default:
        return next();
    }

  }

  /**
   * On key down, if it's a formatting command toggle a mark.
   *
   * @param {Event} event
   * @param {Editor} editor
   * @return {Change}
   */
  onKeyDown = (event, editor, next) => {

    let mark;
    const isUnderline = isKeyHotkey('mod+u');
    const isCode = isKeyHotkey('mod+`');
    const isSuperscript = isKeyHotkey('mod+ArrowUp');
    const isSubscript = isKeyHotkey('mod+ArrowDown');

    if (isUnderline(event)) {
      mark = 'underline';
    } else if (isCode(event)) {
      mark = 'code';
    } else if (isSuperscript(event)) {
      mark = 'superscript';
    } else if (isSubscript(event)) {
      mark = 'subscript';
    } else {
      return next();
    }

    event.preventDefault();
    editor.toggleMark(mark);
  }

  /**
   * Generic event handler to attach to mark buttons
   * 
   * @param {Event} event  
   * @param {String} type  Type of mark (formatting) to apply, e.g., underline
   */
  onClickMark = (event, type) => {
    event.preventDefault()
    this.editor.toggleMark(type)
  }

  render() {

    const { value } = this.state;
    const { placeholder } = this.props;

    return (
      <div className="rich-text-editor-container">
        <div className="format-toolbar">
          <button title="Underline" onClick={(event) => this.onClickMark(event, 'underline')} ><Icon type='underline' /></button>
          <button title="Code" onClick={(event) => this.onClickMark(event, 'code')} ><Icon type='code' /></button>
          <button title="Superscript" onClick={(event) => this.onClickMark(event, 'superscript')} ><Icon type='superscript' /></button>
          <button title="Subscript" onClick={(event) => this.onClickMark(event, 'subscript')} ><Icon type='subscript' /></button>
        </div>
        <Editor
          schema={this.schema}
          autoFocus
          spellCheck={false}
          className="rich-text-editor"
          placeholder={placeholder}
          ref={this.ref}
          value={value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderMark={this.renderMark}
        />
      </div>
    );
  }
}

export default RichEditorExample;