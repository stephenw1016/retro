// @flow
import { connect } from 'react-redux';

import SessionSummary from './SessionSummary';
import { getSessionById } from '../../state/selectors';

const mapStateToProps = (state, ownProps) => ({
  session: getSessionById(state, ownProps.match.params.id),
});

export default connect(mapStateToProps)(SessionSummary);
