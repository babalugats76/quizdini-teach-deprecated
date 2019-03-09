import React from 'react';
// eslint-disable-next-line
import { Form, Input, Label } from 'semantic-ui-react';
import InputFeedback from './InputFeedback';
import PropTypes from 'prop-types';

const InputText = ({ type, name, label, maxlength, error, value, onChange, ...props }) => {

  const txtPct = ((maxlength - value.length) / maxlength) * 100;

  const floatingLabel = {
    position: 'absolute',
    top: '-10px',
    right: '-20px',
    'fontSize': '.8em',
    'backgroundColor': 'rgba(128, 128, 128, .8)',
    'borderRadius': '3px',
    'padding': '3px',
    'color': 'white',
    'lineHeight': '1.1',
    'textAlign': 'right',
    'fontWeight': 'bold'
  }

  const warningStyle = {
    'backgroundColor': 'yellow',
    'color': 'grey'
  }

  const dangerStyle = {
    'backgroundColor': 'red',
    'color': 'white'
  }

  return (
    <Form.Field>
      <Input
        name={name}
        style={{ 'boxSizing': 'inherit', 'maxWidth': `${maxlength}ch` }}
        type="text"
        maxLength={maxlength}
        value={value}
        onChange={onChange}
        error={!!error}
        labelPosition='left'
        focus
        {...props}
      >
        <Label>{label}</Label>
        <span
          style={{
            ...floatingLabel,
            ...(txtPct <= 30 ? warningStyle : {}),
            ...(txtPct <= 10 ? dangerStyle : {}),
          }}>
          {value.length}/{maxlength}
        </span>
        <Label floating size="small" color='grey'>{value.length}/{maxlength}</Label>
        <input />
      </Input>
      <InputFeedback error={error} />
    </Form.Field>
  );
}

InputText.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  maxlength: PropTypes.number.isRequired,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputText;