import { REQUEST_CATEGORIES, ADD_SESSION } from './types';

export const addSession = session => ({
  type: ADD_SESSION,
  payload: {
    session,
  },
});

export const requestCategories = () => ({
  type: REQUEST_CATEGORIES,
  payload: {},
});
