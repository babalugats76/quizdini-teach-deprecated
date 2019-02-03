import React from 'react';
// eslint-disable-next-line
import Label from './Label';
import { withFormik } from 'formik';

const MatchForm = (props) => {
   //const {values} = props;
   return (
     <form>
         <Label>Hello, World</Label>
     </form>
   );
}

export default withFormik({
  mapPropsToValues: ({ match }) => ({
    ...match
  })
})(MatchForm);