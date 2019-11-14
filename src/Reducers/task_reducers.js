/**
 * 
 * task_reducer : which containe all reducers related to task perform by admin
 *  
 */
/* ----------- types --------- */
  
import {
    LOGIN_REQUEST,
    SIGNUP_REQUEST,
    LOGOUT_REQUEST,
    TASKS_FETCH_REQUEST,
    TASK_ADD_REQUEST,
    TASK_EDIT_REQUEST,
    TASK_DELETE_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    SIGNUP_SUCCESS,
    SIGNUP_FAILED,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    TASKS_FETCH_SUCCESS,
    TASKS_FETCH_FAILED,
    TASK_ADD_SUCCESS,
    TASK_ADD_FAILED,
    TASK_EDIT_SUCCESS,
    TASK_EDIT_FAILED,
    TASK_DELETE_SUCCESS,
    TASK_DELETE_FAILED,
} from './types';

 export default function(state = {} ,action){
     console.log(action)
     switch(action.type){
        case LOGIN_REQUEST:
            return {...state,loginResponse:action.payload}
        case LOGIN_SUCCESS:
            return {...state,loginResponse:action.payload}
        case LOGIN_FAILED:
            return {...state,loginResponse:action.payload}
        case SIGNUP_REQUEST:
            return {...state,signupResponse:action.payload}
        case SIGNUP_SUCCESS:
            return {...state,signupResponse:action.payload}
        case SIGNUP_FAILED:
            return {...state,signupResponse:action.payload} 
        case LOGOUT_REQUEST:
            return {...state,logoutResponse:action.payload}
        case LOGOUT_SUCCESS:
            return {...state,logoutResponse:action.payload}
        case LOGOUT_FAILED:
            return {...state,logoutResponse:action.payload}
        case TASKS_FETCH_REQUEST:
            return {...state,fetchResponse:action.payload}
        case TASKS_FETCH_SUCCESS:
            return {...state,fetchResponse:action.payload}
        case TASKS_FETCH_FAILED:
            return {...state,fetchResponse:action.payload}
        case TASK_ADD_REQUEST:
            return {...state,addResponse:action.payload}
        case TASK_ADD_SUCCESS:
            return {...state,addResponse:action.payload}
        case TASK_ADD_FAILED:
            return {...state,addResponse:action.payload}
        case TASK_EDIT_REQUEST:
            return {...state,editResponse:action.payload}
        case TASK_EDIT_SUCCESS:
            return {...state,editResponse:action.payload}
        case TASK_EDIT_FAILED:
            return {...state,editResponse:action.payload}
        case TASK_DELETE_REQUEST:
            return {...state,deleteResponse:action.payload}
        case TASK_DELETE_SUCCESS:
            return {...state,deleteResponse:action.payload}
        case TASK_DELETE_FAILED:
            return {...state,deleteResponse:action.payload}
         default: 
            return state
     }

 }