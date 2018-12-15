/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Icon from '../utils/Icon';

import { deleteCard } from '../actions/';

class CollectionCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  // handleClick() {
  //   const { id } = this.props.data;
  //   this.props.deleteCard(id);
  // }

  // componentDidMount() {
  //   console.log(this.props.data);
  // }

  handleClick(e) {
    const { data, deleteCard, history } = this.props;
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
    const { data, deleteCard, number } = this.props;
    const { id } = this.props.data;

    return (
      <div onClick={this.handleClick}>
        {/* <Link to={{ pathname: '/form', state: { data } }}> */}
        <div className="collection-card">
          <span className="card-number">{number + 1}</span>
          <h2>{data.term}</h2>
          <button className="delete-button">
            <Icon icon="delete" />
          </button>
        </div>
        {/* </Link> */}
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

// export default connect(null, { deleteCard })(CollectionCard);

export default withRouter(connect(null, { deleteCard })(CollectionCard));
