import React, { Component } from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import parse from 'csv-parse/lib/sync';
import DOMPurify from 'dompurify';

import Button from '../components/Button';
import InputText from '../components/InputText';
import IconDropdown from '../components/IconDropdown';
import HtmlSerializer from './HtmlSerializer';
import MatchBank from './MatchBank';
import MatchBulk from './MatchBulk';
import MatchTable from './MatchTable';
import DisplayFormikState from '../components/FormikHelper';

// eslint-disable-next-line
import { Grid, Tab, Divider, Segment, Form } from 'semantic-ui-react';
import { Accordion } from '../components/Accordion';

/* eslint-disable no-template-curly-in-string */
const transformMatch = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Title is too short. ${min} characters are required.')
    .max(40, 'Title is too long. ${max} characters are allowed.')
    .required('Title is required.')
    .default(''),
  instructions: Yup.string()
    .max(60, 'Instructions are too long. ${max} characters are allowed.')
    .default(''),
  config: Yup.object({
    itemsPerBoard: Yup.number()
      .integer()
      .positive()
      .required('Game Tiles is required.')
      .min(4, 'Game must contain at least ${min} tiles.')
      .max(9, 'Game may contain no more than ${max} tiles.')
      .default(9),
    duration: Yup.number()
      .integer()
      .positive()
      .required('Duration is required.')
      .min(60, 'Games must last at least ${min} seconds.')
      .max(300, 'Game may last no more than ${max} seconds.')
      .default(180)
  }),
  matches: Yup.array()
    .required('Matches are required.')
    .default(() => [])
});

/* eslint-disable no-template-curly-in-string */
const validateMatch = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Title is too short. ${min} characters are required.')
    .max(40, 'Title is too long. ${max} characters are allowed.')
    .required('Title is required.'),
  instructions: Yup.string().max(
    60,
    'Instructions are too long. ${max} characters are allowed.'
  ),
  itemsPerBoard: Yup.number()
    .integer()
    .positive()
    .required('Game Tiles is required.')
    .min(4, 'Game must contain at least ${min} tiles.')
    .max(9, 'Game may contain no more than ${max} tiles.'),
  duration: Yup.number()
    .integer()
    .positive()
    .required('Duration is required.')
    .min(60, 'Games must last at least ${min} seconds.')
    .max(300, 'Game may last no more than ${max} seconds.'),
  matches: Yup.array().test({
    name: 'min-matches',
    params: {
      itemsPerBoard: Yup.ref('itemsPerBoard')
    },
    message: '${itemsPerBoard} matches required in bank.',
    test: function(value) {
      return value.length >= this.parent.itemsPerBoard;
    }
  })
});

const newMatchSchema = matches => {
  return Yup.object().shape({
    term: Yup.string()
      .required('Term is required')
      .test('duplicate term', 'Duplicate term', function(value) {
        const passed = !matches.some(element => {
          return element.term === value;
        }); // check for duplicate terms
        return passed;
      }),
    definition: Yup.string().required('Definition is required')
  });
};

const itemsPerBoardOptions = [
  { text: '4', value: 4 },
  { text: '5', value: 5 },
  { text: '6', value: 6 },
  { text: '7', value: 7 },
  { text: '8', value: 8 },
  { text: '9', value: 9 }
];

const durationOptions = [
  { text: '60', value: 60 },
  { text: '90', value: 90 },
  { text: '120', value: 120 },
  { text: '180', value: 180 },
  { text: '240', value: 240 },
  { text: '300', value: 300 }
];

const PURIFY_OPTS = {
  ALLOWED_TAGS: ['u', 'code', 'sup', 'sub'],
  ALLOWED_ATTR: ['']
};

const matchToString = matches => {
  return matches.reduce((accum, vals) => {
    return accum + vals.term + ', ' + vals.definition + '\n';
  }, '');
};

/**
 * Converts bulk string of matches to a properly-formatted array.
 * Term and definition values should be comma-delimited.
 * Each "match" item should be newline-delimited.
 *
 * This function performs three major functions
 *    Parsing - Splitting text into matches
 *    Sanitizing - Insuring that all inline HTML is safe
 *    Dedup - Enforcing the business rule that matches shall be unique
 *
 * @param {string} bulkMatches Match content to parse.
 * @return {Array} Parsed matches.
 */
