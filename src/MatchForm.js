import React from 'react';
// eslint-disable-next-line
import Label from './Label';
import TextInput from './TextInput';
import RangeInput from './RangeInput';
import MatchEditor from './MatchEditor';
import { withFormik } from 'formik';
import DisplayFormikState from './FormikHelper';

const MatchForm = (props) => {
  // eslint-disable-next-line
  const { values, handleChange, isSubmitting, handleSubmit, onSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col"><TextInput
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
      </button></div>
        <div className="col">
          <MatchEditor 
            id="matches"
            rows={10}
            cols={80}
            label="Knowledge Bank"
            placeholder="&lt;b&gt;Hello&lt;/b&gt;, World\nHello, Again\n"
            value={values.matches}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          
        </div>
      </div>
      <div className="row">
        <DisplayFormikState {...props} />
      </div>
    </form>
  );
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ match }) => ({
    title: match.title,
    instructions: match.instructions,
    itemsPerBoard: match.config.itemsPerBoard,
    duration: match.config.duration,
    matches: match.matches
  }),
  handleSubmit: (payload, {props, setSubmitting}) => {
   setSubmitting(false);
   props.onSubmit(payload);
  },
})(MatchForm);