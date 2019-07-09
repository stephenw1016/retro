import { applyMiddleware, createStore } from 'redux';
import thunkMiddleWare from 'redux-thunk';

import { saveSessionMiddleware } from './middleware';
import retroReducers from './reducers';

export const store = createStore(
  retroReducers,
  applyMiddleware(
    thunkMiddleWare,
    saveSessionMiddleware,
  ),
);
