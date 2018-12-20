/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../utils/Icon';

class Study extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   message: 'Study Section'
    // };
  }

  render() {
    return (
      <React.Fragment>
        <header className="study-header">
          <div className="back">
            <span className="back-container">
              <Icon icon="backButton" />
              <span>
                <h5>BACK TO SETS</h5>
              </span>
            </span>
          </div>
          <div className="title">
            <h4>TECHNICAL QUESTIONS</h4>
          </div>
          <div className="shuffle">
            <button>
              <h5>SHUFFLE</h5>
            </button>
          </div>
        </header>
        <div className="study-card-container">
          <div className="study-card">card</div>
        </div>
      </React.Fragment>
    );
  }
}

export default Study;
