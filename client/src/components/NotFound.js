import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

function NotFound({ history }) {
  return (
    <div className="not-found">
      <h1 className="error">404</h1>
      <h1 className="text">Sorry, Page Not Found!</h1>
      <button
        className="home-btn"
        onClick={() => {
          history.push('/');
        }}
      >
        HOME PAGE
      </button>
    </div>
  );
}

NotFound.propTypes = {
  history: PropTypes.object.isRequired // eslint-disable-line
};

export default withRouter(NotFound);
