import React from 'react';
// eslint-disable-next-line
import { Form, Input, Label } from 'semantic-ui-react';
import InputFeedback from './InputFeedback';
import PropTypes from 'prop-types';

const InputText = ({
  type,
  name,
  label,
  maxlength,
  error,
  value,
  onChange,
  ...props
}) => {
  //const txtPct = ((maxlength - value.length) / maxlength) * 100;

  /*
  const floatingLabel = {
    position: 'absolute',
    top: '-10px',
    right: '-20px',
    fontSize: '.8em',
    backgroundColor: 'rgba(128, 128, 128, .8)',
    borderRadius: '3px',
    padding: '3px',
    color: 'white',
    lineHeight: '1.1',
    textAlign: 'right',
    fontWeight: 'bold'
  };*/

  /*const warningStyle = {
    backgroundColor: 'yellow',
    color: 'grey'
  };*/

  /*const dangerStyle = {
    backgroundColor: 'red',
    color: 'white'
  };*/

  /* <Label as='label'>{label}</Label>*/

  /*<Label floating size='small' color='grey'>
            {value.length}/{maxlength}
          </Label>
          <input />*/

  return (
    <React.Fragment>
      <Form.Field error={!!error}>
        <label htmlFor={name}>{label}</label>
        <Input
          id={name}
          name={name}
          style={{ boxSizing: 'inherit', maxWidth: `${maxlength}ch` }}
          type='text'
          maxLength={maxlength}
          value={value}
          onChange={onChange}
          {...props}
        >
          <Label floating>blah</Label>
          <input />
        </Input>
        <InputFeedback error={error} />
      </Form.Field>
    </React.Fragment>
  );
};

InputText.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  maxlength: PropTypes.number.isRequired,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default InputText;
