// @flow
import { connect } from 'react-redux';

import Session from './Session';
import { getSessionById } from '../../state/selectors';
import { submitVote } from '../../state/actions';

const mapStateToProps = (state, ownProps) => ({
  session: getSessionById(state, ownProps.match.params.id),
});

const mapDispatchToProps = dispatch => ({
  submitVote: (sessionId, categoryId, vote) => dispatch(submitVote(sessionId, categoryId, vote)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Session);
