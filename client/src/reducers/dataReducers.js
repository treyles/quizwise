import {
  FETCH_SETS,
  FETCH_COLLECTION,
  CLEAR_COLLECTION,
  DELETE_CARD,
  DELETE_SET
} from '../actions/types';

const initialState = {
  sets: [],
  cards: []
};

export default function data(state = initialState, action) {
  switch (action.type) {
    case FETCH_SETS:
      return {
        ...state,
        sets: action.sets
      };
    case FETCH_COLLECTION:
      return {
        ...state,
        cards: action.cards,
        currentSet: action.currentSet
      };
    case CLEAR_COLLECTION:
      return {
        ...state,
        cards: [],
        currentSet: null
      };
    case DELETE_CARD:
      return {
        ...state,
        cards: action.cards
      };
    case DELETE_SET:
      return {
        ...state,
        sets: action.sets
      };
    default:
      return state;
  }
}
