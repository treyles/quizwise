/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { connect } from 'react-redux';
import Icon from '../utils/Icon';

// import { deleteCard } from '../actions/';

class CardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      definition: ''
    };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleDefinitionInput = this.handleDefinitionInput.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  componentWillMount() {
    document.body.style.background = '#fff';
  }

  componentWillUnmount() {
    document.body.style.background = '#5a6373';
  }

  handleTermChange(e) {
    this.setState({
      term: e.target.value
    });
  }

  handleDefinitionInput(e) {
    this.setState({
      definition: e.target.innerText
    });
  }

  handlePost() {
    const { term, definition } = this.state;

    axios
      .post('/api/cards', { term, definition })
      .then(res => {
        console.log(res);
        this.props.history.push('/');
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="card-form">
        <header className="form-header">
          <Link to="/">
            <button className="back-button">
              <Icon icon="arrow" />
            </button>
          </Link>
          <button className="save-button" onClick={this.handlePost}>
            SAVE FLASHCARD
          </button>
        </header>
        <section className="form-section">
          <input
            type="text"
            onChange={this.handleTermChange}
            placeholder="Type your term"
          />
          <div
            contentEditable={true}
            placeholder="Type or paste your defintion here"
            onInput={this.handleDefinitionInput}
          />
        </section>
      </div>
    );
  }
}

// CardForm.propTypes = {
//   // PropTypes
// };

export default CardForm;
