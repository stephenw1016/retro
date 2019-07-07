// @flow
import { connect } from 'react-redux';

import Session from './Session';
import { getSessionById } from '../../state/selectors';

const mapStateToProps = (state, ownProps) => ({
  session: getSessionById(state, ownProps.match.params.id),
});

export default connect(mapStateToProps)(Session);
