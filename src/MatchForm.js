import React from 'react';
// eslint-disable-next-line
import Label from './Label';
import TextInput from './TextInput';
// eslint-disable-next-line
import RangeInput from './RangeInput';
import MatchEditor from './MatchEditor';
import MatchBulkEditor from './MatchBulkEditor';
import MatchList from './MatchList';
import { withFormik } from 'formik';
import DisplayFormikState from './FormikHelper';
import * as Yup from 'yup';
import InlineDropdown from './InlineDropdown';
// eslint-disable-next-line
import { Grid, SegmentGroup, Segment } from 'semantic-ui-react';

const MatchSchema = Yup.object().shape(
  {
    title: Yup.string()
      .min(2, 'Title is too short')
      .max(40, 'Title is too long')
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


  const onDropdownChange = (event, data, fieldName) => {
    event.preventDefault();
    console.log('Dropdown changed...');
    console.log(data);
    setFieldValue(fieldName, data.value);

  }

  const itemsPerBoard = [
    { text: '4', value: 4 },
    { text: '5', value: 5 },
    { text: '6', value: 6 },
    { text: '7', value: 7 },
    { text: '8', value: 8 },
    { text: '9', value: 9 },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Configuration</legend>
        <button type="submit" disabled={isSubmitting} className="btn btn-primary float-right">Save</button>
      </fieldset>
      <br />
      <Grid columns={2} stackable>
        <Grid.Column computer={8} mobile={16} tablet={16}>
          <Segment.Group>
            <TextInput
              id="title"
              type="text"
              label="Title"
              labelPosition="left"
              placeholder="Legends of Computer Science"
              error={touched.title && errors.title}
              maxlength={40}
              value={values.title}
              onChange={handleChange}
              tabIndex={1}
            />
            <TextInput
              id="instructions"
              type="text"
              label="Instructions"
              labelPosition="left"
              placeholder="Match each legend with their accomplishment"
              error={touched.instructions && errors.instructions}
              maxlength={60}
              value={values.instructions}
              onChange={handleChange}
              tabIndex={2}
            />
          </Segment.Group>
        </Grid.Column>
        <Grid.Column computer={4} mobile={16} tablet={16}>
        <InlineDropdown
          id="itemsPerBoard"
          label="Tiles Per Board"
          placeholder="Matches per board"
          selection
          options={itemsPerBoard}
          error={touched.itemsPerBoard && errors.itemsPerBoard}
          value={values.itemsPerBoard}
          onChange={(event, data, fieldName) => onDropdownChange(event, data, 'itemsPerBoard')}
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
        </Grid.Column>
        </Grid>
      <MatchBulkEditor
        id="matchText"
        rows={10}
        cols={30}
        label="Knowledge Bank"
        placeholder="Konrad Zuse, German Computer Inventor\nShawn Fanning, Created Napster"
        value={values.matchText}
        setFieldValue={setFieldValue}
      />
      <MatchEditor
        id="term"
        initialValue='<p>Hello World!</p>'
        placeholder="Enter term..." />
      <MatchEditor
        id="definition"
        initialValue='<p>Deez Nutz</p>'
        placeholder="Enter definition..." />   
      <MatchList
        matches={values.matches}
      />
    <DisplayFormikState {...props} />
    </form >
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