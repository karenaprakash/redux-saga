/**
 *  Requests Actions 
 */

/* ------ Types ----- */
import {
    LOGIN_REQUEST,
    SIGNUP_REQUEST,
    LOGOUT_REQUEST,
    TASKS_FETCH_REQUEST,
    TASK_ADD_REQUEST,
    TASK_EDIT_REQUEST,
    TASK_DELETE_REQUEST,
} from '../Reducers/types';

/* ---------- Task Actions ----------- */


//signup
export const signup = (data) => ({
    type : SIGNUP_REQUEST,
    payload : {
        fetchedData : {},
        isLoading : true,
        error : false,
        requestData : data
    }
})


//login
export const login = (data) => ({
    type : LOGIN_REQUEST,
    payload : {
        fetchedData : {},
        isLoading : true,
        error : false,
        requestData : data
    }
})

//logout
export const logout = (data) => ({
    type : LOGOUT_REQUEST,
    payload : {
        fetchedData : {},
        isLoading : true,
        error : false,
        requestData : data
    }
})


//getTasks
export const getTasks = () => ({
    type : TASKS_FETCH_REQUEST,
    payload : {
        fetchedData : {},
        isLoading : true,
        error : false
    }
})

//addTask
export const addTask = (data) => ({
    type : TASK_ADD_REQUEST,
    payload : {
        fetchedData : {},
        isLoading : true,
        error : false,
        requestData : data
    }
})


//editTask
export const editTask = (data) => ({
    type : TASK_EDIT_REQUEST,
    payload : {
        fetchedData : {},
        isLoading : true,
        error : false,
        requestData : data
    }
})

//deleteTask
export const deleteTask = (data) => ({
    type : TASK_DELETE_REQUEST,
    payload : {
        fetchedData : {},
        isLoading : true,
        error : false,
        requestData : data
    }
})

/* -----X----- Task Actions End ------X----- */
