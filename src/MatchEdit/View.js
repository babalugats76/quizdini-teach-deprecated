import React from 'react';
import PropTypes from 'prop-types';
import Match from './Match';
import MatchForm from './MatchForm';
import Loading from '../components/Loading';
import Error from '../components/Error';

const View = ({
  loading,
  initialQuery,
  sleep,
  data,
  error,
  errmsg,
  onLoad,
  onSave,
  RenderMatchForm,
  RenderLoading,
  RenderError
}) => (
  <div>
    <Match initialQuery={initialQuery} sleep={sleep} onLoad={onLoad} />
    <div>
      {((loading, data, error, errmsg) => {
        console.log(loading, data, error);
        if (loading) {
          return <RenderLoading />;
        } else if (error) {
          return <RenderError error={errmsg} />;
        } else {
          console.log('rendering form with...', data);
          return <RenderMatchForm match={data} onSave={onSave} />;
        }
      })(loading, data, error, errmsg)}
    </div>
  </div>
);

View.propTypes = {
  loading: PropTypes.bool.isRequired,
  initialQuery: PropTypes.string.isRequired,
  renderMatchForm: PropTypes.func,
  renderLoading: PropTypes.func,
  renderError: PropTypes.func
};

View.defaultProps = {
  RenderMatchForm: MatchForm,
  RenderLoading: Loading,
  RenderError: Error
};

export default View;
