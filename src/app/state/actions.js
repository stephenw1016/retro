import {
  SAVE_SESSION_REQUEST,
  SAVE_SESSION_SUCCESS,
  SUBMIT_VOTE,
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