const parseMatch = bulkMatches => {
  const parsed = parse(bulkMatches, {
    // Use csv-parse
    columns: ['term', 'definition'], // Give our two columns a name
    skip_empty_lines: true, // Skip empty lines, e.g., \n
    skip_lines_with_error: true, // Ignore failed lines, e.g, misused quotes
    rtrim: true, // Remove whitespace from the right
    ltrim: true, // Remove whitespace from the left
    relax_column_count: true // Do not throw error on invalid # of columns
  });

  // finally, sanitize, dedup both columns
  let matches = new Array(0).fill(null); // Create empty array (to store matches)
  let uniqueTerms = new Map(); // Create empty map (to store terms seen thus far)
  parsed.reduce((accum, match) => {
    // Reduce array of lines to valid ones
    if (!match.term || !match.definition) {
      return accum;
    } // Do not attempt to parse if contents do not exist
    const term = DOMPurify.sanitize(match.term.trim(), PURIFY_OPTS); // Trim and HTML sanitize term
    const definition = DOMPurify.sanitize(match.definition.trim(), PURIFY_OPTS); // Trim and HTML sanitize definition
    if (
      term.length !== 0 && // Push if fields are non-empty
      definition.length !== 0 &&
      !uniqueTerms.has(term)
    ) {
      // Skip if term is a duplicate
      uniqueTerms.set(term, true); // Keep track of terms seen so far
      accum.push({ term, definition }); // Add to results
    }
    return accum; // In all cases, pass back work-in-progress array
  }, matches); // start with empty array (created earlier)

  return matches; // Return results
};

class MatchForm extends Component {
  static MATCH_TAB = 0;
  static BULK_TAB = 1;
  static GAME_OPTS_ACCORDION = 'gameOptions';

  state = {
    // Use to track open/close state of accordions
    accordion: {
      [MatchForm.GAME_OPTS_ACCORDION]: false // Closed by default
    },
    activeTab: MatchForm.MATCH_TAB,
    activePage: 1,
    itemsPerPage: 11,
    term: {
      placeholder: '',
      touched: false,
      value: HtmlSerializer.deserialize('')
    },
    definition: {
      placeholder: '',
      touched: false,
      value: HtmlSerializer.deserialize('')
    }
  };

  termRef = React.createRef();
  definitionRef = React.createRef();

  setFocus = ref => {
    ref.current.focus();
  };

  /**
   * If title is clicked, toggle state of accordion
   * Used to expand/collapse accordions
   *
   * @param {Event} event Event to handle.
   * @param {Object} titleProps Props from <Accordion.Title>
   */
  handleAccordionClick = (event, titleProps) => {
    this.setState((state, props) => {
      return {
        accordion: {
          ...state.accordion,
          [titleProps.index]: !state.accordion[titleProps.index]
        }
      };
    });
  };

  /**
   * Update state with new value for the active editor tab.
   *
   * @param {Event} event Event to handle.
   * @param {Object} data Contains all form data and props, including activeIndex.
   */
  handleTabChange = (event, data) => {
    event.preventDefault();
    const activeTab = data.activeIndex; // activeIndex is the current tab pane
    this.setState((state, props) => {
      return { activeTab: activeTab };
    });
  };

  /**
   * Update state with new value for the active page in match paginator.
   *
   * @param {Event} event Event to handle.
   * @param {Object} data Contains all form data and props, including activePage.
   */
  handlePageChange = (event, data) => {
    event.preventDefault();
    const activePage = data.activePage;
    this.setActivePage(activePage);
  };

  /**
   * Update state with new `activePage` value of the paginator.
   *
   * @param {number} activePage Value to set for activePage.
   */
  setActivePage = activePage => {
    this.setState((state, props) => {
      return { activePage };
    });
  };

  /**
   * Update state with new `value` (Map) of the editor.
   *
   * @param {Editor} editor Editor object to grab `value` from.
   * @param {string} field Name of the field.
   */
  handleEditorChange = ({ value }, field) => {
    this.setState((state, props) => {
      return { [field]: { ...state[field], value: value } };
    });
  };

  /**
   * Updated `touched` state of field.
   *
   * @param {string} field Name of the field.
   * @param {boolean} touched Whether interactive with field has occurred (or not).
   */
  handleEditorTouch = (field, touched) => {
    this.setState((state, props) => {
      return { [field]: { ...state[field], touched: touched } };
    });
  };

  /**
   * Updated `error` state of field.
   *
   * @param {string} field Name of the field.
   * @param {boolean} error Error message.
   */
  setError = (field, error) => {
    this.setState((state, props) => {
      return { [field]: { ...state[field], error: error } };
    });
  };

