import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Icon from '../utils/Icon';

class StudyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false
    };

    this.handleCheckSize = this.handleCheckSize.bind(this);
  }

  componentDidMount() {
    this.handleCheckSize();
    window.addEventListener('resize', this.handleCheckSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleCheckSize);
  }

  handleCheckSize() {
    let isMobile;
    if (document.body.clientWidth < 768) {
      isMobile = true;
    } else {
      isMobile = false;
    }
    this.setState({ isMobile });
  }

  render() {
    const {
      handleShuffleClick,
      isShuffled,
      setName,
      cards,
      sessionCards
    } = this.props;

    const { isMobile } = this.state;

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
          <h4>{setName && !isMobile && setName.toUpperCase()}</h4>
          <h4>
            {setName &&
              isMobile &&
              `${setName.slice(0, 17).toUpperCase()}${setName.length > 17
                ? '...'
                : ''}`}
          </h4>
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

StudyHeader.defaultProps = {
  setName: ''
};

StudyHeader.propTypes = {
  handleShuffleClick: PropTypes.func.isRequired,
  isShuffled: PropTypes.bool.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  sessionCards: PropTypes.arrayOf(PropTypes.object).isRequired,
  setName: PropTypes.string
};

const mapStateToProps = state => ({
  sets: state.data.sets,
  setName: state.data.setName,
  cards: state.data.cards,
  sessionCards: state.data.sessionCards
});

export default connect(mapStateToProps, {})(StudyHeader);
