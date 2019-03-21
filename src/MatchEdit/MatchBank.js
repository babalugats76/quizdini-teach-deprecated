import React from 'react';
// eslint-disable-next-line
import { Grid, Divider } from 'semantic-ui-react';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import MatchEditor from './MatchEditor';
import InputFeedback from '../components/InputFeedback';
import Button from '../components/Button';

const MatchBank = ({
  term,
  termRef,
  definition,
  definitionRef,
  disabled,
  onEditorChange,
  onEditorTouch,
  onNewMatch
}) => {
  return (
    <Grid columns={1}>
      <Grid.Row>
        <Grid.Column>
          <Divider horizontal>Term</Divider>
          <InputFeedback error={!term.touched ? term.error : null} />
          <MatchEditor
            name='term'
            ref={termRef}
            value={term.value}
            tabIndex={3}
            placeholder={term.placeholder}
            readOnly={disabled}
            onEditorTouch={(field, touched) => onEditorTouch(field, touched)}
            onChange={(value, field) => onEditorChange(value, field)}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Divider horizontal>Definition</Divider>
          <InputFeedback
            error={!definition.touched ? definition.error : null}
          />
          <MatchEditor
            name='definition'
            ref={definitionRef}
            value={definition.value}
            tabIndex={4}
            placeholder={definition.placeholder}
            readOnly={disabled}
            onEditorTouch={(field, touched) => onEditorTouch(field, touched)}
            onChange={(value, field) => onEditorChange(value, field)}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Button
            secondary
            title='Add to the Match Bank'
            icon='plus'
            positive={term.touched && definition.touched}
            size='small'
            type='button'
            active={term.touched && definition.touched}
            tabIndex={5}
            disabled={disabled}
            onClick={event => onNewMatch(event)}
          >
            ADD
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

MatchBank.propTypes = {};

MatchBank.defaultProps = {};

export default MatchBank;
