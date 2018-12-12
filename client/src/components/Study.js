import React from 'react';
import PropTypes from 'prop-types';

class Study extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Study Section'
    };
  }

  render() {
    return (
      <React.Fragment>
        <h1>{this.state.message}</h1>
      </React.Fragment>
    );
  }
}

export default Study;
