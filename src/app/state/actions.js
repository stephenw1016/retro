import {
  END_SESSION,
  PREVIOUS_CATEGORY,
  NEXT_CATEGORY,
  RECEIVE_CATEGORIES,
  REQUEST_CATEGORIES,
  SAVE_SESSION_REQUEST,
  SAVE_SESSION_SUCCESS,
  SET_SELECTED_CATEGORY_IDS,
  SUBMIT_VOTE,
} from './types';

export const endSession = sessionId => ({
  type: END_SESSION,
  payload: {
    sessionId,
  },
});

export const previousCategory = sessionId => ({
  type: PREVIOUS_CATEGORY,
  payload: {
    sessionId,
  },
});

export const nextCategory = sessionId => ({
  type: NEXT_CATEGORY,
  payload: {
    sessionId,
  },
});


export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  payload: {
    categories,
  },
});

export const requestCategories = () => ({
  type: REQUEST_CATEGORIES,
  payload: {},
});

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

export const setSelectedCategoryIds = selectedCategoryIds => ({
  type: SET_SELECTED_CATEGORY_IDS,
  payload: {
    selectedCategoryIds,
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
