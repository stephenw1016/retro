import { SAVE_SESSION_SUCCESS, SET_CURRENT_SESSION } from './types';

const testSession = {
  id: 123,
  name: 'Test Session',
  organization: 'SpaceX',
  date: '2019-07-08',
  categories: [
    { id: 'category-1', title: 'Category 1', description: { positive: 'p', negative: 'n' } },
    { id: 'category-2', title: 'Category 2', description: { positive: 'p', negative: 'n' } },
    { id: 'category-3', title: 'Category 3', description: { positive: 'p', negative: 'n' } },
  ],
  createDate: '2019-07-08',
  createdBy: 123,
  inProgress: true,
};

const initialState = {
  currentSession: '',
  sessions: { [testSession.id]: testSession },
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
