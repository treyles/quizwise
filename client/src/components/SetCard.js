/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Icon from '../utils/Icon';

import { deleteSet } from '../actions/';

class SetCard extends Component {
  constructor(props) {
    super(props);
    // this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // handleDeleteClick() {
  //   const { deleteSet, data } = this.props;
  //   deleteSet(data.id);
  // }

  handleClick(e) {
    const { deleteSet, data, history } = this.props;
    const t = e.target.classList;

    if (t.contains('set-card')) {
      history.push({
        pathname: `/collection/${data.id}`,
        state: {
          id: data.id
        }
      });
    }

    if (t.contains('delete-button')) {
      deleteSet(data.id);
    }

    if (t.contains('session-button')) {
      console.log('the session button');
    }
  }

  render() {
    const { data } = this.props;

    return (
      // TODO: dont need fragment?
      <React.Fragment>
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
          ) : null // <h5 className="hint">Add 2 terms to unlock study session</h5>
          }
        </div>
      </React.Fragment>
    );
  }
}

// export default SetCard;

// const mapStateToProps = state => ({
//   sets: state.data.sets
// });

export default withRouter(connect(null, { deleteSet })(SetCard));
