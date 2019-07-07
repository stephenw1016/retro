import {
  ADD_SESSION,
  REQUEST_CATEGORIES,
  SET_CURRENT_SESSION,
} from './types';

export const addSession = session => ({
  type: ADD_SESSION,
  payload: {
    session,
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
