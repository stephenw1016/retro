// @flow
import { connect } from 'react-redux';
import { addSession } from '../../state/actions';

import NewSessionForm from './NewSessionForm';

const mapDispatchToProps = dispatch => ({
  addSession: session => dispatch(addSession(session)),
});

export default connect(null, mapDispatchToProps)(NewSessionForm);
