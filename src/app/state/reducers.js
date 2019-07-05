import { ADD_SESSION } from './types';

const initialState = {
  sessions: {},
  categories: {},
  loading: false,
};

const sessionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_SESSION: {
      const { session } = payload;
      return {
        ...state,
        sessions: {
          ...state.sessions,
          [session.id]: session,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default sessionsReducer;
