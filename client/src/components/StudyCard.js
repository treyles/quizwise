import React, { Component } from 'react';

class StudyCard extends Component {
  render() {
    const { left, top, isDragging } = this.props;
    return (
      <div>
        <div
          className="study-card"
          style={{
            left: left,
            top: top,
            transition: `${isDragging ? 'none' : '.3s ease'}`
          }}
        >
          {this.props.name}
        </div>
      </div>
    );
  }
}

export default StudyCard;
