import React from 'react';
import PropTypes from 'prop-types';
import TextArea from '../components/TextArea'

const MatchBulk = ({ value, placeholder, onChange, onPaste }) => {
 
  return (  
    <TextArea
      value={value}
      placeholder={placeholder}
      onChange={(event, data) => onChange(event, data)}
      onPaste={(event) => onPaste(event)}
      autoHeight={false}
      rows={13}
    />
  );
}

MatchBulk.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onPaste: PropTypes.func.isRequired,
};
 
export default MatchBulk;