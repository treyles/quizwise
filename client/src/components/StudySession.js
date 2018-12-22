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
        { id: 3, name: 'three' },
        { id: 2, name: 'two' },
        { id: 1, name: 'one' }
      ],
      currentCard: 0,
      isDragging: false,
      lastPosX: 0,
      lastPosY: 0,
      moveLeft: 0,
      moveTop: 0
    };

    this.handlePan = this.handlePan.bind(this);
  }

  handlePan(e) {
    // console.log(e.target.classList.contains(1));
    const elem = e.target;

    if (!this.state.isDragging) {
      this.setState({
        isDragging: true,
        lastPosX: elem.offsetLeft,
        lastPosY: elem.offsetTop
      });
    }

    const posX = e.deltaX + this.state.lastPosX;
    const posY = e.deltaY + this.state.lastPosY;

    this.setState({
      moveLeft: posX + 'px',
      moveTop: posY + 'px'
    });
    // elem.style.left = posX + 'px';
    // elem.style.top = posY + 'px';

    // console.log(e.deltaX);
    // console.log(e.deltaX);
    // console.log(e.target);
  }

  render() {
    const { currentCard, cards, moveLeft, moveTop } = this.state;

    return (
      <React.Fragment>
        <Header />
        <div className="study-card-container">
          {/* wrapper has width/height explicitly set */}
          <div className="wrapper">
            {cards.map((card, index) => {
              if (index === 2) {
                return (
                  <Hammer key={card.id} onPan={this.handlePan}>
                    <StudyCard
                      name={card.name}
                      top={moveTop}
                      left={moveLeft}
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
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StudySession;