  handleNewMatch = event => {
    event.preventDefault();

    const { matches } = this.props.values; // Get matches (from Formik)
    const term = this.state.term.value; // Get editors' contents (from state)
    const definition = this.state.definition.value;

    const termHtml = HtmlSerializer.serialize(term); // Serialize editors' contents
    const definitionHtml = HtmlSerializer.serialize(definition);

    const { setFieldValue } = this.props; // Get function used to update matches (in Formik)

    newMatchSchema(matches)
      .validate(
        { term: termHtml, definition: definitionHtml },
        { abortEarly: false }
      ) // Validate serialized term and definition
      .then(valid => {
        // If valid, merge into matches
        const updated = [
          {
            term: termHtml,
            definition: definitionHtml
          },
          ...matches
        ];
        setFieldValue('matches', updated); // Update Formik state
        setFieldValue('bulkMatches', matchToString(updated)); // Format bulkMatches then update Formik state
        this.handleEditorChange(
          { value: HtmlSerializer.deserialize('') },
          'term'
        ); // Reset editors' contents
        this.handleEditorChange(
          { value: HtmlSerializer.deserialize('') },
          'definition'
        );
        this.setError('term', ''); // Clear errors (using custom function)
        this.setError('definition', '');
        this.setFocus(this.termRef); // Move focus to term editor
      })
      .catch(errors => {
        // If invalid, update state with errors
        errors.inner.forEach((value, index) => {
          let { path, message } = value;
          this.setError(path, message);
        });
      });
    this.handleEditorTouch('term', false); // Mark fields untouched
    this.handleEditorTouch('definition', false);
    this.setActivePage(1); // Reset pagination to beginning
  };

  /**
   * Remove a match.
   *
   * @param {string} term The term to be removed from matches.
   */
  handleMatchDelete = (event, term) => {
    event.preventDefault();
    const { setFieldValue } = this.props; // Get function used to update matches (Formik)
    const { matches } = this.props.values; // Get matches array (Formik)
    const filtered = matches.filter(match => {
      // Filter out (deleted) term
      return match.term !== term;
    });
    setFieldValue('matches', filtered); // Update state (in Formik) with matches minus (deleted) term
    setFieldValue('bulkMatches', matchToString(filtered)); // Format bulkMatches then update Formik state
    const { activePage, itemsPerPage } = this.state; // Grab pagination value from state
    const totalPages = Math.ceil(
      (filtered.length ? filtered.length : 0) / itemsPerPage
    ); // Calculate total # of pages
    if (activePage > totalPages) {
      // If active page does not exist (because of delete)
      this.setActivePage(totalPages); // Set to current number of pages
    }
  };

  /**
   * Update state with new `value` from textarea
   *
   * @param {Event} event Event to handle.
   * @param {Object} data Contains components data value and props.
   */
  handleBulkChange = (event, data) => {
    event.preventDefault();
    console.log(data);
    const { setFieldValue } = this.props;
    setFieldValue('bulkMatches', data.value);
  };

  /**
   * Process bulk matches, updating Formik state, etc.
   *
   * @param {Event} event Event to handle.
   */
  handleUpdateMatches = event => {
    event.preventDefault();
    const { bulkMatches } = this.props.values; // Grab bulk matches from Formik state
    this.updateMatches(bulkMatches); // Call common function to parse, santize, dedup, and update state, etc.
  };

  /**
   * Perform shared bulk match processing.
   *
   * @param {string} bulkMatches Matches in unprocessed csv form.
   */
  updateMatches = bulkMatches => {
    const { setFieldValue } = this.props; // Grab Formik function (to update state)
    const parsed = parseMatch(bulkMatches); // Split, Sanitize, Dedup -> array of matches
    setFieldValue('matches', parsed); // Update matches in Formik state
    setFieldValue('bulkMatches', matchToString(parsed)); // Flatten parsed matches
    this.setActivePage(1); // Reset pagination to beginning
  };

  /**
   * Process bulk matches, updating Formik state, etc.
   *
   * @param {Event} event Event to handle, i.e., pasting into a field.
   */
  handleBulkPaste = event => {
    event.preventDefault(); // Prevent default
    const pasted = event.clipboardData.getData('text'); // Grab pasted value (consider adding try-catch here)
    this.updateMatches(pasted); // Call common function to parse, santize, dedup, and update state, etc.
  };

  /**
   * Process bulk matches from user-provided text file.
   *
   * @param {Event} event. Event to handle.
   */
  handleFileChange = event => {
    event.preventDefault();

    if (event.target.files.length) {
      const file = event.target.files[0]; // Assumes single file processing
      const contents = event.target.files[0].slice(0, file.size, ''); // 0, size, '' are defaults
      const reader = new FileReader(); // To read file from disk

      reader.onload = (function(file, updateMatches) {
        // Closure run upon read completion
        return function(event) {
          console.log(`Loaded ${file.size} bytes from ${file.name}...`);
          if (event.target.result) {
            // If results are returned
            updateMatches(event.target.result); // Call common function to parse, santize, dedup, and update state, etc.
            event.target.value = null;
          }
        };
      })(file, this.updateMatches);

      reader.readAsText(contents, 'UTF-8'); // Initiate file read, assuming UTF-8 encoding
    }
  };

