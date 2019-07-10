import { applyMiddleware, createStore } from 'redux';

import { saveSessionMiddleware } from './middleware';
import retroReducers from './reducers';

export const store = createStore(
  retroReducers,
  applyMiddleware(
    saveSessionMiddleware,
  ),
);
