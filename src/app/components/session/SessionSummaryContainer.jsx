// @flow
import { connect } from 'react-redux';

import SessionSummary from './SessionSummary';
import { getSessionById } from '../../state/selectors';

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

// if (isLastVote) {
//   const newValue = prev[vote.value] + 1;
//   return { ...prev, [vote.value]: (newValue * 100) / votes.length };
// }
const metrics = testSession.categories.map(category => category.votes.reduce((prev, vote, index, votes) => {
  const voteWeight = 100 / votes.length;
  const newValue = prev[vote.value] + voteWeight;
  return { ...prev, [vote.value]: newValue };
}, { title: category.title, positive: 0, neutral: 0, negative: 0 }));

console.log('METRICS', metrics);
const mapStateToProps = (state, ownProps) => ({
  session: testSession,
  metrics,
  // session: getSessionById(state, ownProps.match.params.id),
});

export default connect(mapStateToProps)(SessionSummary);
