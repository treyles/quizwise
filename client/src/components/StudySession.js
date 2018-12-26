/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
// import Hammer from 'rc-hammerjs';
// import { CSSTransition } from 'react-transition-group';
import Swipeable from 'react-swipeable';

import Icon from '../utils/Icon';
import StudyCard from '../components/StudyCard';

function Header() {
  return (
    <header className="study-header">
      <div className="back">
        <span className="back-container">
          <Icon icon="backButton" />
          <span>
            <h5>BACK TO SETS</h5>
          </span>
        </span>
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
      cards: [
        { id: 1, name: 'one', back: 'one-back' },
        { id: 2, name: 'two', back: 'two-back' },
        { id: 3, name: 'three', back: 'three-back' }
      ],
      currentCard: 0,
      isDragging: false,
      moveLeft: 0,
      moveTop: 0,
      center: {},
      velocity: null,
      isFlipped: false,
      nextOpacity: 0,
      nextScale: 0.8
    };

    this.handleOnSwiping = this.handleOnSwiping.bind(this);
    this.handleOnSwiped = this.handleOnSwiped.bind(this);
    this.handleOnSwipedLeft = this.handleOnSwipedLeft.bind(this);
    this.handleOnTap = this.handleOnTap.bind(this);
    this.handleRemove = this.handleRemove.bind(this);

    this.reload = this.reload.bind(this);
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden';
    this.clientWidth = document.body.clientWidth;
    this.clientHeight = document.body.clientHeight;
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
  }

  handleRemove() {
    this.setState({
      cards: this.state.cards.slice(1)
    });
  }

  reload() {
    this.setState({
      cards: [
        { id: 1, name: 'one', back: 'one-back' }
        // { id: 2, name: 'two', back: 'two-back' },
        // { id: 3, name: 'three', back: 'three-back' }
      ]
    });
  }

  // handleRemove() {
  //   const { cards } = this.state;

  //   const newCards = [
  //     { id: 2, name: 'two' },
  //     { id: 3, name: 'three' },
  //     { id: 1, name: 'one' }
  //   ];

  //   this.setState({
  //     cards: newCards
  //   });
  // }

  handleOnSwiping(e, deltaX, deltaY) {
    const cardWidth = this.swipable.element.clientWidth;
    const maxMove = cardWidth / 2;
    const animationValue = Math.abs(deltaX) / maxMove;
    const finalValue = animationValue > 1 ? 1 : animationValue;

    const scaleValue = 0.2 * animationValue + 0.8;

    this.setState({
      isDragging: true,
      moveLeft: -deltaX,
      nextOpacity: finalValue,
      nextScale: scaleValue > 1 ? 1 : scaleValue
      // moveTop: -deltaY
    });
  }

  handleOnSwiped(e, deltaX, deltaY, isFlick, velocity) {
    this.setState({
      isDragging: false,
      moveLeft: 0,
      // moveTop: 0,
      velocity: velocity,
      nextOpacity: 0,
      nextScale: 0.8
    });
  }

  handleOnSwipedLeft(e, deltaY) {
    const cardWidth = this.cardWrapper.clientWidth;
    const docWidth = document.body.clientWidth;
    // const moveOutAmount = docWidth - cardWidth;

    if (this.state.velocity > 1.5) {
      this.setState({
        isDragging: false,
        moveLeft: -docWidth
      });

      // wait for card to animate out of view before removing
      // and resetting x position for next card
      setTimeout(() => {
        this.handleRemove();
        this.setState({ moveLeft: 0 });
      }, 500);
    }
  }

  handleOnTap() {
    this.setState({
      isFlipped: !this.state.isFlipped
    });
  }

  render() {
    const {
      isFlipped,
      cards,
      moveLeft,
      moveTop,
      isDragging,
      nextOpacity,
      nextScale
    } = this.state;

    return (
      <React.Fragment>
        <Header />
        <div className="study-card-container">
          {/* wrapper has width/height explicitly set */}
          <button className="remove-me" onClick={this.reload}>
            reload
          </button>
          <div
            className="wrapper"
            ref={card => {
              this.cardWrapper = card;
            }}
          >
            {cards
              .map((card, index) => {
                if (index === 0) {
                  return (
                    <Swipeable
                      key={card.id}
                      trackMouse
                      onSwiping={this.handleOnSwiping}
                      onSwiped={this.handleOnSwiped}
                      onSwipedLeft={this.handleOnSwipedLeft}
                      onTap={this.handleOnTap}
                      ref={swipable => {
                        this.swipable = swipable;
                      }}
                    >
                      <StudyCard
                        card={card}
                        top={moveTop}
                        left={moveLeft}
                        isDragging={isDragging}
                        isFlipped={isFlipped}
                      />
                    </Swipeable>
                  );
                } else {
                  return (
                    <StudyCard
                      key={card.id}
                      card={card}
                      isDragging={isDragging}
                      isNextCard
                      nextOpacity={nextOpacity}
                      nextScale={nextScale}

                      // top={moveTop}
                      // left={moveLeft}
                    />
                  );
                }
              })
              .reverse()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StudySession;

// if (index < currentCard) {
//   return (
//     <StudyCard
//       removed={true}
//       card={card}
//       key={card.id}
//       isDragging={isDragging}
//       // top={moveTop}
//       // left={moveLeft}
//     />
//   );
// } else

// timeout
//classNames
// onExited
