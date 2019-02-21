import React from 'react';
import classNames from 'classnames';
// eslint-disable-next-line 
//import Label from './Label';
import { Segment, Input, Label } from 'semantic-ui-react';

import InputFeedback from './InputFeedback';

const InputText = ({ type, id, label, maxlength, error, value, onChange, ...props }) => {

  const txtPct = ((maxlength - value.length) / maxlength) * 100;

  const txtClass = classNames(
    'input-group-text',
    'text-white',
    { 'bg-danger': txtPct <= 10, 'bg-warning': txtPct <= 30, 'bg-success': txtPct > 30 }
  );

  return (
      <Segment padded>
        <Input
          id={id}
          type="text"
          label={label}
          maxLength={maxlength}
          value={value}
          onChange={onChange}
          {...props}
        />
        <InputFeedback error={error} />
        <Label className={txtClass} attached='top right'>{maxlength - value.length} characters left</Label>
      </Segment>
  );
}

export default InputText;