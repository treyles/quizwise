import axios from 'axios';
import { FETCH_SETS, FETCH_CARDS, DELETE_CARD, DELETE_SET } from './types';

export const fetchSets = () => dispatch => {
  axios
    .get('/api/sets')
    .then(res => {
      dispatch({
        type: FETCH_SETS,
        sets: res.data
      });
    })
    .catch(err => console.error(err));
};

export const fetchCards = () => dispatch => {
  axios
    .get('/api/cards')
    .then(res => {
      dispatch({
        type: FETCH_CARDS,
        cards: res.data
      });
    })
    .catch(err => console.error(err));
};

export const deleteCard = id => (dispatch, getState) => {
  const { cards } = getState().data;

  axios
    .delete(`/api/cards/${id}`)
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
      // NEED TO DELETE CARD TOO
      dispatch({
        type: DELETE_SET,
        sets: sets.filter(set => set.id !== id)
      });
    })
    .catch(err => console.error(err));
};
