import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CollectionCard from './CollectionCard';

import { fetchCards } from '../actions/';

class Collection extends React.Component {
  componentWillMount() {
    this.props.fetchCards();
  }

  render() {
    const { cards } = this.props;
    return (
      <React.Fragment>
        {cards.map(card => <CollectionCard key={card.id} data={card} />)}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cards: state.data.cards
});

export default connect(mapStateToProps, { fetchCards })(Collection);
