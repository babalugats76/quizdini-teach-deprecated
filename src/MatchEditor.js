import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { isKeyHotkey } from 'is-hotkey';
import Html from 'slate-html-serializer'
import FormatToolbar from './FormatToolbar';

const schema = {
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

const BLOCK_TAGS = {
  p: 'paragraph'
};

// Add a dictionary of mark tags.
const MARK_TAGS = {
  u: 'underline',
  code: 'code',
  sup: 'superscript',
  sub: 'subscript'
};

const rules = [
  {
    deserialize(el, next) {
      if (BLOCK_TAGS[el.tagName.toLowerCase()] === 'p') {
        return {
          object: 'block',
          type: 'paragraph',
          data: {
            className: el.getAttribute('class'),
          },
          nodes: next(el.childNodes),
        }
      }
    },
    // Add a serializing function property to our rule...
    serialize(obj, children) {
      if (obj.object === 'block') {
        switch (obj.type) {
          case 'paragraph':
            /**
             * In this case, do not wrap in <p>
             * Return plain text, coupled with HTML mark for styling only
             * (of the children)
             */
            return (<React.Fragment>{children}</React.Fragment>);
          default:
            break;
        }
      }
    },
  },
  {
    deserialize(el, next) {
      /* whitelist of tags */
      const type = MARK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: 'mark',
          type: type,
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object === 'mark') {
        switch (obj.type) {
          case 'underline':
            return <u>{children}</u>;
          case 'code':
            return <code>{children}</code>;
          case 'superscript':
            return <sup>{children}</sup>;
          case 'subscript':
            return <sub>{children}</sub>;
          default:
            break;
        }
      }
    }
  }
];

const serializer = new Html({ rules: rules });

class MatchEditor extends Component {

  /**
   * Initialize component.
   * Set editor's initial state.
   * 
   * @param {Object} props 
   */
  constructor(props) {
    super(props);
    const { initialValue } = props;
    this.state = {
      value: serializer.deserialize(initialValue || ''),
      output: 'Output will go here...'
    };
  }

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
      const serialized = serializer.serialize(state.value);
      console.log('Serializing...', serialized);
      return { value, output: serialized };
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

    console.log('On key down!');
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
    event.preventDefault();
    const editor = this.editor;
    const { value } = editor;
    const originalSelection = value.selection;
    editor.toggleMark(type);
    editor.onChange(editor.select(originalSelection));
  }

  /**
   * Event handler for clear formatting tooltip
   * Prevent default -> Find active marks -> remove -> focus
   * 
   * @param {Event} event
   */
  onClearFormatting = (event) => {

    event.preventDefault();

    const editor = this.editor;
    const { value } = editor;
    const originalSelection = value.selection;

    /* Remove existing marks */
    if (value.marks.size) {
      value.marks.forEach(mark => {
        editor.removeMark(mark)
      })
    }

    editor.onChange(editor.select(originalSelection));

  }

  /**
   * Event handler for inserting special characters tooltip
   * Prevent default -> Determine char -> insert char -> flush changes
   * 
   * @param {Event} event
   */
  onClickCharacter = (event, character) => {

    event.preventDefault();
    const editor = this.editor;
    const { value } = editor;
    const originalSelection = value.selection;

    let char;

    switch (character) {
      case 'pi':
        char = '\u03C0';
        break;
      default:
        return;
    }

    editor.insertText(char);
    editor.onChange(editor.select(originalSelection));

  }

  render() {

    const { value } = this.state;
    const { id, placeholder } = this.props;

    /* Tooltip buttons the formatting toolbar will have */
    const buttons = [{
      type: 'underline',
      title: 'Underline',
      onClick: (event) => this.onClickMark(event, 'underline')
    },
    {
      type: 'code',
      title: 'Code',
      onClick: (event) => this.onClickMark(event, 'code')
    },
    {
      type: 'superscript',
      title: 'Superscript',
      onClick: (event) => this.onClickMark(event, 'superscript')
    },
    {
      type: 'subscript',
      title: 'Subscript',
      onClick: (event) => this.onClickMark(event, 'subscript')
    },
    {
      type: 'clear-formatting',
      title: 'Clear Formatting',
      onClick: (event) => (event) => this.onClearFormatting(event)
    },
    {
      type: 'pi',
      title: 'Insert pi symbol',
      onClick: (event) => this.onClickCharacter(event, 'pi')
    }];

    return (
      <div className="rich-text-editor-container">
        <FormatToolbar buttons={buttons} />
        <Editor
          id={id}
          schema={schema}
          spellCheck={false}
          className="rich-text-editor"
          placeholder={placeholder}
          ref={this.ref}
          value={value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderMark={this.renderMark}
        />
        <pre>
          {this.state.output}
        </pre>
      </div>
    );
  }
}

export default MatchEditor;