import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { connect } from 'react-redux';
import SetCard from './SetCard';
import Icon from '../utils/Icon';

const bsData = [
  {
    id: 1,
    terms: 12,
    name: 'Technical Interview'
  },
  {
    id: 2,
    terms: 34,
    name: 'Soft Skill Questions'
  },
  {
    id: 3,
    terms: 23,
    name: 'The Assassination of Jesse James by the Coward Robert Ford'
  }
];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: bsData
    };
  }

  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        <header className="home-header">
          <h1>Quizwise</h1>
          <div className="header-button-container">
            <span className="term-count">
              <h5>12 SETS</h5>
            </span>
            <Link to="/form">
              <button className="add-button">
                <Icon icon="createSet" />
              </button>
            </Link>
          </div>
        </header>
        <div className="set-container">
          {data.map(set => <SetCard key={set.id} data={set} />)}
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
