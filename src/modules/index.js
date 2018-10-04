/* eslint-disable */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import TestContainerReducer from 'containers/TestContainer';
import TestPageReducer from 'containers/TestPage';

export default combineReducers({
  'routing': routerReducer,
  'testContainer': TestContainerReducer,
  'testPage': TestPageReducer,
});
