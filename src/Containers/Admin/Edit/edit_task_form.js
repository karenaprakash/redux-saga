/**
 * AddEditTaskForm 
 */
import React , { useReducer } from 'react';
import {Link,Redirect} from 'react-router-dom';
import moment from 'moment';

/* ------------ CSS ----------- */
import './edit_task_form.css';
/* ------------ HOOKS ----------- */
import useForm from '../../../Hooks/formHooks';

/* ------------ Actions ----------- */
import {
    editTask
} from '../../../Actions/user_actions';
/* ------------ Components ----------- */
import LoaderSpinner from '../../../Components/Loader/loader_spinner';
/*------- connect react with redux --------*/
import { connect } from 'react-redux';

const EditTaskForm = (props) => {
   const task_id = props.task_id;

    //it run as per requirenment 
    const callbackFunction = () => {
        
            console.log('edittask')
            inputs._id = task_id;
            const date = moment(inputs.date).format('YYYY-MM-DD');
            inputs.date = date;
            console.log(inputs)
            props.dispatch(editTask(inputs))
        
    }

        const task = props.data.fetchResponse.fetchedData.result.filter(item=>{
            return task_id === item._id
        });

        const date = moment(task[0].date).format('YYYY-MM-DD');
        console.log(task[0].time)

        let  inputData = {
                _id : task[0]._id,
                task : task[0].task,
                time : task[0].time,
                date : date
            }

    const {
        inputs,
        handleSubmit,
        handleInputChange
    }  = useForm(inputData,callbackFunction);
        

      /**
     * Response Handling  
     */
    console.log(props.data)
    if(props.data.editResponse !== undefined){ // first time render loginResponse is undefined 
        if(props.data.editResponse.fetchedData !== undefined){ // first time responseData is undefined when submiting data
            if(props.data.editResponse.error){ //if for error check
                if(props.data.editResponse.fetchedData.message === 'Authentication Failed'){ 
                    alert(props.data.editResponse.fetchedData.message) //alert error message
                    props.data.editResponse = {} //making response to empty object for next request 
                    return <Redirect to='/admin/login'/>
                }else if(props.data.editResponse.fetchedData.message === 'Somthing went wrong'){ 
                     alert(props.data.editResponse.fetchedData.message)       
                     props.data.editResponse = {} //making response to empty object for next request 
                }
            }else if(props.data.editResponse.fetchedData.result !== undefined){ 
                    alert(props.data.editResponse.fetchedData.message) //alert response message
                    
                   props.data.editResponse = {} //making response to empty object for next request 

                
            }
        }
    }



    /* ------ AddForm ------ */
    const Form = (
        <div id="Form">
            <div id='form-title'>Edit Task </div>
            <form onSubmit={handleSubmit}>
                <div className="form_element">
                    <div className="form_element-lable">
                        <label>Task</label>
                    </div>
                    <input type="text" name="task" value={inputs.task} onChange={handleInputChange} required />
                </div>
                <div className="form_element">
                    <div className="form_element-lable">
                        <label>Date</label>
                    </div> 
                    <input type="date" min={moment(Date()).format('YYYY-MM-DD')} name="date" value={inputs.date} onChange={handleInputChange} required />
                </div>   
                <div className="form_element">
                    <div className="form_element-lable">
                        <label>Time</label>
                    </div> 
                    <input type="time" name="time" value={inputs.time} onChange={handleInputChange} required />
        
                </div>  
                    {
                         props.data.editResponse !== undefined ? props.data.editResponse.isLoading ? <LoaderSpinner/> : null : null
                    }
                    <input type='submit' name="submit" value='Edit Task' />
                    <Link to='/'><input type='button' name='cancel' value='Cancel' />  </Link> 
            </form>
        </div>
    );
   

    

    return (
        <div>
            {Form}
        </div>
    );
}

const mapStateToProps = (state) =>{
    console.log(state.data)
    return {
        data :  state.data
    }
}

export default connect(mapStateToProps)(EditTaskForm);