import { SAVE_SESSION_SUCCESS, SET_CURRENT_SESSION } from './types';

const initialState = {
  currentSession: '',
  sessions: {},
  categories: {},
  loading: false,
};

const sessionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_SESSION_SUCCESS: {
      const { session } = payload;
      const { id } = session;
      return {
        ...state,
        currentSession: id,
        sessions: { ...state.sessions, [id]: session },
      };
    }

    case SET_CURRENT_SESSION: {
      const { sessionId } = payload;
      return {
        ...state,
        currentSession: sessionId,
      };
    }

    default: {
      return state;
    }
  }
};

export default sessionsReducer;
