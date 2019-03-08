// eslint-disable-next-line
import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import MatchEditor from './MatchEditor';
import InputFeedback from './InputFeedback';
import Button from './Button';

const MatchBank = ({ term, definition, onEditorChange, onEditorTouch, onNewMatch, isSubmitting, termRef, definitionRef, error }) => {
  return (
    <div>
      <InputFeedback error={(!term.touched) ? term.error : null} />
      <MatchEditor
        name="term"
        ref={termRef}
        value={term.value}
        placeholder="Enter term..."
        readOnly={isSubmitting}
        onEditorTouch={(field, touched) => onEditorTouch(field, touched)}
        onChange={(value, field) => onEditorChange(value, field)}
      />
      <Divider />
      <InputFeedback error={(!definition.touched) ? definition.error : null} />
      <MatchEditor
        name="definition"
        ref={definitionRef}
        value={definition.value}
        placeholder="Enter definition..."
        readOnly={isSubmitting}
        onEditorTouch={(field, touched) => onEditorTouch(field, touched)}
        onChange={(value, field) => onEditorChange(value, field)}
      />
      <Button
        secondary
        active
        title="Add to the Knowledge Bank"
        icon="save"
        size="small"
        type="submit"
        floated="right"
        disabled={isSubmitting}
        onClick={(event) => onNewMatch(event)}
      >
        ADD
        </Button>
    </div>
  );
}

MatchBank.propTypes = {

};

MatchBank.defaultProps = {

};

export default MatchBank;