  render() {
    // eslint-disable-next-line
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      isSubmitting,
      handleSubmit,
      setFieldValue
    } = this.props;
    const { activeTab, activePage, itemsPerPage } = this.state;
    const { term, definition, accordion } = this.state;

    const editorPanes = [
      {
        menuItem: 'Match Bank',
        render: () => (
          <Tab.Pane>
            <MatchBank
              term={term}
              termRef={this.termRef}
              definition={definition}
              definitionRef={this.definitionRef}
              disabled={isSubmitting}
              error={errors.matches}
              onEditorTouch={(field, touched) =>
                this.handleEditorTouch(field, touched)
              }
              onEditorChange={(value, field) =>
                this.handleEditorChange(value, field)
              }
              onNewMatch={this.handleNewMatch}
            />
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Expert Mode',
        render: () => (
          <Tab.Pane>
            <MatchBulk
              value={values.bulkMatches}
              placeholder='Term, Definition'
              isSubmitting={isSubmitting}
              onBulkChange={(event, data) => this.handleBulkChange(event, data)}
              onUpdateMatches={event => this.handleUpdateMatches(event)}
              onBulkPaste={event => this.handleBulkPaste(event)}
              onFileChange={event => this.handleFileChange(event)}
            />
          </Tab.Pane>
        )
      }
    ];

    return (
      <Form onSubmit={handleSubmit}>
        <Button
          primary
          loading={isSubmitting}
          active
          title='Save Game'
          icon='save'
          size='small'
          type='submit'
          tabIndex={6}
          disabled={isSubmitting}
        >
          SAVE
        </Button>
        <Divider hidden />
        <Grid columns={2} stackable>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Segment>
              <InputText
                name='title'
                type='text'
                label='Title'
                placeholder=''
                tabIndex={1}
                disabled={isSubmitting}
                error={touched.title && errors.title}
                maxlength={40}
                value={values.title}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <InputText
                name='instructions'
                type='text'
                label='Instructions'
                placeholder=''
                tabIndex={2}
                disabled={isSubmitting}
                error={touched.instructions && errors.instructions}
                maxlength={60}
                value={values.instructions}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <Accordion
                index={MatchForm.GAME_OPTS_ACCORDION}
                onClick={(event, titleProps) =>
                  this.handleAccordionClick(event, titleProps)
                }
                open={accordion[MatchForm.GAME_OPTS_ACCORDION]}
                forceOpen={!!errors.itemsPerBoard || !!errors.duration}
              >
                <Segment basic>
                  <Grid columns={2} stackable textAlign='center'>
                    <Grid.Row>
                      <Grid.Column verticalAlign='top'>
                        <IconDropdown
                          name='itemsPerBoard'
                          label='Game Tiles'
                          icon='tiles'
                          tabIndex={-1}
                          disabled={isSubmitting}
                          selection
                          compact
                          options={itemsPerBoardOptions}
                          error={touched.itemsPerBoard && errors.itemsPerBoard}
                          value={values.itemsPerBoard}
                          onBlur={handleBlur}
                          setFieldValue={setFieldValue}
                        />
                      </Grid.Column>
                      <Grid.Column verticalAlign='top'>
                        <IconDropdown
                          name='duration'
                          label='Seconds'
                          icon='timer'
                          tabIndex={-1}
                          disabled={isSubmitting}
                          selection
                          compact
                          options={durationOptions}
                          error={touched.duration && errors.duration}
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
                onTabChange={(event, data) => this.handleTabChange(event, data)}
                renderActiveOnly={true}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <MatchTable
              id='table-match'
              matches={values.matches}
              activePage={activePage}
              itemsPerPage={itemsPerPage}
              disabled={isSubmitting}
              error={
                errors.matches &&
                `Add at least ${values.itemsPerBoard -
                  values.matches.length} more term${
                  values.itemsPerBoard - values.matches.length === 1 ? '' : 's'
                }...`
              }
              onMatchDelete={(event, term) =>
                this.handleMatchDelete(event, term)
              }
              onPageChange={(event, data) => this.handlePageChange(event, data)}
            />
          </Grid.Column>
        </Grid>
        <DisplayFormikState {...this.props} />
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </Form>
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

    console.log('data', data);

    // Flatten and map (for use in `values`)
    return {
      title: data.match.title,
      instructions: data.match.instructions,
      itemsPerBoard: data.config.itemsPerBoard,
      duration: data.config.duration,
      matches: data.match.matches || [],
      bulkMatches: matchToString(data.match.matches || [])
    };
  },
  validationSchema: validateMatch,
  handleSubmit: (values, formikBag) => {
    const { onSave } = formikBag.props;
    const { setSubmitting } = formikBag;
    onSave(values, setSubmitting, 4000);
  }
})(MatchForm);
