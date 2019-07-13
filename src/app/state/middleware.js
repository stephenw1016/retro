import { REQUEST_CATEGORIES, SAVE_SESSION_REQUEST } from './types';
import { getCategories, saveSession } from '../api';
import { receiveCategories, saveSessionSuccess } from './actions';

export const saveSessionMiddleware = () => next => async (action) => {
  const { type, payload } = action;

  if (type !== SAVE_SESSION_REQUEST) {
    return next(action);
  }

  const { session } = payload;
  const savedSession = await saveSession(session);
  console.info('new session added', savedSession);

  return next(saveSessionSuccess(savedSession));
};

// function timeout(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

export const categoryMiddleware = () => next => async (action) => {
  const { type } = action;

  if (type !== REQUEST_CATEGORIES) {
    return next(action);
  }

  const categories = await getCategories();
  console.info('categories requested', categories);

  return next(receiveCategories(categories));
};
