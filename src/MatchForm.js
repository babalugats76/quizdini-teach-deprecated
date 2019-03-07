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
      ),
    definition: Yup.string()
      .required('Definition is required')
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
    activeEditorIndex: 0,
    term: {
      value: HtmlSerializer.deserialize(''),
      touched: false
    },
    definition: {
      value: HtmlSerializer.deserialize(''),
      touched: false
    }
  }

  handleTabChange = (event, props) => {
    const { activeIndex } = props;
    this.setState((state, props) => {
      return { activeEditorIndex: activeIndex }
    })
  }

  /**
   * Update state with new `value` (Map) of the editor
   *
   * @param {Editor} editor Editor object to grab `value` from
   * @param {String} field Name of the field
   */
  handleEditorChange = ({ value }, field) => {
    this.setState((state, props) => {
      return { [field]: { ...state[field], value: value } }
    });
  }

  /**
   * Updated touched state of field
   *
   * @param {String} field Name of the field
   * @param {bool} touched Whether field has been interacted with (or not)
   */
  handleEditorTouch = (field, touched) => {
    this.setState((state, props) => {
      return { [field]: { ...state[field], touched: touched } }
    });
  }

  /**
   * Updated error state of field
   *
   * @param {String} field Name of the field
   * @param {bool} error Error message
   */
  setFieldError = (field, error) => {
    this.setState((state, props) => {
      return { [field]: { ...state[field], error: error } }
    });
  }

  handleNewMatch = (event) => {

    event.preventDefault();

    const { matches } = this.props.values;                                                 // Get matches (from Formik)
    const term = this.state.term.value;                                                    // Get editors' contents (from state)    
    const definition = this.state.definition.value;

    const termHtml = HtmlSerializer.serialize(term);                                       // Serialize editors' contents  
    const definitionHtml = HtmlSerializer.serialize(definition);

    const { setFieldValue } = this.props;                                                  // Get function used to update matches (in Formik)

    newMatchSchema(matches)
      .validate({ term: termHtml, definition: definitionHtml }, { abortEarly: false })     // Validate serialized term and definition
      .then((valid) => {                                                                   // If valid, merge into matches
        const updatedMatches = [
          {
            term: termHtml,
            definition: definitionHtml
          }, ...matches];
        setFieldValue('matches', updatedMatches);                                          // Update Formik state
        this.handleEditorChange({ value: HtmlSerializer.deserialize('') }, 'term');        // Reset editors' contents
        this.handleEditorChange({ value: HtmlSerializer.deserialize('') }, 'definition');
        this.setFieldError('term', '');                                                    // Clear errors
        this.setFieldError('definition', '');
      })
      .catch((errors) => {                                                                 // If invalid, update state with errors
        errors.inner.forEach((value, index) => {
          let { path, message } = value;
          this.setFieldError(path, message);
        });
      });
    this.handleEditorTouch('term', false);                                                 // Mark field untouched
    this.handleEditorTouch('definition', false);
  }

  render() {

    // eslint-disable-next-line
    const { values, touched, errors, handleChange, handleBlur, isSubmitting, handleSubmit, setFieldValue } = this.props;
    const { activeEditorIndex } = this.state;
    const { term, definition } = this.state;


    console.log('Term touched', touched.term);

    const editorPanes = [
      {
        menuItem: 'Knowledge Bank', render: () =>
          <Tab.Pane>
            <MatchBank
              term={term}
              definition={definition}
              isSubmitting={isSubmitting}
              onEditorTouch={(key, touched) => this.handleEditorTouch(key, touched)}
              onEditorChange={(key, value) => this.handleEditorChange(key, value)}
              onNewMatch={this.handleNewMatch} />
          </Tab.Pane>
      },
      {
        menuItem: 'Expert Mode', render: () =>
          <Tab.Pane>
            <MatchBulkEditor
              name="matchText"
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
              name="title"
              type="text"
              label="Title"
              placeholder="Legends of Computer Science"
              error={errors.title}
              maxlength={40}
              value={values.title}
              onBlur={handleBlur}
              onChange={handleChange}
              tabIndex={1}
            />
            <InputText
              name="instructions"
              type="text"
              label="Instructions"
              placeholder="Match each legend with their accomplishment"
              error={errors.instructions}
              maxlength={60}
              value={values.instructions}
              onBlur={handleBlur}
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
                        name="itemsPerBoard"
                        label="Game Tiles"
                        icon="tiles"
                        tabIndex={-1}
                        selection
                        compact
                        options={itemsPerBoardOptions}
                        error={errors.itemsPerBoard}
                        value={values.itemsPerBoard}
                        onBlur={handleBlur}
                        setFieldValue={setFieldValue}
                      />
                    </Grid.Column>

                    <Grid.Column>
                      <InputDropdown
                        name="duration"
                        label="Seconds"
                        icon="timer"
                        tabIndex={-1}
                        selection
                        compact
                        options={durationOptions}
                        error={errors.duration}
                        value={values.duration}
                        onBlur={handleBlur}
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
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
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
  validationSchema: matchSchema,
  handleSubmit: (values, formikBag) => {
    const { onSubmit } = formikBag.props;
    onSubmit(values, formikBag);
  },
})(MatchForm);