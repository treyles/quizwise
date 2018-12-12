import { FETCH_CARDS, DELETE_CARD } from '../actions/types';

const initialState = {
  cards: []
};

export default function data(state = initialState, action) {
  switch (action.type) {
    case FETCH_CARDS:
      return {
        ...state,
        cards: action.cards
      };
    case DELETE_CARD:
      return {
        ...state,
        cards: action.cards
      };
    default:
      return state;
  }
}
