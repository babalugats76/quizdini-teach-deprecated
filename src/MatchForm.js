import React from 'react';
// eslint-disable-next-line
import Label from './Label';
import TextInput from './TextInput';
import RangeInput from './RangeInput';
import RichEditorExample from './RichEditorExample';
import MatchBulkEditor from './MatchBulkEditor';
import MatchList from './MatchList';
import { withFormik } from 'formik';
import DisplayFormikState from './FormikHelper';

const MatchForm = (props) => {
  // eslint-disable-next-line
  const { values, handleChange, isSubmitting, handleSubmit, setFieldValue, onSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-5">
          <fieldset>
            <legend>Configuration</legend>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary float-right">Save</button>
          </fieldset>
          <br />
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
        </div>
        <div className="col-7">
          <MatchBulkEditor
            id="matchText"
            rows={10}
            cols={30}
            label="Knowledge Bank"
            placeholder="Konrad Zuse, German Computer Inventor\nShawn Fanning, Created Napster"
            value={values.matchText}
            setFieldValue={setFieldValue}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <RichEditorExample placeholder="Enter term..." />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <MatchList
            matches={values.matches}
          />
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
    matchText: match.matchText,
    matches: match.matches
  }),
  handleSubmit: (payload, { props, setSubmitting }) => {
    setSubmitting(false);
    props.onSubmit(payload);
  },
})(MatchForm);