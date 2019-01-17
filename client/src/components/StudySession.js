import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Swipeable from 'react-swipeable';
import StudyCard from '../components/StudyCard';
import StudyHeader from '../components/StudyHeader';
import Icon from '../utils/Icon';
import { isSafariIOS } from '../utils/helpers';

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

    // disables bounce effect on ios (makes swiping cards easier)
    document.body.addEventListener('touchmove', this.handleDisableScroll, {
      passive: false
    });

    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.body.removeEventListener(
      'touchmove',
      this.handleDisableScroll,
      { passive: false }
    );

    document.removeEventListener('keydown', this.handleKeyPress);

    this.props.clearSession();
  }

  handleDisableScroll(e) {
    e.preventDefault();
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

  handleOnSwiping(e, deltaX, deltaY, absX, absY, velocity) {
    const cardWidth = this.swipable.element.clientWidth;
    const maxMove = cardWidth / 2;
    const animationValue = Math.abs(deltaX) / maxMove;

    // calculate opacity
    const opacityValue = animationValue > 1 ? 1 : animationValue;

    // calculate scale
    const scale = 0.2 * animationValue + 0.8;
    const scaleValue = scale > 1 ? 1 : scale;

    // calculate rotation
    const rotation = animationValue * 3;
    const rotationDirection = deltaX < 0 ? rotation : -rotation;

    this.setState({
      isDragging: true,
      moveLeft: -deltaX,
      nextOpacity: opacityValue,
      nextScale: scaleValue,
      currentRotation: rotationDirection,
      velocity
    });
  }

  handleOnSwiped() {
    this.setState({
      isDragging: false,
      moveLeft: 0,
      nextOpacity: 0,
      nextScale: 0.8,
      currentRotation: 0
    });
  }

  handleOnSwipedLeft(isSwiped) {
    const { skippedCards, velocity, isAnimating } = this.state;
    const cardId = parseInt(
      this.swipable.element.firstChild.getAttribute('data-swiped'),
      10
    );
    const newCard = this.props.cards.filter(card => card.id === cardId);

    if ((velocity > 1 || !isSwiped) && !isAnimating) {
      this.setState({ skippedCards: skippedCards.concat(newCard) });
      this.animateSwipe(true);
    }
  }

  handleOnSwipedRight(isSwiped) {
    const { velocity, isAnimating } = this.state;

    if ((velocity > 1 || !isSwiped) && !isAnimating) {
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

  handleOnTap(e) {
    // stops default double click on mobile
    e.stopImmediatePropagation();
    this.setState({ isFlipped: !this.state.isFlipped });
  }

  animateSwipe(isLeft) {
    const { clientWidth } = document.body;
    const docWidth = clientWidth < 768 ? clientWidth * 2 : clientWidth;

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

    const containerSyle = {
      height: isSafariIOS() ? '90vh' : '100vh'
    };

    const disableButtonStyle = {
      pointerEvents: `${!skippedCards.length ? 'none' : 'auto'}`,
      opacity: `${!skippedCards.length ? '.3' : '1'}`
    };

    const reloadButtons = (
      <div className="reload-buttons">
        <h2>You have studied all cards in this set!</h2>
        <h4>CHOOSE A STACK OF CARDS TO LOAD</h4>
        <div className="button-wrapper">
          <button
            className="reload-skipped-button"
            onClick={this.handleLoadSkippedClick}
            style={disableButtonStyle}
          >
            {skippedCards.length ? `SKIPPED CARDS` : 'NONE SKIPPED'}
          </button>
          <button
            className="reload-all-button"
            onClick={this.handleReloadAllClick}
          >
            RESTART
          </button>
        </div>
      </div>
    );

    const leftSwipeButton = (
      <div className="left-swipe">
        <button onClick={() => this.handleOnSwipedLeft(false)}>
          <Icon icon="swipeButton" />
        </button>
      </div>
    );

    const rightSwipeButton = (
      <div className="right-swipe">
        <button onClick={() => this.handleOnSwipedRight(false)}>
          <Icon icon="swipeButton" />
        </button>
      </div>
    );

    const placeholder = <div className="placeholder" />;

    return (
      <div className="study" style={containerSyle}>
        <StudyHeader
          handleShuffleClick={this.handleShuffleClick}
          isShuffled={isShuffled}
          // id from url via react router
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
                // only render first/second card in array
                return null;
              })
              .reverse()}
            {sessionLoading && placeholder}
            {!sessionCards.length && !sessionLoading && reloadButtons}
          </div>
          {sessionCards.length > 0 && rightSwipeButton}
        </div>
      </div>
    );
  }
}

StudySession.propTypes = {
  location: PropTypes.object.isRequired, // eslint-disable-line
  match: PropTypes.object.isRequired, // eslint-disable-line
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  sessionCards: PropTypes.arrayOf(PropTypes.object).isRequired,
  sessionLoading: PropTypes.bool.isRequired,
  fetchSession: PropTypes.func.isRequired,
  clearSession: PropTypes.func.isRequired,
  orderSessionCards: PropTypes.func.isRequired,
  shuffleSessionCards: PropTypes.func.isRequired,
  loadSkippedCards: PropTypes.func.isRequired,
  reloadSessionCards: PropTypes.func.isRequired,
  removeSessionCard: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cards: state.data.cards,
  sessionCards: state.data.sessionCards,
  sessionLoading: state.data.sessionLoading
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
