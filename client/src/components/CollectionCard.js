/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

  render() {
    const { data, deleteCard } = this.props;
    const { id } = this.props.data;

    return (
      <div className="collection-card">
        {data.term}
        <button onClick={() => deleteCard(id)}>delete</button>
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
