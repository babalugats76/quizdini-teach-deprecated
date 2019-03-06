import React, { Component } from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import Button from './Button';
import InputText from './InputText';
import InputDropdown from './InputDropdown';
import HtmlSerializer from './HtmlSerializer'
import MatchBank from './MatchBank';
import MatchBulkEditor from './MatchBulkEditor';
import MatchTable from './MatchTable';
import DisplayFormikState from './FormikHelper';

// eslint-disable-next-line
import { Grid, Tab, Divider, Segment, Form } from 'semantic-ui-react';
import { Accordion } from './Accordion';

const matchSchema = Yup.object().shape(
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

const newMatchSchema = (matches) => {
  return Yup.object().shape({
    term: Yup.string()
      .required('Term is required')
      .test('duplicate term', 'Duplicate term',
        function (value) {
          const passed = !matches.some((element) => { return element.term === value; });  // check for duplicate terms
          return passed;
        }
      )
  });
}

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

  /**
   * On editor change, save the new `value` (Map) to state
   *
   * @param {Editor} editor
   */
  handleEditorChange = ({ value }, key) => {
    console.log('handleEditorCalled....');
    const { setFieldValue, setTouched } = this.props;
    setFieldValue(key, value);
    setTouched({[key]: true});
  }

  handleNewMatch = (event) => {
    event.preventDefault();
    const { term, definition, matches } = this.props.values;
    const { setErrors, setFieldValue, setTouched } = this.props;
    const termHtml = HtmlSerializer.serialize(term);
    const definitionHtml = HtmlSerializer.serialize(definition);

    setTouched('term', false);
    setTouched('definition', false);

    newMatchSchema(matches)
      .validate({ term: termHtml }, { abortEarly: true })
      .then(function(valid) { // If valid, merge and reset values
        const updatedMatches = [
          {
            term: termHtml,
            definition: definitionHtml
          }, ...matches];
        setFieldValue('matches', updatedMatches);
        setFieldValue('term', HtmlSerializer.deserialize(''));
        setFieldValue('definition', HtmlSerializer.deserialize(''));
      })
      .catch(function (errors) { // Extract and manually set form errors
        console.log(errors);
        const { path, message } = errors;
        setErrors({ [path]: message });
      });

    //setTimeout(() => { console.log(values); setSubmitting(false); }, 1000);
  }

  render() {

    // eslint-disable-next-line
    const { values, touched, errors, handleChange, isSubmitting, handleSubmit, setFieldValue } = this.props;
    const { activeEditorIndex } = this.state;

    console.log('Term touched', touched.term);

    const editorPanes = [
      {
        menuItem: 'Knowledge Bank', render: () =>
          <Tab.Pane>
            <MatchBank
              matches={values.matches}
              term={values.term}
              isSubmitting={isSubmitting}
              error={ (!touched.term) ? errors.term : null}
              definition={values.definition}
              onEditorChange={(value, key) => this.handleEditorChange(value, key)}
              onNewMatch={this.handleNewMatch} />
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
    term: HtmlSerializer.deserialize(''),
    definition: HtmlSerializer.deserialize(''),
    matchText: match.matchText,
    matches: match.matches
  }),
  validationSchema: matchSchema,
  handleSubmit: (values, formikBag) => {
    const { onSubmit } = formikBag.props;
    onSubmit(values, formikBag);
  },
})(MatchForm);