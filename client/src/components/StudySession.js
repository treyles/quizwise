/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Swipeable from 'react-swipeable';

import Icon from '../utils/Icon';
import StudyCard from '../components/StudyCard';
import {
  fetchCollection,
  fetchSession,
  removeSessionCard,
  loadSkippedCards,
  reloadSessionCards,
  clearSession
} from '../actions';

// TODO: put in it's own component
function Header() {
  return (
    <header className="study-header">
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
        <h4>TECHNICAL QUESTIONS</h4>
      </div>
      <div className="shuffle">
        <button>
          <h5>SHUFFLE</h5>
        </button>
      </div>
    </header>
  );
}

class StudySession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skippedCards: [],
      isDragging: false,
      moveLeft: 0,
      velocity: null,
      isFlipped: false,
      nextOpacity: 0,
      nextScale: 0.8,
      currentRotation: 0
    };

    this.handleOnSwiping = this.handleOnSwiping.bind(this);
    this.handleOnSwiped = this.handleOnSwiped.bind(this);
    this.handleOnSwipedLeft = this.handleOnSwipedLeft.bind(this);
    this.handleOnTap = this.handleOnTap.bind(this);
    this.handleLoadSkipped = this.handleLoadSkipped.bind(this);
    this.reloadAllCards = this.reloadAllCards.bind(this);
  }

  componentDidMount() {
    const routerState = this.props.location.state;
    this.props.fetchSession(routerState.id);

    document.body.style.overflow = 'hidden';
    this.clientWidth = document.body.clientWidth;
    this.clientHeight = document.body.clientHeight;
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
    this.props.clearSession();
  }

  handleOnSwiping(e, deltaX, deltaY) {
    const cardWidth = this.swipable.element.clientWidth;
    const maxMove = cardWidth / 2;
    const animationValue = Math.abs(deltaX) / maxMove;

    const finalValue = animationValue > 1 ? 1 : animationValue;

    // calculate scale
    const scaleValue = 0.2 * animationValue + 0.8;
    const finalScale = scaleValue > 1 ? 1 : scaleValue;

    // calculate rotation
    const rotationValue = animationValue * 3;
    const rotationDirection = deltaX < 0 ? rotationValue : -rotationValue;

    this.setState({
      isDragging: true,
      moveLeft: -deltaX,
      nextOpacity: finalValue,
      nextScale: finalScale,
      currentRotation: rotationDirection
    });
  }

  handleOnSwiped(e, deltaX, deltaY, isFlick, velocity) {
    this.setState({
      isDragging: false,
      moveLeft: 0,
      velocity: velocity,
      nextOpacity: 0,
      nextScale: 0.8,
      currentRotation: 0
    });
  }

  handleOnSwipedLeft(e) {
    const { skippedCards } = this.state;
    const cardId = parseInt(
      this.swipable.element.firstChild.getAttribute('data-swiped')
    );
    const newCard = this.props.cards.filter(card => card.id === cardId);

    if (this.state.velocity > 1.5) {
      this.setState({ skippedCards: skippedCards.concat(newCard) });
      this.animateSwipe(true);
    }
  }

  handleOnTap() {
    this.setState({
      isFlipped: !this.state.isFlipped
    });
  }

  handleLoadSkipped() {
    this.props.loadSkippedCards(this.state.skippedCards);
    // TODO: handle skippedCards in redux?
    this.setState({ skippedCards: [] });
  }

  animateSwipe(isLeft) {
    const docWidth = document.body.clientWidth;

    if (this.state.velocity > 1.5) {
      this.setState({
        isDragging: false,
        nextOpacity: 1,
        nextScale: 1,
        currentRotation: isLeft ? -15 : 15,
        moveLeft: isLeft ? -docWidth : docWidth
      });

      // wait for card to animate out of view before
      // removing and resetting defaults for next card
      setTimeout(() => {
        this.props.removeSessionCard();
        this.setState({
          moveLeft: 0,
          nextOpacity: 0,
          nextScale: 0.8,
          currentRotation: 0,
          isFlipped: false
        });
      }, 500);
    }
  }

  reloadAllCards() {
    this.props.reloadSessionCards();
    this.setState({ skippedCards: [] });
  }

  render() {
    const {
      isFlipped,
      moveLeft,
      isDragging,
      nextOpacity,
      nextScale,
      currentRotation
    } = this.state;

    const { sessionCards } = this.props;

    return (
      <React.Fragment>
        <Header />
        <div className="study-card-container">
          {/* wrapper has width/height explicitly set */}
          <div className="wrapper">
            {sessionCards
              .map((card, index) => {
                if (index === 0) {
                  return (
                    <Swipeable
                      key={card.id}
                      trackMouse
                      onSwiping={this.handleOnSwiping}
                      onSwiped={this.handleOnSwiped}
                      onSwipedLeft={this.handleOnSwipedLeft}
                      onSwipedRight={() => this.animateSwipe(false)}
                      onTap={this.handleOnTap}
                      ref={node => {
                        this.swipable = node;
                      }}
                    >
                      <StudyCard
                        card={card}
                        left={moveLeft}
                        isDragging={isDragging}
                        isFlipped={isFlipped}
                        currentRotation={currentRotation}
                      />
                    </Swipeable>
                  );
                } else if (index === 1) {
                  return (
                    <StudyCard
                      key={card.id}
                      isNextCard
                      card={card}
                      isDragging={isDragging}
                      nextOpacity={nextOpacity}
                      nextScale={nextScale}
                    />
                  );
                }
              })
              .reverse()}
            {!sessionCards.length && (
              <div className="reload-buttons">
                <button onClick={this.handleLoadSkipped}>skipped</button>
                <button onClick={this.reloadAllCards}>all</button>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

// export default StudySession;

const mapStateToProps = state => ({
  cards: state.data.cards,
  sessionCards: state.data.sessionCards
  // setsLoading: state.data.setsLoading
});

export default withRouter(
  connect(mapStateToProps, {
    fetchCollection,
    fetchSession,
    removeSessionCard,
    loadSkippedCards,
    reloadSessionCards,
    clearSession
  })(StudySession)
);
