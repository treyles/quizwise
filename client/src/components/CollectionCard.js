/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from '../utils/Icon';

import { deleteCard } from '../actions/';

class CollectionCard extends React.Component {
  constructor(props) {
    super(props);

    // this.handleClick = this.handleClick.bind(this);
  }

  // handleClick() {
  //   const { id } = this.props.data;
  //   this.props.deleteCard(id);
  // }

  // componentDidMount() {
  //   console.log(this.props.data);
  // }

  render() {
    const { data, deleteCard, number } = this.props;
    const { id } = this.props.data;

    return (
      <div
        className="collection-card"
        onClick={() => console.log(data.id)}
      >
        <span className="card-number">{number + 1}</span>
        <h2>{data.term}</h2>
        <button className="delete-button" onClick={() => deleteCard(id)}>
          <Icon icon="delete" />
        </button>
      </div>
    );
  }
}

CollectionCard.propTypes = {
  data: PropTypes.shape({
    term: PropTypes.string,
    definition: PropTypes.string
  }).isRequired
};

export default connect(null, { deleteCard })(CollectionCard);
