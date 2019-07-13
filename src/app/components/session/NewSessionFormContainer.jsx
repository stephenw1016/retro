// @flow
import { connect } from 'react-redux';

import NewSessionForm from './NewSessionForm';
import { retroActions, retroSelectors } from '../../state';

const mapStateToProps = state => ({
  categories: retroSelectors.getCategories(state) || [],
  selectedCategoryIds: state.selectedCategoryIds || [],
});

const mapDispatchToProps = dispatch => ({
  saveSession: session => dispatch(retroActions.saveSessionRequest(session)),
  setSelectedCategoryIds: categoryIds => dispatch(retroActions.setSelectedCategoryIds(categoryIds)),
  requestCategories: () => dispatch(retroActions.requestCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewSessionForm);
