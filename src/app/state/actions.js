import {
  REQUEST_CATEGORIES,
  SAVE_SESSION_REQUEST,
  SAVE_SESSION_SUCCESS,
  SET_CURRENT_SESSION, SUBMIT_VOTE,
} from './types';

export const saveSessionRequest = session => ({
  type: SAVE_SESSION_REQUEST,
  payload: {
    session,
  },
});

export const saveSessionSuccess = session => ({
  type: SAVE_SESSION_SUCCESS,
  payload: {
    session,
  },
});

export const submitVote = (sessionId, categoryId, vote) => ({
  type: SUBMIT_VOTE,
  payload: {
    sessionId,
    categoryId,
    vote,
  },
});

export const setCurrentSession = sessionId => ({
  type: SET_CURRENT_SESSION,
  payload: {
    sessionId,
  },
});

export const requestCategories = () => ({
  type: REQUEST_CATEGORIES,
  payload: {},
});
