import { put, takeLatest , takeEvery} from 'redux-saga/effects';

import {
    SIGNUP_REQUEST,
    LOGIN_REQUEST,
    TASKS_FETCH_REQUEST,
    TASK_ADD_REQUEST,
    TASK_EDIT_REQUEST,
    TASK_DELETE_REQUEST,
} from '../Reducers/types';

import {
    getSignupData,
    getLoginData,
    getTasksData,
    addTaskData,
    editTaskData,
    deleteTaskData
} from './Apis/task_apis';

/*-------------- signupSaga  ---------------*/
//worker 
function* signup(action) {
    const data = yield getSignupData(action.payload.requestData);
    console.log(data)
    yield put(data);
}

//watcher 
function* signupSaga() {
yield takeLatest(SIGNUP_REQUEST,signup)
}
/*-------X------- signupSaga  -------X--------*/
/*-------------- loginSaga  ---------------*/
//worker 
function* login(action) {
    const data = yield getLoginData(action.payload.requestData);
    console.log(data)
    yield put(data);
}

//watcher 
function* loginSaga() {
yield takeLatest(LOGIN_REQUEST,login)
}
/*-------X------- loginSaga  -------X--------*/

/*-------------- getTasksSaga  ---------------*/
//worker 
function* getTasks() {
        const data = yield getTasksData();
        yield put(data);
}
//watcher 
function* getTasksSaga() {
    yield takeEvery(TASKS_FETCH_REQUEST,getTasks)
}
/*-------X------- getTasksSaga  -------X--------*/

/*-------------- addTaskSaga  ---------------*/
function* addTask(action) { 
   // console.log(action.payload.requestData)  
    const response_data = yield addTaskData(action.payload.requestData);
    console.log(response_data)
    yield put(response_data);
}

function* addTaskSaga() {
yield takeLatest(TASK_ADD_REQUEST,addTask)
}
/*-------X------- addTaskSaga  --------X-------*/

/*-------------- editTaskSaga  ---------------*/
function* editTask(action) { 
     console.log(action.payload.requestData)  
     const response_data = yield editTaskData(action.payload.requestData);
     yield put(response_data);
 }
 
 function* editTaskSaga() {
 yield takeLatest(TASK_EDIT_REQUEST,editTask)
 }
 /*-------X------- editTaskSaga  --------X-------*/

 /*-------------- deleteTaskSaga  ---------------*/
function* deleteTask(action) { 
     const response_data = yield deleteTaskData(action.payload.requestData);
     console.log(response_data) 
     yield put(response_data);
 }
 
 function* deleteTaskSaga() {
 yield takeLatest(TASK_DELETE_REQUEST,deleteTask)
 }
 /*-------X------- deleteTaskSaga  --------X-------*/

export {
    signupSaga,
    loginSaga,
    getTasksSaga,
    addTaskSaga,
    editTaskSaga,
    deleteTaskSaga
}
