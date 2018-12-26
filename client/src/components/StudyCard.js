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
      top,
      isDragging,
      isFlipped,
      isNextCard,
      nextOpacity,
      nextScale
    } = this.props;

    const currentCardStyle = {
      left: `${left}px`,
      top: `${top}px`,
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
          dataattribute={card.id}
          style={isNextCard ? nextCardStyle : currentCardStyle}
        >
          <div className={`content ${isFlipped ? 'flipped' : ''}`}>
            <div className="front">{card.name}</div>
            <div className="back">{card.back}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StudyCard;
