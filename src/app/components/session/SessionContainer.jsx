// @flow
import { connect } from 'react-redux';

import Session from './Session';
import { getSessionById } from '../../state/selectors';
import { previousCategory, nextCategory, submitVote } from '../../state/actions';

const mapStateToProps = (state, ownProps) => ({
  session: getSessionById(state, ownProps.match.params.id),
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const sessionId = ownProps.match.params.id;

  return ({
    submitVote: (userId, categoryId, vote) => dispatch(submitVote(userId, sessionId, categoryId, vote)),
    previousCategory: () => dispatch(previousCategory(sessionId)),
    nextCategory: () => dispatch(nextCategory(sessionId)),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Session);
