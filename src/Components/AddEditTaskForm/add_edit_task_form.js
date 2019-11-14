/**
 * AddEditTaskForm 
 */
import React , { useReducer } from 'react';
import moment from 'moment';

/* ------------ CSS ----------- */
import './add_edit_task_form.css';
/* ------------ HOOKS ----------- */
import useForm from '../../Hooks/formHooks';

/* ------------ Actions ----------- */
import {
    addTask,
    editTask
} from '../../Actions/user_actions';
/* ------------ Components ----------- */
import LoaderSpinner from '../Loader/loader_spinner';
/*------- connect react with redux --------*/
import { connect } from 'react-redux';

const AddEditTaskForm = (props) => {
   const task_type = props.task_type;
   const task_id = props.task_id;

    //it run as per requirenment 
    const callbackFunction = () => {
        if(task_type === 'AddTask'){
            const date = moment(inputs.date).format('YYYY-MM-DD');
            inputs.date = date;
            props.dispatch(addTask(inputs))
        }else if(task_type === 'EditTask'){
            console.log('edittask')
            inputs._id = task_id;
            const date = moment(inputs.date).format('YYYY-MM-DD');
            inputs.date = date;
            console.log(inputs)
            props.dispatch(editTask(inputs))
        }
    }

    //default inputs 
    let inputData = {
        task : '',
        date : '',
        time : ''
    }

    if(task_type === 'EditTask'){
        const task = props.data.fetchResponse.fetchedData.filter(item=>{
            return task_id === item._id
        });
        const date = moment(task[0].date).format('YYYY-MM-DD');
        console.log(task[0].time)

        inputData = {
            _id : task[0]._id,
            task : task[0].task,
            time : task[0].time,
            date : date
        }
    }

    const {
        inputs,
        handleSubmit,
        handleInputChange
    }  = useForm(inputData,callbackFunction);
        
    /* ------ AddForm ------ */
    const Form = (
        <div id="Form">
            <div id='form-title'>{task_type}</div>
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
                        props.data.isLoading ? <LoaderSpinner/> : null
                    }
                    <input type='submit' name="submit" value={task_type} />
                    <input type='button' name='cancel' value='Cancel' />   
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

export default connect(mapStateToProps)(AddEditTaskForm);