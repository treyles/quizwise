import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import SetCard from './SetCard';
import CreateSetModal from './CreateSetModal';
import Icon from '../utils/Icon';

import { fetchSets } from '../actions/';

// const bsData = [
//   {
//     id: 1,
//     terms: 12,
//     name: 'Technical Interview'
//   },
//   {
//     id: 2,
//     terms: 34,
//     name: 'Soft Skill Questions'
//   },
//   {
//     id: 3,
//     terms: 23,
//     name: 'The Assassination of Jesse James by the Coward Robert Ford'
//   },
//   {
//     id: 4,
//     terms: 32,
//     name:
//       'The Assassination of Jesse James by the Coward Robert Ford and the Eternal Sunshine of the Spotless Mind'
//   }
// ];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };

    this.renderCreateSetModal = this.renderCreateSetModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchSets();
  }

  renderCreateSetModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {
    // console.log(this.props.sets);
    const { isModalOpen } = this.state;
    const { sets } = this.props;

    return (
      <React.Fragment>
        <header className="home-header">
          <h1>Quizwise</h1>
          <div className="header-button-container">
            <span className="term-count">
              <h5>12 SETS</h5>
            </span>
            <button
              className="add-button"
              onClick={this.renderCreateSetModal}
            >
              <Icon icon="createSet" />
            </button>
          </div>
        </header>
        <div className="set-container">
          {sets.map(set => <SetCard key={set.id} data={set} />)}
        </div>
        {isModalOpen && (
          <CreateSetModal closeModal={this.renderCreateSetModal} />
        )}
      </React.Fragment>
    );
  }
}

// export default Home;

const mapStateToProps = state => ({
  sets: state.data.sets
});

export default connect(mapStateToProps, { fetchSets })(Home);
