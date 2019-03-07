// eslint-disable-next-line
import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import MatchEditor from './MatchEditor';
import InputFeedback from './InputFeedback';
import Button from './Button';

const MatchBank = ({ term, definition, onEditorChange, onEditorTouch, onNewMatch, isSubmitting, error }) => {
  return (
    <div>
      <InputFeedback error={(!term.touched) ? term.error : null} />
      <MatchEditor
        name="term"
        value={term.value}
        placeholder="Enter term..."
        onEditorTouch={(field, touched) => onEditorTouch(field, touched)}
        onChange={(value, field) => onEditorChange(value, field)}
      />
      <Divider />
      <InputFeedback error={(!definition.touched) ? definition.error : null} />
      <MatchEditor
        name="definition"
        value={definition.value}
        placeholder="Enter definition..."
        onEditorTouch={(field, touched) => onEditorTouch(field, touched)}
        onChange={(value, field) => onEditorChange(value, field)}
      />
      <Button
        secondary
        loading={isSubmitting}
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