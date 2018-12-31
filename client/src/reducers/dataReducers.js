import {
  FETCH_SETS,
  FETCH_COLLECTION,
  CLEAR_COLLECTION,
  FETCH_SESSION,
  REMOVE_SESSION_CARD,
  LOAD_SKIPPED_CARDS,
  RELOAD_SESSION_CARDS,
  CLEAR_SESSION,
  DELETE_CARD,
  DELETE_SET
} from '../actions/types';

const initialState = {
  sets: [],
  cards: [],
  sessionCards: [],
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
    case FETCH_SESSION:
      return {
        ...state,
        sessionCards: action.sessionCards,
        cards: action.cards
        // currentSet: null,
        // cardsLoading: true
      };
    case REMOVE_SESSION_CARD:
      return {
        ...state,
        sessionCards: action.sessionCards
        // cards: action.cards
        // currentSet: null,
        // cardsLoading: true
      };

    case LOAD_SKIPPED_CARDS:
      return {
        ...state,
        sessionCards: action.sessionCards
        // cards: action.cards
        // currentSet: null,
        // cardsLoading: true
      };

    case RELOAD_SESSION_CARDS:
      return {
        ...state,
        sessionCards: action.sessionCards
      };

    case CLEAR_SESSION:
      return {
        ...state,
        cards: [],
        sessionCards: []
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
