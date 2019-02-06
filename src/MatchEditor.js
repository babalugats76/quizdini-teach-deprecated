import React from 'react';

const MatchEditor = ({ id, label, rows, cols, placeholder, value, onChange, ...props }) => {
  
  return (
    <textarea
      id={id}
      rows={rows}
      cols={cols}
      placeholder={placeholder.split('\\n').join('\n')}
      value={value.split('\\n').join('\n')}
      onChange={onChange}
      {...props}
    />
  );
}

export default MatchEditor;