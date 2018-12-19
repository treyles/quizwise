import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import SetCard from './SetCard';
import CreateSetModal from './CreateSetModal';
import Icon from '../utils/Icon';

import { fetchSets, clearCollection } from '../actions/';

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
    this.props.clearCollection();
  }

  renderCreateSetModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {
    const { isModalOpen } = this.state;
    const { sets } = this.props;

    return (
      <React.Fragment>
        <header className="home-header">
          <h1>Quizwise</h1>
          <div className="header-button-container">
            <span className="term-count">
              <h5>{sets.length} SETS</h5>
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

export default connect(mapStateToProps, { fetchSets, clearCollection })(
  Home
);
