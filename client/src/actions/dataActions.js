import axios from 'axios';
import shuffle from 'lodash/shuffle';
import orderBy from 'lodash/orderBy';

import {
  FETCH_SETS,
  FETCH_COLLECTION,
  CLEAR_COLLECTION,
  FETCH_SESSION,
  REMOVE_SESSION_CARD,
  LOAD_SKIPPED_CARDS,
  RELOAD_SESSION_CARDS,
  SHUFFLE_SESSION_CARDS,
  ORDER_SESSION_CARDS,
  CLEAR_SESSION,
  DELETE_CARD,
  DELETE_SET
} from './types';

export const fetchSets = () => dispatch => {
  // setTimeout(() => {
  axios
    .get('/api/sets')
    .then(res => {
      dispatch({
        type: FETCH_SETS,
        sets: res.data
      });
    })
    .catch(err => console.error(err));
  // }, 1000);
};

export const fetchCollection = id => dispatch => {
  setTimeout(() => {
    axios
      .get(`/api/collection/${id}`)
      .then(res => {
        dispatch({
          type: FETCH_COLLECTION,
          cards: res.data,
          currentSet: id
        });
      })
      .catch(err => console.error(err));
  }, 700);
};

export const clearCollection = () => dispatch => {
  dispatch({
    type: CLEAR_COLLECTION
  });
};

export const fetchSession = id => dispatch => {
  axios
    .get(`/api/collection/${id}`)
    .then(res => {
      dispatch({
        type: FETCH_SESSION,
        cards: res.data,
        sessionCards: res.data,
        currentSet: id
      });
    })
    .catch(err => console.error(err));
};

export const removeSessionCard = () => (dispatch, getState) => {
  const { sessionCards } = getState().data;

  dispatch({
    type: REMOVE_SESSION_CARD,
    sessionCards: sessionCards.slice(1)
  });
};

export const loadSkippedCards = cards => dispatch => {
  dispatch({
    type: LOAD_SKIPPED_CARDS,
    sessionCards: orderBy(cards, 'id', 'desc')
  });
};

export const reloadSessionCards = () => (dispatch, getState) => {
  dispatch({
    type: RELOAD_SESSION_CARDS,
    sessionCards: getState().data.cards
  });
};

export const shuffleSessionCards = () => (dispatch, getState) => {
  const { sessionCards } = getState().data;

  dispatch({
    type: SHUFFLE_SESSION_CARDS,
    sessionCards: shuffle(sessionCards)
  });
};

export const orderSessionCards = () => (dispatch, getState) => {
  const { sessionCards } = getState().data;

  dispatch({
    type: ORDER_SESSION_CARDS,
    sessionCards: orderBy(sessionCards, 'id', 'desc')
  });
};

export const clearSession = () => dispatch => {
  dispatch({
    type: CLEAR_SESSION
  });
};

export const deleteCard = id => (dispatch, getState) => {
  const { cards, currentSet } = getState().data;

  axios
    .delete(`/api/cards/${id}`)
    // first update number of terms for set card ui
    .then(() => axios.put(`/api/sets/${currentSet}`))
    .then(() => {
      dispatch({
        type: DELETE_CARD,
        cards: cards.filter(card => card.id !== id)
      });
    })
    .catch(err => console.error(err));
};

export const deleteSet = id => (dispatch, getState) => {
  const { sets } = getState().data;

  axios
    .delete(`/api/sets/${id}`)
    .then(() => {
      dispatch({
        type: DELETE_SET,
        sets: sets.filter(set => set.id !== id)
      });
    })
    // batch delete cards associated with set
    .then(() => axios.delete(`/api/cards/batch/${id}`))
    .catch(err => console.error(err));
};
