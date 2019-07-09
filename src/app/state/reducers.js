import { SAVE_SESSION_SUCCESS, SUBMIT_VOTE } from './types';

const testSession = {
  id: 123,
  name: 'Test Session',
  organization: 'SpaceX',
  date: '2019-07-08',
  categories: [
    { id: 'category-1', title: 'Category 1', description: { positive: 'p', negative: 'n' }, votes: [] },
    { id: 'category-2', title: 'Category 2', description: { positive: 'p', negative: 'n' }, votes: [] },
    { id: 'category-3', title: 'Category 3', description: { positive: 'p', negative: 'n' }, votes: [] },
  ],
  createDate: '2019-07-08',
  createdBy: 123,
  inProgress: true,
};

const initialState = {
  sessions: { [testSession.id]: testSession },
  categories: {},
  loading: false,
};

const retroReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_SESSION_SUCCESS: {
      const { session } = payload;
      const { id } = session;
      return {
        ...state,
        sessions: { ...state.sessions, [id]: session },
      };
    }

    case SUBMIT_VOTE: {
      const { sessionId, categoryId, vote } = payload;
      const activeSession = state.sessions[sessionId];

      return {
        ...state,
        sessions: {
          ...state.sessions,
          [activeSession.id]: {
            ...activeSession,
            categories: activeSession.categories
              .map((category) => {
                const isActiveCategory = category.id === categoryId;
                return isActiveCategory
                  ? { ...category, votes: [...category.votes, vote] }
                  : category;
              }),
          },
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default retroReducers;
