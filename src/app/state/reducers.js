import {
  END_SESSION,
  NEXT_CATEGORY,
  PREVIOUS_CATEGORY,
  RECEIVE_CATEGORIES,
  REQUEST_CATEGORIES,
  SAVE_SESSION_SUCCESS,
  SET_SELECTED_CATEGORY_IDS,
  SUBMIT_VOTE,
} from './types';

const testSession = {
  id: 123,
  name: 'Test Session',
  organization: 'SpaceX',
  date: '2019-07-08',
  categories: [
    {
      id: 'category-1',
      title: 'Category 1',
      description: { positive: 'p', negative: 'n' },
      votes: [
        { value: 'positive', comment: '' },
        { value: 'positive', comment: '' },
        { value: 'negative', comment: '' },
        { value: 'negative', comment: '' },
      ],
    },
    {
      id: 'category-2',
      title: 'Category 2',
      description: { positive: 'p', negative: 'n' },
      votes: [
        { value: 'negative', comment: '' },
        { value: 'neutral', comment: '' },
        { value: 'negative', comment: '' },
        { value: 'positive', comment: '' },
      ],
    },
    {
      id: 'category-3',
      title: 'Category 3',
      description: { positive: 'p', negative: 'n' },
      votes: [
        { value: 'negative', comment: '' },
        { value: 'negative', comment: '' },
        { value: 'negative', comment: '' },
        { value: 'positive', comment: '' },
      ],
    },
    {
      id: 'category-4',
      title: 'Category 4',
      description: { positive: 'p', negative: 'n' },
      votes: [
        { value: 'negative', comment: '' },
        { value: 'negative', comment: '' },
        { value: 'negative', comment: '' },
        { value: 'positive', comment: '' },
      ],
    },
  ],
  selectedCategoryIds: [],
  createDate: '2019-07-08',
  createdBy: 123,
  categoryIndex: 1,
};

const newDescription = {
  negative: 'We\'re just pawns in a game of chess with no influence of what we build or how we build.',
  positive: 'We are in control of our destiny. We know exactly what to build and how to build it.',
};

testSession.categories = testSession.categories.map(category => ({ ...category, description: newDescription }));

const initialState = {
  sessions: { [testSession.id]: testSession },
  categories: {},
  loading: false,
};

const retroReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case END_SESSION: {
      const { sessionId } = payload;
      const activeSession = state.sessions[sessionId];

      const updatedSessions = {
        ...state.sessions,
        [activeSession.id]: {
          ...activeSession,
          isComplete: true,
        },
      };

      return {
        ...state,
        sessions: updatedSessions,
      };
    }

    case NEXT_CATEGORY: {
      const { sessionId } = payload;
      const activeSession = state.sessions[sessionId];

      const updatedSessions = {
        ...state.sessions,
        [activeSession.id]: {
          ...activeSession,
          categoryIndex: activeSession.categoryIndex + 1,
        },
      };

      return {
        ...state,
        sessions: updatedSessions,
      };
    }

    case PREVIOUS_CATEGORY: {
      const { sessionId } = payload;
      const activeSession = state.sessions[sessionId];

      const updatedSessions = {
        ...state.sessions,
        [activeSession.id]: {
          ...activeSession,
          categoryIndex: activeSession.categoryIndex - 1,
        },
      };

      return {
        ...state,
        sessions: updatedSessions,
      };
    }

    case RECEIVE_CATEGORIES: {
      const { categories } = payload;
      return {
        ...state,
        categories,
        selectedCategoryIds: categories.map(({ id }) => id),
      };
    }

    case REQUEST_CATEGORIES: {
      return {
        ...state,
        loading: true,
      };
    }

    case SAVE_SESSION_SUCCESS: {
      const { session } = payload;
      const { id } = session;
      return {
        ...state,
        sessions: { ...state.sessions, [id]: session },
      };
    }

    case SET_SELECTED_CATEGORY_IDS: {
      const { selectedCategoryIds } = payload;
      return {
        ...state,
        selectedCategoryIds,
      };
    }

    case SUBMIT_VOTE: {
      const { sessionId, categoryId, vote } = payload;
      const activeSession = state.sessions[sessionId];

      const updatedSessions = {
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
      };

      return {
        ...state,
        sessions: updatedSessions,
      };
    }

    default: {
      return state;
    }
  }
};

export default retroReducers;
