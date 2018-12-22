/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Hammer from 'rc-hammerjs';
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
        { id: 1, name: 'one' },
        { id: 2, name: 'two' },
        { id: 3, name: 'three' }
      ],
      currentCard: 0,
      isDragging: false,
      // lastPosX: 0,
      // lastPosY: 0,
      moveLeft: 0,
      moveTop: 0
    };

    this.handlePan = this.handlePan.bind(this);
    this.handlePanEnd = this.handlePanEnd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);

    this.reload = this.reload.bind(this);
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden';
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
        { id: 1, name: 'one' },
        { id: 2, name: 'two' },
        { id: 3, name: 'three' }
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

  handlePan(e) {
    this.setState({
      isDragging: true,
      moveLeft: e.deltaX + 'px',
      moveTop: e.deltaY + 'px'
    });
  }

  handlePanEnd(e) {
    if (Math.abs(e.velocity) > 3) {
      this.handleRemove();
    }

    this.setState({
      isDragging: false,
      moveLeft: 0,
      moveTop: 0
    });
  }

  render() {
    const {
      currentCard,
      cards,
      moveLeft,
      moveTop,
      isDragging
    } = this.state;

    return (
      <React.Fragment>
        <Header />
        <div className="study-card-container">
          {/* wrapper has width/height explicitly set */}
          <button className="remove-me" onClick={this.reload}>
            reload
          </button>
          <div className="wrapper">
            {cards
              .map((card, index) => {
                if (index === 0) {
                  return (
                    <Hammer
                      key={card.id}
                      onPan={this.handlePan}
                      onPanEnd={this.handlePanEnd}
                    >
                      <StudyCard
                        name={card.name}
                        top={moveTop}
                        left={moveLeft}
                        isDragging={isDragging}
                      />
                    </Hammer>
                  );
                } else {
                  return (
                    <StudyCard
                      key={card.id}
                      name={card.name}
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
