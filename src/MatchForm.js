import React, { Component } from 'react';

import InputText from './InputText';
import MatchEditor from './MatchEditor';
import MatchBulkEditor from './MatchBulkEditor';
import MatchList from './MatchList';
import { withFormik } from 'formik';
import DisplayFormikState from './FormikHelper';
import * as Yup from 'yup';
import InputDropdown from './InputDropdown';
// eslint-disable-next-line
import { Grid, SegmentGroup, Segment, Form } from 'semantic-ui-react';
import { Accordion } from './Accordion';

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
      .max(9, 'You may have no more than 9 items per board'),
    duration: Yup.number()
      .min(60, 'Games must last at 1 minute long')
      .max(300, 'Game may last no more than 5 minutes')
  }
);

const itemsPerBoardOptions = [
  { text: '4', value: 4 },
  { text: '5', value: 5 },
  { text: '6', value: 6 },
  { text: '7', value: 7 },
  { text: '8', value: 8 },
  { text: '9', value: 9 },
];

const durationOptions = [
  { text: '60', value: 60 },
  { text: '90', value: 90 },
  { text: '120', value: 120 },
  { text: '180', value: 180 },
  { text: '240', value: 240 },
  { text: '300', value: 300 },
];

class MatchForm extends Component {

  render() {

    // eslint-disable-next-line
    const { values, touched, errors, handleChange, isSubmitting, handleSubmit, setFieldValue } = this.props;
    
    return (
      <Form onSubmit={handleSubmit}>
          <button type="submit" disabled={isSubmitting} className="btn btn-primary float-right">Save</button>
        <br />
        <Grid columns={2} stackable>
          <Grid.Column computer={8} mobile={16} tablet={16}>
              <InputText
                id="title"
                type="text"
                label="Title"
                placeholder="Legends of Computer Science"
                error={errors.title}
                maxlength={40}
                value={values.title}
                onChange={handleChange}
                tabIndex={1}
              />
              <InputText
                id="instructions"
                type="text"
                label="Instructions"
                placeholder="Match each legend with their accomplishment"
                error={errors.instructions}
                maxlength={60}
                value={values.instructions}
                onChange={handleChange}
                tabIndex={2}
              />
            <Accordion 
               openOnStart={false} 
               childErrors={(!!errors.itemsPerBoard) || (!!errors.duration)} >
              <Segment basic>
                <Grid columns={2} stackable textAlign='center'>
                  <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                      <InputDropdown
                        id="itemsPerBoard"
                        label="Game Tiles"
                        icon="tiles"
                        selection
                        compact
                        options={itemsPerBoardOptions}
                        error={errors.itemsPerBoard}
                        value={values.itemsPerBoard}
                        setFieldValue={setFieldValue}
                      />
                    </Grid.Column>

                    <Grid.Column>
                      <InputDropdown
                        id="duration"
                        label="Seconds"
                        icon="timer"
                        selection
                        compact
                        options={durationOptions}
                        error={errors.duration}
                        value={values.duration}
                        setFieldValue={setFieldValue}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </ Accordion>
          </Grid.Column>
          <Grid.Column computer={8} mobile={16} tablet={16}>

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
        <DisplayFormikState {...this.props} />
      </Form >
    );
  }
}

export default withFormik({
  enableReinitialize: true,
  validateOnChange: false,
  validateOnBlur: false,
  mapPropsToValues: ({ match }) => ({
    title: match.title,
    instructions: match.instructions,
    itemsPerBoard: match.config.itemsPerBoard,
    duration: match.config.duration,
    matchText: match.matchText,
    matches: match.matches
  }),
  validationSchema: MatchSchema,
  handleSubmit: (payload, otherProps) => {
    // eslint-disable-next-line
    const { onSubmit } = otherProps.props;
    const { setSubmitting } = otherProps;
    onSubmit(payload, setSubmitting);
  },
})(MatchForm);