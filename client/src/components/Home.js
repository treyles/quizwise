import React from 'react';
import PropTypes from 'prop-types';
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
    window.scrollTo(0, 0);
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
    const { sets, setsLoading } = this.props;

    const placeholder = [...Array(3)].map((_, index) => (
      <div key={index} className="placeholder" />
    ));

    const emptyMessage = (
      <div className="empty-message">
        <h2>{"You don't have any sets yet"}</h2>
        <h4>CREATE A SET TO START STUDYING</h4>
      </div>
    );

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
          {setsLoading && placeholder}
          {!setsLoading && !sets.length && emptyMessage}
          {sets.map(set => <SetCard key={set.id} data={set} />)}
        </div>
        {isModalOpen && (
          <CreateSetModal closeModal={this.renderCreateSetModal} />
        )}
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  sets: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchSets: PropTypes.func.isRequired,
  clearCollection: PropTypes.func.isRequired,
  setsLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  sets: state.data.sets,
  setsLoading: state.data.setsLoading
});

export default connect(mapStateToProps, { fetchSets, clearCollection })(
  Home
);
