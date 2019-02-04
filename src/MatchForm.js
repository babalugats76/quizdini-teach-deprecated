import React from 'react';
// eslint-disable-next-line
import Label from './Label';
import TextInput from './TextInput';
import { withFormik } from 'formik';

const MatchForm = (props) => {
  // eslint-disable-next-line
  const { values, handleChange, isSubmitting, handleSubmit, onSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        id="title"
        type="text"
        label="Title"
        value={values.title} 
        onChange={handleChange} />
      <TextInput
        id="instructions"
        type="text"
        label="Instructions"
        value={values.instructions} 
        onChange={handleChange} /> 
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
}

export default withFormik({
  mapPropsToValues: ({ match }) => ({
    ...match
  }),
  handleSubmit: (payload, {props, setSubmitting}) => {
   setSubmitting(false);
   props.onSubmit(payload);
  },
})(MatchForm);