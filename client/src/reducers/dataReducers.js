import {
  FETCH_SETS,
  FETCH_COLLECTION,
  CLEAR_COLLECTION,
  DELETE_CARD,
  DELETE_SET
} from '../actions/types';

const initialState = {
  sets: [],
  cards: [],
  setsLoading: true,
  cardsLoading: true
};

export default function data(state = initialState, action) {
  switch (action.type) {
    case FETCH_SETS:
      return {
        ...state,
        sets: action.sets,
        setsLoading: false
      };
    case FETCH_COLLECTION:
      return {
        ...state,
        cards: action.cards,
        currentSet: action.currentSet,
        cardsLoading: false
      };
    case CLEAR_COLLECTION:
      return {
        ...state,
        cards: [],
        currentSet: null,
        cardsLoading: true
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
