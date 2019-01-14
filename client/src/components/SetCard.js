import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Icon from '../utils/Icon';

import { deleteSet } from '../actions/';

class SetCard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { data, history, deleteSet } = this.props;
    const t = e.target.classList;

    if (t.contains('set-card')) {
      history.push({
        pathname: `/collection/${data.id}`,
        state: { id: data.id }
      });
    }

    if (t.contains('delete-button')) {
      deleteSet(data.id);
    }

    if (t.contains('session-button')) {
      history.push({
        pathname: `/study/${data.id}`,
        state: { id: data.id }
      });
    }
  }

  render() {
    const { data } = this.props;

    return (
      <div className="set-card" onClick={this.handleClick}>
        <div className="name-container">
          <h5 className="set-count">
            {data.terms ? `${data.terms} TERMS` : 'EMPTY'}
          </h5>
          <h3>{data.name}</h3>
        </div>
        <button className="delete-button">
          <Icon icon="delete" />
        </button>
        <span className="decoration">
          <div />
          <div />
        </span>
        {data.terms > 1 ? (
          <button className="session-button">STUDY SESSION</button>
        ) : (
          <h5 className="hint">
            Add {data.terms < 1 ? '2 terms' : '1 term'} to unlock study
            session
          </h5>
        )}
      </div>
    );
  }
}

SetCard.propTypes = {
  history: PropTypes.object, // eslint-disable-line
  data: PropTypes.shape({
    id: PropTypes.number,
    terms: PropTypes.number,
    name: PropTypes.string
  }).isRequired,
  deleteSet: PropTypes.func.isRequired
};

export default withRouter(connect(null, { deleteSet })(SetCard));
