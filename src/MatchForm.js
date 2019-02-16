import React from 'react';
// eslint-disable-next-line
import Label from './Label';
import TextInput from './TextInput';
import RangeInput from './RangeInput';
import MatchEditor from './MatchEditor';
import MatchBulkEditor from './MatchBulkEditor';
import MatchList from './MatchList';
import { withFormik } from 'formik';
import DisplayFormikState from './FormikHelper';
import * as Yup from 'yup';


const MatchSchema = Yup.object().shape(
  {
    title: Yup.string()
      .min(2, 'Title is too short')
      .max(40,'Title is too long')
      .required('Title is required'),
    instructions: Yup.string()
      .max(60, 'Instructions are too long'),
    itemsPerBoard: Yup.number() 
      .min(4, 'You must have at least 4 items per board')
      .max(3, 'You may have no more than 9 items per board'),
    duration: Yup.number()
      .min(60, 'Games must last at least a minute')
      .max(300, 'Game may last no more than 5 minutes')
  }
);

const MatchForm = (props) => {
  // eslint-disable-next-line
  const { values, touched, errors, handleChange, isSubmitting, handleSubmit, setFieldValue, onSubmit } = props;
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
            error={touched.title && errors.title}
            maxlength={40}
            value={values.title}
            onChange={handleChange} 
             />
          <TextInput
            id="instructions"
            type="text"
            label="Instructions"
            placeholder="Match each legend with their accomplishment"
            error={touched.instructions && errors.instructions}
            maxlength={60}
            value={values.instructions}
            onChange={handleChange} />
          <RangeInput
            id="itemsPerBoard"
            label="Matches Per Board"
            min={4}
            max={9}
            step={1}
            error={touched.itemsPerBoard && errors.itemsPerBoard}
            value={values.itemsPerBoard}
            onChange={handleChange}
          />
          <RangeInput
            id="duration"
            label="Game Length (seconds)"
            min={60}
            max={300}
            step={15}
            error={touched.duration && errors.duration}
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
          <MatchEditor
            id="term"
            initialValue='<p>Hello World!</p>'
            placeholder="Enter term..." />
          <MatchEditor
            id="definition"
            initialValue='<p>Deez Nutz</p>'
            placeholder="Enter definition..." />   
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
  validationSchema: MatchSchema,
  handleSubmit: (payload, { props, setSubmitting }) => {
    setSubmitting(false);
    props.onSubmit(payload);
  },
})(MatchForm);