import React, { Component } from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import Button from './Button';
import InputText from './InputText';
import InputDropdown from './InputDropdown';
import MatchEditorSubform from './MatchEditorSubform';
import MatchBulkEditor from './MatchBulkEditor';
import MatchTable from './MatchTable';
import DisplayFormikState from './FormikHelper';

// eslint-disable-next-line
import { Grid, Tab, Divider, Segment, Form } from 'semantic-ui-react';
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
      .max(5, 'You may have no more than 5 items per board'),
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

  state = {
    activeEditorIndex: 0
  }

  handleTabChange = (event, props) => {
    const { activeIndex } = props;
    this.setState((state, props) => {
      return { activeEditorIndex: activeIndex }
    })
  }

  handleEditorSubmit = (payload, setSubmitting) => {
    console.log('Match Editor submitting...wait 1 sec...');
    console.log('Payload', payload);
    const { matches} = this.props.values;
    const { setFieldValue } = this.props;
    const updatedMatches = [{ term: payload.term , definition: payload.definition }, ...matches];
    setFieldValue('matches',updatedMatches);
    setTimeout(() => { console.log(payload); setSubmitting(false); }, 1000);
  }

  render() {

    // eslint-disable-next-line
    const { values, touched, errors, handleChange, isSubmitting, handleSubmit, setFieldValue } = this.props;
    const { activeEditorIndex } = this.state;

    const editorPanes = [
      {
        menuItem: 'Knowledge Bank', render: () =>
          <Tab.Pane>
            <MatchEditorSubform
              onSubmit={(payload, setSubmitting) => this.handleEditorSubmit(payload, setSubmitting)} />
          </Tab.Pane>
      },
      {
        menuItem: 'Expert Mode', render: () =>
          <Tab.Pane>
            <MatchBulkEditor
              id="matchText"
              rows={10}
              cols={30}
              label="Knowledge Bank"
              placeholder="Konrad Zuse, German Computer Inventor\nShawn Fanning, Created Napster"
              value={values.matchText}
              setFieldValue={setFieldValue}
            /></Tab.Pane>
      },
    ];

    return (
      <Form onSubmit={handleSubmit}>
        <Button
          primary
          loading={isSubmitting}
          active
          title="Save Game"
          icon="save"
          size="small"
          type="submit"
          tabIndex={3}
          disabled={isSubmitting}>
        Save
        </Button>
        <Divider hidden />
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
              forceOpen={(!!errors.itemsPerBoard) || (!!errors.duration)} >
              <Segment basic>
                <Grid columns={2} stackable textAlign='center'>
                  <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                      <InputDropdown
                        id="itemsPerBoard"
                        label="Game Tiles"
                        icon="tiles"
                        tabIndex={-1}
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
                        tabIndex={-1}
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
            </Accordion>
            <Divider hidden />
            <Tab
              panes={editorPanes}
              activeIndex={activeEditorIndex}
              onTabChange={(event, props) => this.handleTabChange(event, props)}
              renderActiveOnly={true} />
          </Grid.Column>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <MatchTable
              id="table-match"
              matches={values.matches}
            />
          </Grid.Column>
        </Grid>
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