import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CollectionCard from './CollectionCard';
import CardForm from './CardForm';
import Icon from '../utils/Icon';

import { fetchCards } from '../actions/';

class Collection extends React.Component {
  componentDidMount() {
    this.props.fetchCards();
  }

  render() {
    const { cards } = this.props;
    return (
      <div className="collection">
        <header className="collection-header">
          <div className="collection-back">
            <Icon icon="backButton" />
            <span>
              <h5>BACK TO SETS</h5>
            </span>
          </div>
          <div className="header-button-container">
            <div className="term-count">
              <h5>{cards.length} TERMS</h5>
            </div>
            <button className="session-button">STUDY SESSION</button>
            <Link to="/form">
              <button className="add-button">
                <Icon icon="addTerm" />
              </button>
            </Link>
          </div>
        </header>
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
