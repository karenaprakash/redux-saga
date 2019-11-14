/**
 * rootReducer : combine all reducers
 */

import { combineReducers } from 'redux';
import task from './task_reducers';

const rootReducer = combineReducers({
    data : task
});

export default rootReducer; 