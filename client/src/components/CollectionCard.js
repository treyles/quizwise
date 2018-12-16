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

    console.log(data);

    return (
      <div onClick={this.handleClick}>
        {/* <Link to={{ pathname: '/form', state: { data } }}> */}
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
