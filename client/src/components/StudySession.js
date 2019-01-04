/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Swipeable from 'react-swipeable';
import StudyCard from '../components/StudyCard';
import StudyHeader from '../components/StudyHeader';
import Icon from '../utils/Icon';

import {
  fetchCollection,
  fetchSession,
  removeSessionCard,
  loadSkippedCards,
  reloadSessionCards,
  shuffleSessionCards,
  orderSessionCards,
  clearSession
} from '../actions';

class StudySession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skippedCards: [],
      isShuffled: false,
      isDragging: false,
      moveLeft: 0,
      velocity: null,
      isFlipped: false,
      nextOpacity: 0,
      nextScale: 0.8,
      currentRotation: 0,
      isAnimating: false
    };

    this.handleOnSwiping = this.handleOnSwiping.bind(this);
    this.handleOnSwiped = this.handleOnSwiped.bind(this);
    this.handleOnSwipedLeft = this.handleOnSwipedLeft.bind(this);
    this.handleOnSwipedRight = this.handleOnSwipedRight.bind(this);
    this.handleOnTap = this.handleOnTap.bind(this);
    this.handleLoadSkippedClick = this.handleLoadSkippedClick.bind(this);
    this.handleReloadAllClick = this.handleReloadAllClick.bind(this);
    this.handleShuffleClick = this.handleShuffleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    const routerState = this.props.location.state;
    this.props.fetchSession(routerState.id);

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this.handleKeyPress);
    this.clientWidth = document.body.clientWidth;
    this.clientHeight = document.body.clientHeight;
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', this.handleKeyPress);
    this.props.clearSession();
  }

  handleKeyPress(e) {
    if (this.state.isAnimating) return;

    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowDown':
        this.setState({ isFlipped: !this.state.isFlipped });
        break;
      case 'ArrowLeft':
        this.handleOnSwipedLeft(false);
        break;
      case 'ArrowRight':
        this.handleOnSwipedRight(false);
        break;
    }
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

  handleOnSwipedLeft(isSwiped) {
    const { skippedCards, velocity, isAnimating } = this.state;
    const cardId = parseInt(
      this.swipable.element.firstChild.getAttribute('data-swiped')
    );
    const newCard = this.props.cards.filter(card => card.id === cardId);

    if ((velocity > 1.5 || !isSwiped) && !isAnimating) {
      this.setState({ skippedCards: skippedCards.concat(newCard) });
      this.animateSwipe(true);
    }
  }

  handleOnSwipedRight(isSwiped) {
    const { velocity, isAnimating } = this.state;

    if ((velocity > 1.5 || !isSwiped) && !isAnimating) {
      this.animateSwipe(false);
    }
  }

  handleShuffleClick() {
    const { isShuffled } = this.state;

    if (isShuffled) {
      this.props.orderSessionCards();
    } else {
      this.props.shuffleSessionCards();
    }

    this.setState({ isShuffled: !isShuffled });
  }

  handleLoadSkippedClick() {
    this.props.loadSkippedCards(this.state.skippedCards);

    this.setState({
      skippedCards: [],
      isShuffled: false
    });
  }

  handleReloadAllClick() {
    this.props.reloadSessionCards();

    this.setState({
      skippedCards: [],
      isShuffled: false
    });
  }

  handleOnTap() {
    this.setState({ isFlipped: !this.state.isFlipped });
  }

  animateSwipe(isLeft) {
    const docWidth = document.body.clientWidth;

    this.setState({
      isDragging: false,
      nextOpacity: 1,
      nextScale: 1,
      currentRotation: isLeft ? -15 : 15,
      moveLeft: isLeft ? -docWidth : docWidth,
      isAnimating: true
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
        isFlipped: false,
        isAnimating: false
      });
    }, 400);
  }

  render() {
    const {
      skippedCards,
      isFlipped,
      isShuffled,
      moveLeft,
      isDragging,
      nextOpacity,
      nextScale,
      currentRotation
    } = this.state;
    const { sessionCards, sessionLoading } = this.props;

    // const swipeButtonStyle = {
    //   pointerEvents: `${!sessionCards.length ? 'none' : 'auto'}`,
    //   opacity: `${!sessionCards.length ? '.5' : '1'}`
    // };

    // TODO: one var name disableStyle, if using two places
    const disableButtonStyle = {
      pointerEvents: `${!skippedCards.length ? 'none' : 'auto'}`,
      opacity: `${!skippedCards.length ? '.3' : '1'}`
    };

    const hasSkipped = skippedCards.length > 0;

    const reloadButtons = (
      <div className="reload-buttons">
        <h2>You have studied all cards!</h2>
        <h4>CHOOSE A STACK OF CARDS TO LOAD</h4>
        <div className="button-wrapper">
          <button
            className="reload-skipped-button"
            onClick={this.handleLoadSkippedClick}
            style={disableButtonStyle}
          >
            SKIPPED CARDS
          </button>

          <button
            className="reload-all-button"
            onClick={this.handleReloadAllClick}
          >
            ALL CARDS
          </button>
        </div>
      </div>
    );

    const leftSwipeButton = (
      <div className="left-swipe">
        <button
          onClick={() => this.handleOnSwipedLeft(false)}
          // style={swipeButtonStyle}
        >
          <Icon icon="swipeButton" />
        </button>
      </div>
    );

    const rightSwipeButton = (
      <div className="right-swipe">
        <button
          onClick={() => this.handleOnSwipedRight(false)}
          // style={swipeButtonStyle}
        >
          <Icon icon="swipeButton" />
        </button>
      </div>
    );

    return (
      <React.Fragment>
        <StudyHeader
          handleShuffleClick={this.handleShuffleClick}
          isShuffled={isShuffled}
          setId={this.props.match.params.id}
        />
        <div className="study-content-container">
          {sessionCards.length > 0 && leftSwipeButton}
          <div className="study-card-wrapper">
            {sessionCards
              .map((card, index) => {
                if (index === 0) {
                  return (
                    <Swipeable
                      key={card.id}
                      trackMouse
                      onSwiping={this.handleOnSwiping}
                      onSwiped={this.handleOnSwiped}
                      onSwipedLeft={() => this.handleOnSwipedLeft(true)}
                      onSwipedRight={() => this.handleOnSwipedRight(true)}
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
            {!sessionCards.length && !sessionLoading && reloadButtons}
          </div>
          {sessionCards.length > 0 && rightSwipeButton}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cards: state.data.cards,
  sessionCards: state.data.sessionCards,
  sessionLoading: state.data.sessionLoading
  // setsLoading: state.data.setsLoading
});

export default withRouter(
  connect(mapStateToProps, {
    fetchCollection,
    fetchSession,
    removeSessionCard,
    loadSkippedCards,
    reloadSessionCards,
    shuffleSessionCards,
    orderSessionCards,
    clearSession
  })(StudySession)
);
