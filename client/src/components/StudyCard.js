/* eslint-disable */
import React, { Component } from 'react';
// import FlipCard from 'react-flipcard';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { Textfit } from 'react-textfit';
import ScaleText from 'react-scale-text';

class StudyCard extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   isFlipped: false
    // };

    // this.handleFlipClick = this.handleFlipClick.bind(this);
  }

  resizeText(text) {
    const length = text.length;

    let size;
    if (length < 400) size = 19;
    if (length > 400 && length < 600) size = 16;
    if (length > 600 && length < 800) size = 14;
    if (length > 800) size = 12;

    return <p style={{ fontSize: `${size}px` }}>{text}</p>;
  }

  render() {
    const {
      removed,
      card,
      left,
      isDragging,
      isFlipped,
      isNextCard,
      nextOpacity,
      nextScale,
      currentRotation
    } = this.props;

    const currentCardStyle = {
      left: `${left}px`,
      transform: `rotate(${currentRotation}deg)`,
      transition: `${isDragging ? 'none' : '.4s ease'}`
    };

    const nextCardStyle = {
      transform: `scale(${nextScale})`,
      opacity: `${nextOpacity}`,
      transition: `${isDragging ? 'none' : '.4s ease'}`
    };

    return (
      <React.Fragment>
        <div
          className="study-card"
          data-swiped={card.id}
          style={isNextCard ? nextCardStyle : currentCardStyle}
        >
          <div className={`content ${isFlipped ? 'flipped' : ''}`}>
            <div className="front">
              <h2>{card.term}</h2>
            </div>
            <div className="back">{this.resizeText(card.definition)}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StudyCard;
