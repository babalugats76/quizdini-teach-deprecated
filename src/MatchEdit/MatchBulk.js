import React from 'react';
import TextArea from '../components/TextArea'

const MatchBulk = ({ value, placeholder, onChange }) => {
  return (  
    <TextArea
      value={value}
      placeholder={placeholder}
      onChange={(event, data) => onChange(event, data)}
      autoHeight={false}
      rows={13}
    />
  );
}
 
export default MatchBulk;