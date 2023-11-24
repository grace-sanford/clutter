// store/reducers/index.js
import { combineReducers } from 'redux';

// Import your reducers here
import someReducer from './someReducer';

const rootReducer = combineReducers({
  // Add your reducers here
  someReducer,
});

export default rootReducer;
