import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Icon from '../utils/Icon';

import { fetchSets } from '../actions/';

class CreateSetModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEscape = this.handleEscape.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
    document.addEventListener('keydown', this.handleEscape);
    this.input.focus();
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleEscape);
  }

  handleClickOutside(e) {
    if (e.target.className === 'set-modal-container') {
      this.props.closeModal();
    }
  }

  handleEscape(e) {
    if (e.key === 'Escape') {
      this.props.closeModal();
    }
  }

  handleDeleteClick() {
    this.props.closeModal();
  }

  handleChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleClickSave() {
    const { closeModal, fetchSets } = this.props;
    const { name } = this.state;

    // check if at least one character that is not whitespace
    if (/\S/.test(name)) {
      axios
        .post('/api/sets', { name })
        .then(() => {
          fetchSets();
          closeModal();
        })
        .catch(err => console.error(err));
    }
  }

  render() {
    const { name } = this.state;

    return (
      <div className="set-modal-container">
        <div className="modal">
          <button
            className="delete-button"
            onClick={this.handleDeleteClick}
          >
            <Icon icon="delete" />
          </button>
          <input
            type="text"
            placeholder="Type the name of your set"
            value={name}
            maxLength="100"
            onChange={this.handleChange}
            ref={input => {
              this.input = input;
            }}
          />
          <button
            className="save-set-button"
            onClick={this.handleClickSave}
          >
            SAVE CARD SET
          </button>
        </div>
      </div>
    );
  }
}

CreateSetModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  fetchSets: PropTypes.func.isRequired
};

export default connect(null, { fetchSets })(CreateSetModal);
