import axios from 'axios';
import { FETCH_CARDS, DELETE_CARD } from './types';

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
