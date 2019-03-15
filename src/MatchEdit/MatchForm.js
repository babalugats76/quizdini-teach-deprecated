import React, { Component } from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import parse from 'csv-parse/lib/sync';
import DOMPurify from 'dompurify';

import Button from '../components/Button';
import InputText from '../components/InputText';
import InputDropdown from '../components/InputDropdown';
import HtmlSerializer from './HtmlSerializer'
import MatchBank from './MatchBank';
import MatchBulk from './MatchBulk';
import MatchTable from './MatchTable';
import DisplayFormikState from '../components/FormikHelper';

// eslint-disable-next-line
import { Grid, Tab, Divider, Segment, Form } from 'semantic-ui-react';
import { Accordion } from '../components/Accordion';

const transformMatch = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Title is too short')
    .max(40, 'Title is too long')
    .required('Title is required')
    .default(''),
  instructions: Yup.string()
    .max(60, 'Instructions are too long')
    .default(''),
  config: Yup.object({
    itemsPerBoard: Yup.number()
      .integer()
      .positive()
      .min(4, 'You must have at least 4 items per board')
      .max(5, 'You may have no more than 5 items per board')
      .default(9),
    duration: Yup.number()
      .integer()
      .positive()
      .min(60, 'Games must last at 1 minute long')
      .max(300, 'Game may last no more than 5 minutes')
      .default(180)
  }),
});

