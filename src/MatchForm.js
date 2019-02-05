import React from 'react';
// eslint-disable-next-line
import Label from './Label';
import TextInput from './TextInput';
import RangeInput from './RangeInput';
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
        placeholder="Legends of Computer Science"
        maxlength={40}
        value={values.title} 
        onChange={handleChange} />
      <TextInput
        id="instructions"
        type="text"
        label="Instructions"
        placeholder="Match each legend with their accomplishment"
        maxlength={60}
        value={values.instructions} 
        onChange={handleChange} /> 
      <RangeInput
        id="itemsPerBoard"
        label="Matches Per Board"
        min={4}
        max={9}
        step={1}
        value={values.itemsPerBoard}
        onChange={handleChange}
      />
      <RangeInput
        id="duration"
        label="Game Length (seconds)"
        min={60}
        max={300}
        step={15}
        value={values.duration}
        onChange={handleChange}
      />
      <button type="submit" disabled={isSubmitting} className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default withFormik({
  mapPropsToValues: ({ match }) => ({
    itemsPerBoard: match.config.itemsPerBoard,
    duration: match.config.duration,
    ...match
  }),
  handleSubmit: (payload, {props, setSubmitting}) => {
   setSubmitting(false);
   props.onSubmit(payload);
  },
})(MatchForm);