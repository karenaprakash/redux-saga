import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';
/* ------------ Actions ----------- */
import {
    getTasks
} from '../../Actions/user_actions';
/* ------------ HOOKS ----------- */
import useForm from '../../Hooks/formHooks';
/*------- connect react with redux --------*/
import { connect } from 'react-redux';
/* ------------ Components ----------- */
import LoaderSpinner from '../Loader/loader_spinner';

const TaskGetDialog = (props) => {
    /**
     * Props :
     * open : for handle dialog open or not 
     * handleClose : it close our dialog
     * handleAddEvint : this function adds newly added event to previous events 
     * event : initial event which is given by parent 
     */
    const { open, handleClose, setNavigationDate, event } = props;
    /**
     * Callback function for submit form 
     */
    const callbackFunction = () => {
        /* --------------- Validations ----------------- */

        const startDate = moment(inputs.startDate).format('YYYY-MM-DD');
        const endDate = moment(inputs.endDate).format('YYYY-MM-DD');
        
         if (endDate <  startDate ) {
            return alert('End date can not be smaller then start date.')
        }
        /* --------X------- Validations --------X--------- */
        /**
         * Dispatching addTask function : which calles task_api for addTask in redux saga and return response 
         */
        setNavigationDate(inputs);
        handleClose()
       // props.dispatch(getTasks(inputs))
    }
    /**
     * changeDatesType : this function is for convert date as per input fields requirenment
     */
    const changeDatesType = (date) => {
        return moment(date).format('YYYY-MM-DDTHH:mm')
    }

    /* ------- Initial inputData for our useForm hook ------- */
    const InputData = {
       startDate : event.startDate,
       endDate : event.endDate
    }

    /**
     * useForm hook : it handles inputChanges and submitForm 
     * arguments : 
     *  1. initialData for set initial values to our form inputs.
     *  2. callbackFunction which runs when form is submits.
     */
    const {
        inputs,
        handleSubmit,
        handleInputChange
    } = useForm(InputData, callbackFunction);
    console.log(props.data)
 

    /* ------ AddForm ------ */
    const FormInputs = () => (
        <div id="Form">
            <div className="form_element">
                <div className="form_element-lable">
                    <label>Start Date</label>
                </div>
                <input type="date" name="startDate" value={inputs.startDate} onChange={handleInputChange} required />
            </div>
            <div className="form_element">
                <div className="form_element-lable">
                    <label>End Date</label>
                </div>
                <input type="date" name="endDate" value={inputs.endDate} onChange={handleInputChange} required />
            </div>

            {
                props.data.fetchResponse !== undefined ? props.data.fetchResponse.isLoading ? <LoaderSpinner /> : null : null
            }

        </div>
    );


    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit}>
                    <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
                    <DialogContent>
                        {FormInputs()}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
            </Button>
                        <Button type='submit' color="primary">
                            Get
            </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}


const mapStateToProps = (state) => {
    console.log(state.data)
    return {
        data: state.data
    }
}

export default connect(mapStateToProps)(TaskGetDialog);