const validateMatch = Yup.object().shape(
  {
    title: Yup.string()
      .min(2, 'Title is too short')
      .max(40, 'Title is too long')
      .required('Title is required'),
    instructions: Yup.string()
      .max(60, 'Instructions are too long'),
    itemsPerBoard: Yup.number()
      .integer()
      .positive()
      .min(4, 'You must have at least 4 items per board')
      .max(9, 'You may have no more than 9 items per board'),
    duration: Yup.number()
      .integer()
      .positive()
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

const PURIFY_OPTS = { ALLOWED_TAGS: ['u', 'code', 'sup', 'sub'], ALLOWED_ATTR: [''] };

const matchToString = (matches) => {
  return matches.reduce((accum, vals) => {
    return accum + vals.term + ', ' + vals.definition + '\n';
  }, '');
}

/**
 * Converts bulk string of matches to a properly-formatted array
 * Term and definition values should be comma-delimited
 * Each "match" item should be newline-delimited
 * 
 * This function performs three major functions
 *    Parsing - Splitting text into matches
 *    Sanitizing - Insuring that all inline HTML is safe
 *    Dedup - Enforcing the business rule that matches shall be unique
 * 
 * @param {String} bulkMatches Match content to parse.
 * @return {Array} Parsed matches.
 */
const parseMatch = (bulkMatches) => {

  const parsed = parse(bulkMatches, {           // Use csv-parse
    columns: ['term', 'definition'],            // Give our two columns a name
    skip_empty_lines: true,                     // Skip empty lines, e.g., \n
    skip_lines_with_error: true,                // Ignore failed lines, e.g, misused quotes
    rtrim: true,                                // Remove whitespace from the right         
    ltrim: true,                                // Remove whitespace from the left
    relax_column_count: true                    // Do not throw error on invalid # of columns
  });

  // finally, sanitize, dedup both columns
  let matches = new Array(0).fill(null);                                          // Create empty array (to store matches)
  let uniqueTerms = new Map();                                                    // Create empty map (to store terms seen thus far)
  parsed.reduce((accum, match) => {                                               // Reduce array of lines to valid ones
    if (!match.term || !match.definition) { return accum; }                       // Do not attempt to parse if contents do not exist
    const term = DOMPurify.sanitize(match.term.trim(), PURIFY_OPTS);              // Trim and HTML sanitize term
    const definition = DOMPurify.sanitize(match.definition.trim(), PURIFY_OPTS);  // Trim and HTML sanitize definition
    if (term.length !== 0                                                         // Push if fields are non-empty
      && definition.length !== 0
      && !uniqueTerms.has(term)) {                                                // Skip if term is a duplicate          
      uniqueTerms.set(term, true);                                                // Keep track of terms seen so far
      accum.push({ term, definition });                                           // Add to results
    }
    return accum;                                                                 // In all cases, pass back work-in-progress array
  }, matches);                                                                    // start with empty array (created earlier)

  return matches;                                                                 // Return results

}

class MatchForm extends Component {

  static MATCH_TAB = 0;
  static BULK_TAB = 1;

  state = {
    activeTab: MatchForm.MATCH_TAB,
    term: {
      value: HtmlSerializer.deserialize(''),
      touched: false
    },
    definition: {
      value: HtmlSerializer.deserialize(''),
      touched: false
    }
  }

  termRef = React.createRef();
  definitionRef = React.createRef();

  setFocus = (ref) => {
    ref.current.focus();
  };

  /**
   * @param {Event} event Event to handle.
   * @param {Object} data Contains all form data and props, including activeIndex
   * Update state with new active editor tab
   */
  handleTabChange = (event, data) => {
    event.preventDefault();
    const activeTab = data.activeIndex;  // activeIndex is the current tab pane
    this.setState((state, props) => {
      return {
        activeTab: activeTab
      }
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
        const updated = [
          {
            term: termHtml,
            definition: definitionHtml
          }, ...matches];
        setFieldValue('matches', updated);                                                 // Update Formik state
        setFieldValue('bulkMatches', matchToString(updated));                              // Format bulkMatches then update Formik state
        this.handleEditorChange({ value: HtmlSerializer.deserialize('') }, 'term');        // Reset editors' contents
        this.handleEditorChange({ value: HtmlSerializer.deserialize('') }, 'definition');
        this.setFieldError('term', '');                                                    // Clear errors
        this.setFieldError('definition', '');
        this.setFocus(this.termRef);                                                       // Move focus to term editor
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

  /** 
   * Remove a match from the matches
   * 
   * @param {String} term The term to be removed from matches 
   */
  handleMatchDelete = (event, term) => {
    console.log('handleMatchDelete fired...', term);
    event.preventDefault();
    const { setFieldValue } = this.props;    // Get function used to update matches (from Formik)
    const { matches } = this.props.values;   // Get matches array (from Formik)    
    const filtered = matches.filter((match) => { return match.term !== term; }); // Filter out term
    setFieldValue('matches', filtered); // Update state (in Formik) with matches minus term
    setFieldValue('bulkMatches', matchToString(filtered)); // Format bulkMatches then update Formik state
  }

  /**
   * @param {Event} event Event to handle.
   * @param {Object} data Contains components data value and props.
   * Update state with new `value` from textarea  
   */
  handleBulkChange = (event, data) => {
    console.log('Change to bulk matches detected...');
    event.preventDefault();
    console.log(data);
    const { setFieldValue } = this.props;
    setFieldValue('bulkMatches', data.value);
  }

  /**
   * @param {Event} event Event to handle.
   * Process bulk matches, updating Formik state  
   */
  handleBulkPaste = (event) => {
    console.log('Paste to bulk matches detected...');
    event.preventDefault();                                  // Prevent default
    const pasted = event.clipboardData.getData('text');      // Grab pasted value (consider adding try-catch here)
    const { setFieldValue } = this.props;                    // Grab Formik function (to update state)
    const parsed = parseMatch(pasted);                       // Split, Sanitize, Dedup -> array of matches
    console.log(parsed);
    setFieldValue('matches', parsed);                        // Update matches in Formik state
    setFieldValue('bulkMatches', matchToString(parsed));     // Flatten parsed matches
  }

  handleFileChange = (event) => {

    event.preventDefault();

    if (event.target.files.length) { // Assumes single file processing
      const file = event.target.files[0];
      const contents = event.target.files[0].slice(0, file.size, '');  // 0, size, '' are defaults
      let reader = new FileReader();
      const { setFieldValue } = this.props;                    // Grab Formik function (to update state)

      reader.onload = (function (file, setFieldValue, parseMatch, matchToString) { // Closure which allows access to file and results
        return function (event) {
          console.log(`Loaded ${file.size} bytes from ${file.name}...`);
          if (event.target.result) {                    
            const parsed = parseMatch(event.target.result);          // Split, Sanitize, Dedup -> array of matches
            console.log(event.target.result);
            setFieldValue('matches', parsed);                        // Update matches in Formik state
            setFieldValue('bulkMatches', matchToString(parsed));     // Flatten parsed matches
          }
        }
      })(file, setFieldValue, parseMatch, matchToString);

      reader.readAsText(contents, 'UTF-8');

    }

  }

  render() {

    // eslint-disable-next-line
    const { values, touched, errors, handleChange, handleBlur, isSubmitting, handleSubmit, setFieldValue } = this.props;
    const { activeTab } = this.state;
    const { term, definition } = this.state;

    const editorPanes = [
      {
        menuItem: 'Match Bank',
        render: () =>
          <Tab.Pane>
            <MatchBank
              term={term}
              termRef={this.termRef}
              definitionRef={this.definitionRef}
              definition={definition}
              isSubmitting={isSubmitting}
              onEditorTouch={(field, touched) => this.handleEditorTouch(field, touched)}
              onEditorChange={(value, field) => this.handleEditorChange(value, field)}
              onNewMatch={this.handleNewMatch} />
          </Tab.Pane>
      },
      {
        menuItem: 'Expert Mode', render: () =>
          <Tab.Pane>
            <MatchBulk
              value={values.bulkMatches}
              placeholder="Term, Definition"
              onBulkChange={(event, data) => this.handleBulkChange(event, data)}
              onBulkPaste={(event) => this.handleBulkPaste(event)}
              onFileChange={(event) => this.handleFileChange(event)}
            />
          </Tab.Pane>
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
          tabIndex={6}
          disabled={isSubmitting}>
          SAVE
        </Button>
        <Divider hidden />
        <Grid columns={2} stackable>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <InputText
              name="title"
              type="text"
              label="Title"
              placeholder="Legends of Computer Science"
              tabIndex={1}
              disabled={isSubmitting}
              error={touched.title && errors.title}
              maxlength={40}
              value={values.title}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <InputText
              name="instructions"
              type="text"
              label="Instructions"
              placeholder="Match each legend with their accomplishment"
              tabIndex={2}
              disabled={isSubmitting}
              error={touched.instructions && errors.instructions}
              maxlength={60}
              value={values.instructions}
              onBlur={handleBlur}
              onChange={handleChange}
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
              activeIndex={activeTab}
              onTabChange={(event, props) => this.handleTabChange(event, props)}
              renderActiveOnly={true} />
          </Grid.Column>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <MatchTable
              id="table-match"
              matches={values.matches}
              disabled={isSubmitting}
              onMatchDelete={(event, term) => this.handleMatchDelete(event, term)}
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
  validateOnChange: true,
  validateOnBlur: true,
  mapPropsToValues: ({ match }) => {
    console.log('Mapping props to values...');
    // Cast and transform incoming data as appropriate
    const data = transformMatch.cast({ match });
    // Flatten and map (for use in `values`)
    return {
      title: data.match.title,
      instructions: data.match.instructions,
      itemsPerBoard: data.config.itemsPerBoard,
      duration: data.config.duration,
      matches: data.match.matches,
      bulkMatches: matchToString(data.match.matches)
    }
  },
  validationSchema: validateMatch,
  handleSubmit: (values, formikBag) => {
    const { onSave } = formikBag.props;
    const { setSubmitting } = formikBag;
    onSave(values, setSubmitting);
  },
})(MatchForm);