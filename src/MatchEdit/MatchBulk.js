import React from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import TextArea from '../components/TextArea'
import InputFile from '../components/InputFile';

const MatchBulk = ({ value, placeholder, isSubmitting, onBulkChange, onUpdateMatches, onBulkPaste, onFileChange }) => {

  return (
    <React.Fragment>
      <div id="btn-group-bulk-match">
        <Button
          as="label"
          secondary
          title="Upload Bank of Matches"
          icon="sync"
          size="small"
          type="button"
          tabIndex={-1}
          disabled={isSubmitting}
          onClick={(event) => onUpdateMatches(event)}>
          UPDATE
        </Button>
        <InputFile
          id="input-match-file"
          label="UPLOAD"
          onChange={(event) => onFileChange(event)} />
      </div>
      <TextArea
        value={value}
        placeholder={placeholder}
        onChange={(event, data) => onBulkChange(event, data)}
        onPaste={(event) => onBulkPaste(event)}
        autoHeight={false}
        rows={13}
      />
    </React.Fragment>
  );
}

MatchBulk.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isSubmitting: PropTypes.bool,
  onBulkChange: PropTypes.func.isRequired,
  onUpdateMatches: PropTypes.func.isRequired,
  onBulkPaste: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired,
};

export default MatchBulk;