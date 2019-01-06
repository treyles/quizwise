/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
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
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
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
      this.defInput.innerText = definition;
    }
  }

  componentWillUnmount() {
    document.body.style.background = '#5a6373';
    document.removeEventListener('keydown', this.handleEscape);
  }

  // TODO: rename to goBack? — save uses this function, not just cancel
  handleCancelClick() {
    this.props.history.goBack();
  }

  handleEscape(e) {
    if (e.key === 'Escape') {
      this.handleCancelClick();
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

  handleFocus() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  handleSaveClick() {
    const { currentSet } = this.props;
    const { term, definition } = this.state;
    const routerState = this.props.location.state;

    if (routerState) {
      const { id } = routerState.data;

      axios
        .put(`/api/cards/${id}`, { term, definition })
        .then(res => {
          this.handleCancelClick();
        })
        .catch(err => console.error(err));
    } else {
      axios
        .post('/api/cards', { term, definition, currentSet })
        .then(res => {
          // update number of terms for set card ui
          return axios.put(`/api/sets/${currentSet}`);
        })
        .then(() => this.handleCancelClick())
        .catch(err => console.error(err));
    }
  }

  render() {
    return (
      <div className="card-form">
        <header className="form-header">
          {/* <Link to="/collection"> */}
          <button
            className="cancel-button"
            onClick={this.handleCancelClick}
          >
            CANCEL
          </button>
          {/* </Link> */}
          <button className="save-button" onClick={this.handleSaveClick}>
            SAVE TERM
          </button>
        </header>
        <section className="form-section">
          <input
            onFocus={this.handleFocus}
            value={this.state.term}
            type="text"
            onChange={this.handleTermChange}
            placeholder="Type your term"
            maxLength={140}
          />
          <div
            contentEditable
            onFocus={this.handleFocus}
            placeholder="Type or paste your defintion here"
            onInput={this.handleDefinitionInput}
            ref={node => (this.defInput = node)}
          />
        </section>
      </div>
    );
  }
}

// CardForm.propTypes = {
//   // PropTypes
// };

const mapStateToProps = state => ({
  currentSet: state.data.currentSet
});

export default withRouter(connect(mapStateToProps, null)(CardForm));
