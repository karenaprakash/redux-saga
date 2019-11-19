/**
 * AddEditTaskForm 
 */
import React , { useEffect } from 'react';
import moment from 'moment';
import {Link,Redirect} from 'react-router-dom';
/* ------------ CSS ----------- */
import './add_task_form.css';
/* ------------ HOOKS ----------- */
import useForm from '../../../Hooks/formHooks';

/* ------------ Actions ----------- */
import {
    addTask,
} from '../../../Actions/user_actions';
/* ------------ Components ----------- */
import LoaderSpinner from '../../../Components/Loader/loader_spinner';
/*------- connect react with redux --------*/
import { connect } from 'react-redux';

const AddTaskForm = (props) => {

    //it run as per requirenment 
    const callbackFunction = () => {
            const start_date = moment(inputs.start_date).format('YYYY-MM-DD');
            const end_date = moment(inputs.date).format('YYYY-MM-DD');
            inputs.start = start_date;
            inputs.end = end_date;
            console.log(inputs)
            props.dispatch(addTask(inputs))        
    }

    //default inputs 
    let inputData = {
        title : '',
        start : '',
        end : '',
        time : ''
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
    if(props.data.addResponse !== undefined){ // first time render loginResponse is undefined 
        if(props.data.addResponse.fetchedData !== undefined){ // first time responseData is undefined when submiting data
            if(props.data.addResponse.error){ //if for error check
                if(props.data.addResponse.fetchedData.message === 'Authentication Failed'){ 
                    alert(props.data.addResponse.fetchedData.message) //alert error message
                    props.data.addResponse = {} //making response to empty object for next request 
                    return <Redirect to='/admin/login'/>
                }else if(props.data.addResponse.fetchedData.message === 'Somthing went wrong'){ 
                     alert(props.data.addResponse.fetchedData.message)       
                     props.data.addResponse = {} //making response to empty object for next request 
                }
            }else if(props.data.addResponse.fetchedData.result !== undefined){ 
                    alert(props.data.addResponse.fetchedData.message) //alert response message
                    /*
                       // add new task 
                        inputs = {
                            task : '',
                            date : '',
                            time : ''
                        }
                    */
                   props.data.addResponse = {} //making response to empty object for next request 

                    return <Redirect to='/'/>
            }
        }
    }


    /* ------ AddForm ------ */
    const Form = (
        <div id="Form">
            <div id='form-title'>Add Task</div>
            <form onSubmit={handleSubmit}>
                <div className="form_element">
                    <div className="form_element-lable">
                        <label>Task Title</label>
                    </div>
                    <input type="text" name="title" value={inputs.title} onChange={handleInputChange} required />
                </div>
                <div className="form_element">
                    <div className="form_element-lable">
                        <label>Start Date</label>
                    </div> 
                    <input type="date" min={moment(Date()).format('YYYY-MM-DD')} name="start" value={inputs.start} onChange={handleInputChange} required />
                </div> 
                <div className="form_element">
                    <div className="form_element-lable">
                        <label>End Date</label>
                    </div> 
                    <input type="date" min={moment(Date()).format('YYYY-MM-DD')} name="end" value={inputs.end} onChange={handleInputChange} required />
                </div>   
                <div className="form_element">
                    <div className="form_element-lable">
                        <label>Time</label>
                    </div> 
                    <input type="time" name="time" value={inputs.time} onChange={handleInputChange} required />
        
                </div>  
                    {
                        props.data.addResponse !== undefined ? props.data.addResponse.isLoading ? <LoaderSpinner/> : null : null
                     }
                    <input type='submit' name="submit" value='Add Task' />
                  <Link to='/'> <input type='button' name='cancel' value='Cancel' />   </Link> 
            </form>
        </div>
    );
   
    console.log('form')
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

export default connect(mapStateToProps)(AddTaskForm);