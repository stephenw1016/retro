import { applyMiddleware, createStore } from 'redux';

import * as retroActions from './actions';
import * as retroSelectors from './selectors';
import retroReducers from './reducers';
import { categoryMiddleware, saveSessionMiddleware } from './middleware';

export {
  retroActions,
  retroSelectors,
};

export default createStore(
  retroReducers,
  applyMiddleware(
    categoryMiddleware,
    saveSessionMiddleware,
  ),
);
