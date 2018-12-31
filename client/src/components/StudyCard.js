/* eslint-disable */
import React, { Component } from 'react';
// import FlipCard from 'react-flipcard';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

class StudyCard extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   isFlipped: false
    // };

    // this.handleFlipClick = this.handleFlipClick.bind(this);
  }

  // handleFlipClick() {
  //   console.log('what');
  //   this.setState({
  //     isFlipped: !this.state.isFlipped
  //   });
  // }

  // componentWillUnmount() {
  //   console.log('removed', this.props.card);
  // }
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
            <div className="front">{card.term}</div>
            <div className="back">{card.definition}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StudyCard;
