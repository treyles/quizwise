import axios from 'axios';
import {
  FETCH_SETS,
  FETCH_COLLECTION,
  CLEAR_COLLECTION,
  DELETE_CARD,
  DELETE_SET
} from './types';

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

export const fetchCollection = id => dispatch => {
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
};

export const clearCollection = () => dispatch => {
  dispatch({
    type: CLEAR_COLLECTION
  });
};

export const deleteCard = id => (dispatch, getState) => {
  const { cards, currentSet } = getState().data;

  axios
    .delete(`/api/cards/${id}`)
    // update number of terms for set cards
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
      // NEED TO DELETE CARD TOO
      dispatch({
        type: DELETE_SET,
        sets: sets.filter(set => set.id !== id)
      });
    })
    .catch(err => console.error(err));
};
