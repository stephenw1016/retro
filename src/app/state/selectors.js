export const getCategories = state => Object.values(state.categories);

// export const getSessionById = (state, id) => state.sessions[id];

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
  inProgress: true,
};

const newDescription = {
  negative: 'We\'re just pawns in a game of chess with no influence of what we build or how we build.',
  positive: 'We are in control of our destiny. We know exactly what to build and how to build it.',
};

testSession.categories = testSession.categories.map(category => ({ ...category, description: newDescription }));

export const getSessionById = (state, id) => testSession;
