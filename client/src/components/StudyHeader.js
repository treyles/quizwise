/* eslint-disable */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Icon from '../utils/Icon';

// import { shuffleSessionCards, orderSessionCards } from '../actions';

class StudyHeader extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     arrayL: null
  //   };

  //   // this.handleShuffleClick = this.handleShuffleClick.bind(this);
  // }

  // componentDidMount() {
  //   this.setState({
  //     arrayL: this.props.sessionCards.length
  //   });
  // }

  render() {
    const {
      handleShuffleClick,
      isShuffled,
      setName,
      cards,
      sessionCards
    } = this.props;

    const progressBarStyle = {
      width: `${Math.trunc(sessionCards.length / cards.length * 100)}%`
    };

    const shuffleButtonStyle = {
      pointerEvents: `${!sessionCards.length ? 'none' : 'auto'}`,
      opacity: `${!sessionCards.length ? '.5' : '1'}`
    };

    return (
      <header className="study-header">
        <div className="progress-bar" style={progressBarStyle} />
        <div className="back">
          <Link to="/">
            <span className="back-container">
              <Icon icon="backButton" />
              <span>
                <h5>BACK TO SETS</h5>
              </span>
            </span>
          </Link>
        </div>
        <div className="title">
          <h4>{setName && setName.toUpperCase()}</h4>
          {/* <h4>{Math.trunc(sessionCards.length / cards.length * 100)}</h4> */}
        </div>
        <div className="shuffle">
          <button
            onClick={() => handleShuffleClick()}
            style={shuffleButtonStyle}
          >
            <h5>{isShuffled ? 'ORDER' : 'SHUFFLE'}</h5>
          </button>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  sets: state.data.sets,
  setName: state.data.setName,
  cards: state.data.cards,
  sessionCards: state.data.sessionCards
  // setsLoading: state.data.setsLoading
});

export default connect(mapStateToProps, {})(StudyHeader);
