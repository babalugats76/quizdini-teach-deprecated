import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import MatchEditor from './MatchEditor';
// eslint-disable-next-line
import Button from './Button';

import DisplayFormikState from './FormikHelper';

const MatchEditorSchema = Yup.object().shape(
  {
    term: Yup.string().required('Term is required'),
    definition: Yup.string().required('Definition is required')
  }
);

class MatchEditorSubform extends Component {
  
  state = {};

  render() {

    // eslint-disable-next-line
    const { values, touched, errors, handleChange, isSubmitting, handleSubmit, setFieldValue } = this.props;

    return (
      <div>
        <MatchEditor
          id="term"
          value={values.term}
          placeholder="Enter term..."
          setFieldValue={setFieldValue}
        />
        <Divider />
        <MatchEditor
          id="definition"
          value={values.definition}
          placeholder="Enter definition..."
          setFieldValue={setFieldValue}
        />
        <Button
          secondary
          loading={isSubmitting}
          active
          title="ADD"
          icon="save"
          size="small"
          type="submit"
          floated="right"
          disabled={isSubmitting}
          onClick={handleSubmit}
          >
          Save
        </Button>
        <DisplayFormikState {...this.props} />
      </div>
    );
  }
}

MatchEditorSubform.propTypes = {

};

MatchEditorSubform.defaultProps = {

};

export default withFormik({
  enableReinitialize: true,
  validateOnChange: false,
  validateOnBlur: false,
  mapPropsToValues: () => ({
    term: '',
    definition: ''
  }),
  validationSchema: MatchEditorSchema,
  handleSubmit: (payload, otherProps) => {
    // eslint-disable-next-line
    const { onSubmit } = otherProps.props;
    const { setSubmitting } = otherProps;
    onSubmit(payload, setSubmitting);
  },
})(MatchEditorSubform);