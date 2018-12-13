import React from 'react';
import PropTypes from 'prop-types';

export default class Icon extends React.Component {
  render() {
    const svg = {
      delete: () => (
        <svg
          width="31px"
          height="31px"
          viewBox="0 0 31 31"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <circle
              id="Oval-3"
              stroke="#CFD2D5"
              cx="15.5"
              cy="15.5"
              r="14.5"
            />
            <path
              d="M9.5,9.5 L21.5,21.5"
              id="Line-4"
              stroke="#CFD2D5"
              strokeLinecap="square"
            />
            <path
              d="M21.5,9.5 L9.5,21.5"
              id="Line-3"
              stroke="#CFD2D5"
              strokeLinecap="square"
            />
          </g>
        </svg>
      )
    };

    return svg[this.props.icon]();
  }
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired
};
