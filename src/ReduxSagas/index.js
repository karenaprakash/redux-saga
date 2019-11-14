import { all } from 'redux-saga/effects';

import {
    signupSaga,
    loginSaga,
    getTasksSaga,
    addTaskSaga,
    editTaskSaga,
    deleteTaskSaga
} from './tasksSaga';

export default function* rootSaga() {
    yield all([signupSaga(),loginSaga(),getTasksSaga(),addTaskSaga(),editTaskSaga(),deleteTaskSaga()]);
}
