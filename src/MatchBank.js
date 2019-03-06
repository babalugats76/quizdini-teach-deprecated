// eslint-disable-next-line
import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import MatchEditor from './MatchEditor';
import InputFeedback from './InputFeedback';
import Button from './Button';

const MatchBank = ({ term, definition, onEditorChange, onNewMatch, isSubmitting, error }) => {
  return (
    <div>
      <InputFeedback error={error} />
      <MatchEditor
        id="term"
        value={term}
        placeholder="Enter term..."
        onChange={(value, key) => onEditorChange(value, key)}
      />
      <Divider />
      <MatchEditor
        id="definition"
        value={definition}
        placeholder="Enter definition..."
        onChange={(value, key) => onEditorChange(value, key)}
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