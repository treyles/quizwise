/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from '../utils/Icon';

import { deleteSet } from '../actions/';

class SetCard extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick() {
    const { deleteSet, data } = this.props;
    deleteSet(data.id);
  }

  render() {
    const { data } = this.props;
    return (
      <React.Fragment>
        <div className="set-card">
          <div className="name-container">
            <h5 className="set-count">
              {/* {data.terms ? `${data.terms} TERMS` : '0 TERMS'} */}
              {data.terms ? `${data.terms} TERMS` : 'EMPTY SET'}
              {/* 12 TERMS */}
            </h5>
            <h3>{data.name}</h3>
          </div>
          <button
            className="delete-button"
            onClick={this.handleDeleteClick}
          >
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

// export default SetCard;

// const mapStateToProps = state => ({
//   sets: state.data.sets
// });

export default connect(null, { deleteSet })(SetCard);
