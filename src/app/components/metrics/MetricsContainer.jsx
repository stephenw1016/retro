// @flow
import { connect } from 'react-redux';

import Metrics from './Metrics';
import { getSessionById } from '../../state/selectors';

const mapStateToProps = (state, ownProps) => ({
  session: getSessionById(state, ownProps.match.params.sessionId),
});

export default connect(mapStateToProps)(Metrics);
