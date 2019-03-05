import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import MatchEditor from './MatchEditor';
import Button from './Button';
import Html from 'slate-html-serializer';

import DisplayFormikState from './FormikHelper';

const MatchEditorSchema = ({ matches, values, setFieldValue }) => {

  const termHtml = serializer.serialize(values.term);
  const definitionHtml = serializer.serialize(values.definition);
  console.log(termHtml);
  console.log(definitionHtml);
  setFieldValue('termHtml', termHtml);
  setFieldValue('definitionHtml', definitionHtml);

  return Yup.object().shape(
    {
      termHtml: Yup.string()
        .required('Term is required')
        .test('duplicate term', 'Duplicate term',
          function (value) {
            const passed = !matches.some((element) => { return element.term === value; });  // check for duplicate terms
            return passed;
          }),
      definitionHtml: Yup.string().required('Definition is required')
    }
  );
};

const BLOCK_TAGS = {
  p: 'paragraph'
};

// Add a dictionary of mark tags.
const MARK_TAGS = {
  u: 'underline',
  code: 'code',
  sup: 'superscript',
  sub: 'subscript'
};

const rules = [
  {
    deserialize(el, next) {
      if (BLOCK_TAGS[el.tagName.toLowerCase()] === 'p') {
        return {
          object: 'block',
          type: 'paragraph',
          data: {
            className: el.getAttribute('class'),
          },
          nodes: next(el.childNodes),
        }
      }
    },
    // Add a serializing function property to our rule...
    serialize(obj, children) {
      if (obj.object === 'block') {
        switch (obj.type) {
          case 'paragraph':
            /**
             * In this case, do not wrap in <p>
             * Return plain text, coupled with HTML mark for styling only
             * (of the children)
             */
            return (<React.Fragment>{children}</React.Fragment>);
          default:
            break;
        }
      }
    },
  },
  {
    deserialize(el, next) {
      /* whitelist of tags */
      const type = MARK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: 'mark',
          type: type,
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object === 'mark') {
        switch (obj.type) {
          case 'underline':
            return <u>{children}</u>;
          case 'code':
            return <code>{children}</code>;
          case 'superscript':
            return <sup>{children}</sup>;
          case 'subscript':
            return <sub>{children}</sub>;
          default:
            break;
        }
      }
    }
  }
];

const serializer = new Html({ rules: rules });

class MatchBank extends Component {

  /*state = { 
    term: serializer.deserialize(''),
    definition: serializer.deserialize('')  
  };*/

  /**
   * On editor change, save the new `value` (Map) to state
   *
   * @param {Editor} editor
   */
  handleEditorChange = ({ value }, key) => {
    console.log('handleEditorCalled....');
    const { setFieldValue } = this.props;
    setFieldValue(key, value);
  }

  render() {

    // eslint-disable-next-line
    const { values, touched, errors, handleChange, isSubmitting, handleSubmit, setFieldValue } = this.props;

    return (
      <div>
        <MatchEditor
          id="term"
          value={values.term}
          placeholder="Enter term..."
          onChange={(value, key) => this.handleEditorChange(value, key)}
        />
        <Divider />
       <MatchEditor
          id="definition"
          value={values.definition}
          placeholder="Enter definition..."
          onChange={(value, key) => this.handleEditorChange(value, key)}
        />
        <Button
          secondary
          loading={isSubmitting}
          active
          title="Add to the Knowledge Bank"
          icon="save"
          size="small"
          type="submit"
          floated="right"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          ADD
        </Button>
        <DisplayFormikState {...this.props} />
      </div>
    );
  }
}

MatchBank.propTypes = {

};

MatchBank.defaultProps = {

};

export default withFormik({
  enableReinitialize: true,
  validateOnChange: false,
  validateOnBlur: false,
  mapPropsToValues: () => ({
    term:  serializer.deserialize(''),
    definition: serializer.deserialize(''),
    termHtml: '',
    definitionHtml: ''
  }),
  validationSchema: MatchEditorSchema,
  handleSubmit: (values, formikBag) => {
    //setTimeout(() => { console.log(values); formikBag.setSubmitting(false); }, 10000);
     formikBag.setSubmitting(false);
    //console.log(values);
    // eslint-disable-next-line
   // const { termHtml, definitionHtml } = values;
   // formikBag.props.onNewMatch({ termHtml, definitionHtml });
   // formikBag.resetForm();
    //const { onSubmit } = formikBag.props;
    //onSubmit(values, formikBag);
    //formikBag.setFieldValue('term','');
    //formikBag.setFieldValue('definition', '');
  },
})(MatchBank);