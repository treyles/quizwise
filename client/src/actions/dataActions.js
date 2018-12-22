import axios from 'axios';
import {
  FETCH_SETS,
  FETCH_COLLECTION,
  CLEAR_COLLECTION,
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
