import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';

const UnderlineMark = (props) => {
  return (
    <u {...props.attributes}>{props.children}</u>
  );
}

const ItalicMark = (props) => {
  return (
    <em {...props.attributes}>{props.children}</em>
  );
}

const PreformattedMark = (props) => {
  return (
    <code {...props.attributes}>{props.children}</code>
  );
}

const SuperscriptMark = (props) => {
  return (
    <sup {...props.attributes}>{props.children}</sup>
  );
}

const SubscriptMark = (props) => {
  return (
    <sub {...props.attributes}>{props.children}</sub>
  );
}

const markHotKey = (options) => {

  const { key, type } = options;

  return {
    onKeyDown(event, editor, next) {
      if (!event.ctrlKey || event.key !== key) return next();
      event.preventDefault();
      editor.toggleMark(type);
    }
  }
}

const underlinePlugin = markHotKey({ key: 'u', type: 'underline' });
const italicPlugin = markHotKey({ key: 'i', type: 'italic' });
const preformattedPlugin = markHotKey({ key: 'p', type: 'preformatted' });
const superscriptPlugin = markHotKey({ key: 'ArrowUp', type: 'superscript' });
const subscriptPlugin = markHotKey({ key: 'ArrowDown', type: 'subscript' });

// eslint-disable-next-line
const plugins = [
  underlinePlugin, 
  italicPlugin, 
  preformattedPlugin,
  superscriptPlugin,
  subscriptPlugin
];

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
                  text: 'Enter term...'
                }
              ]
            }
          ]
        }
      ]
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      value: this.initialValue
    };
  }

  onChange = ({ value }) => {
    this.setState((state, props) => {
      return { value };
    });
  }

  renderMark(props, editor, next) {
    switch (props.mark.type) {
      case 'underline':
        return <UnderlineMark {...props} />;
      case 'italic':
        return <ItalicMark {...props} />;
      case 'preformatted':
        return <PreformattedMark {...props} />
      case 'superscript':
        return <SuperscriptMark {...props} />;
      case 'subscript':
        return <SubscriptMark {...props} />;
      default:
        return next();
    }
  }

  render() {

    const { value } = this.state;

    return (
      <Editor
        value={value}
        plugins={plugins}
        onChange={this.onChange}
        renderMark={this.renderMark}
      />
    );
  }
}

export default RichEditorExample;