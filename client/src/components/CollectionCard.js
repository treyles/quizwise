import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Icon from '../utils/Icon';

import { deleteCard } from '../actions/';

class CollectionCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { data, history } = this.props;
    const target = e.target.classList;

    if (target.contains('delete-button')) {
      deleteCard(data.id);
    } else {
      history.push({
        pathname: '/form',
        state: { data }
      });
    }
  }

  render() {
    const { data, number } = this.props;

    return (
      <div onClick={this.handleClick}>
        <div className="collection-card">
          <div className="card-count">{number + 1}</div>
          <div className="card-term">
            <h3>{data.term}</h3>
          </div>
          <div className="card-description">
            <h4>{data.definition}</h4>
          </div>
          <button className="delete-button">
            <Icon icon="delete" />
          </button>
        </div>
      </div>
    );
  }
}

CollectionCard.propTypes = {
  history: PropTypes.object, // eslint-disable-line
  data: PropTypes.shape({
    term: PropTypes.string,
    definition: PropTypes.string
  }).isRequired,
  number: PropTypes.number.isRequired
};

export default withRouter(connect(null, { deleteCard })(CollectionCard));
