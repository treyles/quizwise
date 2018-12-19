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
    const { cards } = this.props;

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
            <button
              className={
                cards.length > 1
                  ? 'session-button'
                  : 'session-button disable'
              }
            >
              STUDY SESSION
            </button>
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

export default connect(mapStateToProps, { fetchCollection })(Collection);
