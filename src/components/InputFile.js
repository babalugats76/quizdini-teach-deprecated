import React from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';

const InputFile = ({ id, label, onChange }) => {

  let fileInputRef = null;                            // Ref to hidden file input

  /**
   * Reset value of file input to null.
   * Attached to file input button.
   * Without, you cannot re-select a file.
   * 
   * @param {Event} event Event to handle, i.e., click on file input's corresponding button  
   */
  const handleClick = (event) => { 
    fileInputRef.value = null;                       // Clear file input (to allow file re-select)  
  }

  return (
    <React.Fragment>
      <Button
        htmlFor={id}
        as="label"
        title="Upload Your Matches"
        icon="cog"
        size="mini"
        onClick={(event) => handleClick(event)}>
        {label}
      </Button>
      <input
        id={id}
        hidden
        accept={".csv, .txt"}
        type="file"
        ref={(ref) => { fileInputRef = ref; }}  // Attach element ref to local variable
        onChange={onChange} />
    </React.Fragment>
  );
}

InputFile.propTypes = {
  id: PropTypes.string,
};

export default InputFile;