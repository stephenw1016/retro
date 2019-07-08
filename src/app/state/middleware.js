import { SAVE_SESSION_REQUEST } from './types';
import { saveSession } from '../api';
import { saveSessionSuccess } from './actions';

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
