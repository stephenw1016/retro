import { applyMiddleware, createStore } from 'redux';
import thunkMiddleWare from 'redux-thunk';

import categoriesReducer from './reducers';

export const store = createStore(
  categoriesReducer,
  applyMiddleware(thunkMiddleWare),
);
