import React from 'react';
import PropTypes from 'prop-types';
import { resizeText } from '../utils/helpers';

const StudyCard = ({
  card,
  left,
  isDragging,
  isFlipped,
  isNextCard,
  nextOpacity,
  nextScale,
  currentRotation
}) => {
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
          <div className="back">{resizeText(card.definition)}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

StudyCard.defaultProps = {
  isNextCard: false,
  isFlipped: false,
  nextOpacity: 0,
  nextScale: 0,
  left: 0,
  currentRotation: 0
};

StudyCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number,
    term: PropTypes.string,
    definition: PropTypes.string
  }).isRequired,
  isDragging: PropTypes.bool.isRequired,
  currentRotation: PropTypes.number,
  isFlipped: PropTypes.bool,
  left: PropTypes.number,
  nextScale: PropTypes.number,
  isNextCard: PropTypes.bool,
  nextOpacity: PropTypes.number
};

export default StudyCard;
