import { REQUEST_CATEGORIES } from './types';

const initialState = {
  categories: {},
  loading: false,
};

const categoriesReducer = (state = initialState, { type }) => {
  switch (type) {
    case REQUEST_CATEGORIES: {
      return { ...state, loading: true };
    }

    default: {
      return state;
    }
  }
};

export default categoriesReducer;
