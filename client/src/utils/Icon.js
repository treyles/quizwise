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
      ),

      arrow: () => (
        <svg
          width="87px"
          height="19px"
          viewBox="0 0 87 19"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="Artboard"
            transform="translate(-35.000000, -37.000000)"
            fill="#8F9EB3"
          >
            <text
              fontFamily="sailecbold"
              fontSize="12"
              fontWeight="normal"
              letterSpacing="1.60285711"
            >
              <tspan x="78.5102858" y="52">
                BACK
              </tspan>
            </text>
            <g
              id="left-arrow"
              opacity="0.78685462"
              transform="translate(35.000000, 37.000000)"
              fillRule="nonzero"
            >
              <path
                d="M9.13374451,0.285759451 C9.52847697,-0.0952531503 10.1499139,-0.0952531503 10.5446463,0.285759451 C10.9260432,0.653900005 10.9260432,1.26660946 10.5446463,1.63389187 L3.39056509,8.5393162 L26.9980552,8.5393162 C27.5483692,8.5393162 28,8.96151935 28,9.49270584 C28,10.0238923 27.5483692,10.4598257 26.9980552,10.4598257 L3.39056509,10.4598257 L10.5446463,17.3523779 C10.9260432,17.7333905 10.9260432,18.3469581 10.5446463,18.7142405 C10.1499139,19.0952532 9.52847697,19.0952532 9.13374451,18.7142405 L0.286047675,10.1740662 C-0.0953492249,9.80592566 -0.0953492249,9.19321621 0.286047675,8.82593379 L9.13374451,0.285759451 Z"
                id="Shape"
              />
            </g>
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
