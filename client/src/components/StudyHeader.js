/* eslint-disable */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Icon from '../utils/Icon';

// import { shuffleSessionCards, orderSessionCards } from '../actions';

class StudyHeader extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isShuffled: false
  //   };

  //   // this.handleShuffleClick = this.handleShuffleClick.bind(this);
  // }

  // handleShuffleClick() {
  //   const { isShuffled } = this.state;

  //   if (isShuffled) {
  //     this.props.orderSessionCards();
  //   } else {
  //     this.props.shuffleSessionCards();
  //   }

  //   this.setState({
  //     isShuffled: !isShuffled
  //   });
  // }
  componentDidMount() {
    const { setId, sets } = this.props;

    // This doesn't work because sets (via redux) is empty on refresh
    setTimeout(function() {
      const title = sets.filter(set => set.id === setId);
      console.log(title);
    }, 3000);
  }

  render() {
    const {
      handleShuffleClick,
      isShuffled,
      currentSet,
      sets
    } = this.props;

    return (
      <header className="study-header">
        <div className="back">
          <Link to="/">
            <span className="back-container">
              <Icon icon="backButton" />
              <span>
                <h5>BACK TO SETS</h5>
              </span>
            </span>
          </Link>
        </div>
        <div className="title">
          {/* <h4>{title}</h4> */}
          {/* <h4>{title}</h4> */}
        </div>
        <div className="shuffle">
          <button onClick={() => handleShuffleClick()}>
            <h5>{isShuffled ? 'ORDER' : 'SHUFFLE'}</h5>
          </button>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  sets: state.data.sets,
  currentSet: state.data.currentSet
  // setsLoading: state.data.setsLoading
});

export default connect(mapStateToProps, {})(StudyHeader);
