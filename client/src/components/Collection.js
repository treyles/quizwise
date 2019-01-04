/* eslint-disable */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CollectionCard from './CollectionCard';
import CardForm from './CardForm';
import Icon from '../utils/Icon';

import { fetchCollection } from '../actions/';

class Collection extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const routerState = this.props.location.state;
    this.props.fetchCollection(routerState.id);
  }

  render() {
    const { cards, cardsLoading, currentSet } = this.props;

    const placeholder = [...Array(3)].map((_, index) => (
      <div key={index} className="placeholder" />
    ));

    const emptyMessage = (
      <div className="empty-message">
        <h2>{"You don't have any cards in this set"}</h2>
        <h4>CREATE 2 TERMS TO START STUDYING</h4>
      </div>
    );

    return (
      <div className="collection">
        <header className="collection-header">
          <Link to="/">
            <div className="collection-back">
              <Icon icon="backButton" />
              <span>
                <h5>BACK TO SETS</h5>
              </span>
            </div>
          </Link>
          <div className="header-button-container">
            <span className="term-count">
              <h5>{cards.length} TERMS</h5>
            </span>
            {/* {cards.length > 1 && (
              <button className="session-button">STUDY SESSION</button>
            )} */}
            <Link
              to={{
                pathname: `/study/${currentSet}`,
                state: { id: currentSet }
              }}
            >
              <button
                className={
                  cards.length > 1
                    ? 'session-button'
                    : 'session-button disable'
                }
              >
                STUDY SESSION
              </button>
            </Link>
            <Link to="/form">
              <button className="add-button">
                <Icon icon="addTerm" />
              </button>
            </Link>
          </div>
        </header>
        <section className="collection-section">
          <div className="card-container">
            {cardsLoading && placeholder}
            {!cardsLoading && !cards.length && emptyMessage}
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
  cards: state.data.cards,
  cardsLoading: state.data.cardsLoading,
  currentSet: state.data.currentSet
});

export default connect(mapStateToProps, { fetchCollection })(Collection);
