import axios from 'axios';
import { API_URL } from '../../Config/config';
import {
        SIGNUP_SUCCESS,
        SIGNUP_FAILED,
        LOGIN_SUCCESS,
        LOGIN_FAILED,
        TASKS_FETCH_SUCCESS,
        TASKS_FETCH_FAILED,
        TASK_ADD_SUCCESS,
        TASK_ADD_FAILED,
        TASK_EDIT_SUCCESS,
        TASK_EDIT_FAILED,
        TASK_DELETE_SUCCESS,
        TASK_DELETE_FAILED,
        } from '../../Reducers/types';  


const getMethod = () => {

}


//getSignupData
const getSignupData = async (requestData) => {
    console.log(requestData)
    const data =  await axios.post(`${API_URL}/signup`,requestData)
          .then(response => {
              return {
                  type : SIGNUP_SUCCESS,
                  payload : {
                      isLoading : false,
                      fetchedData : response.data,
                      error : false
                  } 
              }
          })
          .catch(error=> {
              return {
                  type : SIGNUP_FAILED,
                  payload :  {
                      isLoading : false,
                      fetchedData : error.response.data,
                      error : true
                  }
              }              
          })
      
          return data;
  }  
  

//getLoginData
const getLoginData = async (requestData) => {
    console.log(requestData)
    const data =  await axios.post(`${API_URL}/login`,requestData , { withCredentials: true } )
          .then(response => {
              return {
                  type : LOGIN_SUCCESS,
                  payload : {
                      isLoading : false,
                      fetchedData : response.data,
                      error : false
                  } 
              }
          })
          .catch(error=> {
              return {
                  type : LOGIN_FAILED,
                  payload :  {
                      isLoading : false,
                      fetchedData : error.response.data,
                      error : true
                  }
              }              
          })
      
          return data;
  }


//getTasksData
const getTasksData = async (requestData) => {
  const data =  await axios.get(`${API_URL}/get-tasks?startDate=${requestData.startDate}&endDate=${requestData.endDate}`,{ withCredentials : true })
        .then(response => {
            return {
                type : TASKS_FETCH_SUCCESS,
                payload : {
                    isLoading : false,
                    fetchedData : response.data,
                    error : false
                } 
            }
        })
        .catch(error=> {
            return {
                type : TASKS_FETCH_FAILED,
                payload :  {
                    isLoading : false,
                    fetchedData : error.response.data,
                    error : true
                }
            }
            
        })
    
        return data;
}

//addTaskData 
const addTaskData = async (data) => {
    console.log(data)


    const response_data =  await axios.post(`${API_URL}/add-task`,data,{ withCredentials : true })
        .then(response => {
            return {
                type : TASK_ADD_SUCCESS,
                payload :  {
                    isLoading : false,
                    fetchedData : response.data,
                    error : false
                }
            }
        })
        .catch(error=>{
            return {
                type : TASK_ADD_FAILED,
                payload : {
                    isLoading : false,
                    fetchedData : error.response.data,
                    error : true
                } 
            }
        })
        return response_data;
}


//editTaskData 
const editTaskData = async (data) => {
    console.log(data)
    const response_data =  await axios.post(`${API_URL}/edit-task`,data,{ withCredentials : true })
        .then(response => {
            return {
                type : TASK_EDIT_SUCCESS ,
                payload :  {
                    isLoading : false,
                    fetchedData : response.data,
                    error : false
                }
            }
        })
        .catch(error=>{
            return {
                type : TASK_EDIT_FAILED,
                payload : {
                    isLoading : false,
                    fetchedData : error.response.data,
                    error : true
                } 
            }
        })
        return response_data;
}


//deleteTaskData 
const deleteTaskData = async (id) => {
    console.log(id)

    const response_data = await axios.delete(`${API_URL}/delete-task?id=${id}`,{ withCredentials : true })
    .then(response => {
        return {
            type : TASK_DELETE_SUCCESS,
            payload :  {
                isLoading : false,
                fetchedData : response.data,
                error : false
            }
        }
    })
    .catch(error=>{
        return {
            type : TASK_DELETE_FAILED,
            payload : {
                isLoading : false,
                fetchedData : error.response.data,
                error : true
            } 
        }
    })
        return response_data;
}



export {
    getSignupData,
    getLoginData,
    getTasksData,
    addTaskData,
    editTaskData,
    deleteTaskData,
}




