import React from 'react';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import MatchForm from './MatchForm';
import MatchLoader from './MatchLoader';
import Loading from '../components/Loading';
import Error from '../components/Error';

const View = ({ loading, initialQuery, data, error, onLoad, RenderMatchForm, RenderLoading, RenderError }) => (
  <div>
    <MatchLoader initialQuery={initialQuery} onLoad={onLoad} />
    <div>
      {
        ((loading, data, error) => {
          console.log(loading, data, error);
          if (loading) {
            console.log('loading...');
            return <RenderLoading />
          } else if (error) {
            console.log('error...');
            return <RenderError />
          } else {
            console.log('rendering form with...', data);
            return <RenderMatchForm match={data} />
          }
        })(loading, data, error)
      }
    </div>
  </div>
);

View.propTypes = {
  loading: PropTypes.bool.isRequired,
  initialQuery: PropTypes.string.isRequired,
  renderMatchForm: PropTypes.func,
  renderLoading: PropTypes.func,
  renderError: PropTypes.func,
};

View.defaultProps = {
  RenderMatchForm: MatchForm,
  RenderLoading: Loading,
  RenderError: Error,
}

export default View;