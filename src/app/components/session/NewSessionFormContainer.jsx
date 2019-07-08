// @flow
import { connect } from 'react-redux';
import { saveSessionRequest } from '../../state/actions';

import NewSessionForm from './NewSessionForm';

const mapDispatchToProps = dispatch => ({
  saveSession: session => dispatch(saveSessionRequest(session)),
});

export default connect(null, mapDispatchToProps)(NewSessionForm);
