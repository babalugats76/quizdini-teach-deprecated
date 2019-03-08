import React from 'react';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import MatchForm from './MatchForm';
import MatchLoader from './MatchLoader';
import Loading from '../components/Loading';
import Error from '../components/Error';

const View = ({ loading, initialQuery, data, onLoad, RenderMatchForm, RenderLoading, RenderError }) => (
  <div>
    <MatchLoader initialQuery={initialQuery} onLoad={onLoad} />
    <div>
      {loading
        ? <RenderLoading />
        : <RenderMatchForm match={data} />
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