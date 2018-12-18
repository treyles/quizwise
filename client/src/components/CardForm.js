/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { connect } from 'react-redux';
// import Icon from '../utils/Icon';

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
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleEscape = this.handleEscape.bind(this);
  }

  componentWillMount() {
    document.body.style.background = '#fff';
    document.addEventListener('keydown', this.handleEscape);
  }

  componentDidMount() {
    const routerState = this.props.location.state;

    // fills in text fields if state is passed through router
    if (routerState) {
      const { term, definition } = routerState.data;
      this.setState({ term, definition });

      // manually set contenteditable div with definition
      this.node.innerText = definition;
    }
  }

  componentWillUnmount() {
    document.body.style.background = '#5a6373';
    document.removeEventListener('keydown', this.handleEscape);
  }

  handleEscape(e) {
    if (e.key === 'Escape') {
      this.props.history.push('/');
    }
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

  handleSaveClick() {
    const { term, definition } = this.state;
    const routerState = this.props.location.state;

    if (routerState) {
      const { id } = routerState.data;

      axios
        .put(`/api/cards/${id}`, { term, definition })
        .then(res => {
          this.props.history.push('/');
        })
        .catch(err => console.error(err));
    } else {
      axios
        .post('/api/cards', { term, definition })
        .then(res => {
          this.props.history.push('/');
        })
        .catch(err => console.error(err));
    }
  }

  render() {
    return (
      <div className="card-form">
        <header className="form-header">
          <Link to="/">
            <button className="cancel-button">
              <h5>CANCEL</h5>
            </button>
          </Link>
          <button className="save-button" onClick={this.handleSaveClick}>
            SAVE TERM
          </button>
        </header>
        <section className="form-section">
          <input
            value={this.state.term}
            type="text"
            onChange={this.handleTermChange}
            placeholder="Type your term"
          />
          <div
            contentEditable
            ref={node => (this.node = node)}
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
