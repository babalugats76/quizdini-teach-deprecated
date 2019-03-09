import React from 'react';
import { Divider } from 'semantic-ui-react';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import MatchEditor from './MatchEditor';
import InputFeedback from '../components/InputFeedback';
import Button from '../components/Button';

const MatchBank = ({
  term,
  definition,
  onEditorChange,
  onEditorTouch,
  onNewMatch,
  isSubmitting,
  termRef,
  definitionRef }) => {

  return (
    <div id="match-bank">
      <InputFeedback error={(!term.touched) ? term.error : null} />
      <MatchEditor
        name="term"
        ref={termRef}
        value={term.value}
        tabIndex={3}
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
        tabIndex={4}
        placeholder="Enter definition..."
        readOnly={isSubmitting}
        onEditorTouch={(field, touched) => onEditorTouch(field, touched)}
        onChange={(value, field) => onEditorChange(value, field)}
      />
      <Button
        secondary
        title="Add to the Knowledge Bank"
        icon="save"
        size="small"
        type="submit"
        floated="right"
        active={term.touched && definition.touched}
        tabIndex={5}
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