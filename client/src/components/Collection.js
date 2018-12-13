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
      <div className="collection">
        <header className="collection-header">
          <h1>Quizwise</h1>
          <div className="header-button-container">
            <button className="session-button">START STUDY SESSION</button>
            <button className="add-button">ADD FLASHCARD</button>
          </div>
        </header>
        <div className="card-counter">{cards.length} FLASHCARDS</div>
        <section className="collection-section">
          <div className="card-container">
            {cards.map((card, index) => (
              <CollectionCard key={card.id} data={card} number={index} />
            ))}
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cards: state.data.cards
});

export default connect(mapStateToProps, { fetchCards })(Collection);
