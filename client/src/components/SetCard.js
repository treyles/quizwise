/* eslint-disable */
import React, { Component } from 'react';
import Icon from '../utils/Icon';

class SetCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    return (
      <React.Fragment>
        <div className="set-card">
          <div className="name-container">
            <h5 className="set-count">{data.terms} TERMS</h5>
            <h3>{data.name}</h3>
          </div>
          <button className="delete-button">
            <Icon icon="delete" />
          </button>
          <span className="decoration">
            <div />
            <div />
          </span>
          <button className="session-button">STUDY SESSION</button>
        </div>
      </React.Fragment>
    );
  }
}

export default SetCard;
