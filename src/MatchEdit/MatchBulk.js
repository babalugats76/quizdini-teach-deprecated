import React from 'react';
import PropTypes from 'prop-types';
import TextArea from '../components/TextArea'
import InputFile from '../components/InputFile';

const MatchBulk = ({ value, placeholder, onBulkChange, onBulkPaste, onFileChange }) => {

  return (
    <React.Fragment>
      <InputFile 
        id="input-match-file"
        label="Upload File" 
        onChange={(event) => onFileChange(event)}
      />
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
  onBulkChange: PropTypes.func.isRequired,
  onBulkPaste: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired,
};

export default MatchBulk;