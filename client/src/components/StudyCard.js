import React, { Component } from 'react';

class StudyCard extends Component {
  render() {
    return (
      <div>
        <div
          className="study-card"
          style={{ left: this.props.left, top: this.props.top }}
        >
          {this.props.name}
        </div>
      </div>
    );
  }
}

export default StudyCard;
