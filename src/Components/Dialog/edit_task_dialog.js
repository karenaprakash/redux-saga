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
    editTask,
    deleteTask
} from '../../Actions/user_actions';
/* ------------ HOOKS ----------- */
import useForm from '../../Hooks/formHooks';
/*------- connect react with redux --------*/
import { connect } from 'react-redux';
/* ------------ Components ----------- */
import LoaderSpinner from '../Loader/loader_spinner';

const TaskEditDialog = (props) => {
    /**
     * Props :
     * open : for handle dialog open or not 
     * handleClose : it close our dialog
     * handleUpdatedEvent : this function adds newly updated event to previous events 
     * event : initial event which is given by parent 
     * handleDeletedEvent :  this function delets newly deleted event to previous events 
     */
    const { open, handleClose, event, handleUpdatedEvent, handleDeletedEvent } = props;
    /**
     * Callback function for submit form 
     */
    const callbackFunction = () => {
        inputs._id = event._id;
        /* --------------- Validations ----------------- */
        const startTime = moment(inputs.start).format('HH:mm');
        const endTime = moment(inputs.end).format('HH:mm');
        const startDate = moment(inputs.start).format('YYYY-MM-DD');
        const endDate = moment(inputs.end).format('YYYY-MM-DD');
        const currentDate = moment().format('YYYY-MM-DD')
        console.log(startDate)
        console.log(currentDate)
        console.log(typeof (startDate))
        console.log(typeof (currentDate))
        if (inputs.title === '') {
            return alert('title can not be null.')
        } else if (endTime < startTime) {
            return alert('Ending Time is not valid.')
        } else if (startTime === '00:00' && endTime === '00:00') {
            return alert('Ending Time or Starting Time  is not valid.')
        } else if (startDate < currentDate || endDate < currentDate) {
            return alert('Start date or End date is invalid.')
        }
        /* ---------X------ Validations --------X--------- */
        /**
         * Dispatching editTask function : which calles task_api for editTask in redux saga and return response
         */
        props.dispatch(editTask(inputs))

    }
    /**
     * changeDatesType : this function is for convert date as per input fields requirenment
     */
    const changeDatesType = (date) => {
        return moment(date).format('YYYY-MM-DDTHH:mm')
    }

    /* ------- Initial inputData for our useForm hook ------- */
    const InputData = {
        _id: event._id,
        title: event.title,
        start: changeDatesType(event.start),
        end: changeDatesType(event.end),
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

    /**
    * Response Handling  : editResponse
    */

    /* -------------------------- Response Handling : editResponse ------------------------------ */
    if (props.data.editResponse !== undefined) { // first time render loginResponse is undefined 
        if (props.data.editResponse.fetchedData !== undefined) { // first time responseData is undefined when submiting data
            if (props.data.editResponse.error) { //if for error check
                if (props.data.editResponse.fetchedData.message === 'Authentication Failed') {
                    alert(props.data.editResponse.fetchedData.message) //alert error message
                    props.data.editResponse = {} //making response to empty object for next request 
                    return <Redirect to='/login' />
                } else if (props.data.editResponse.fetchedData.message === 'Somthing went wrong') {
                    alert(props.data.editResponse.fetchedData.message)
                    props.data.editResponse = {} //making response to empty object for next request 
                }
            } else if (props.data.editResponse.fetchedData.result !== undefined) {
                alert(props.data.editResponse.fetchedData.message) //alert response message
                console.log(props.data.editResponse.fetchedData.result)
                props.data.editResponse = {} //making response to empty object for next request 
                handleUpdatedEvent(inputs)
            }
        }
    }
    /* -----------X--------------- Response Handling -------------X----------------- */


    /**
     * This function is for delete an event 
     */
    const handleDeleteEvent = () => {
        props.dispatch(deleteTask(inputs._id));
    }

    /* -------------------------- Response Handling : deleteResponse ------------------------------ */

    if (props.data.deleteResponse !== undefined) { // first time render loginResponse is undefined 
        if (props.data.deleteResponse.fetchedData !== undefined) { // first time responseData is undefined when submiting data
            if (props.data.deleteResponse.error) { //if for error check
                if (props.data.deleteResponse.fetchedData.message === 'Authentication Failed') {
                    alert(props.data.deleteResponse.fetchedData.message) //alert error message
                    props.data.deleteResponse = {} //making response to empty object for next request 
                    return <Redirect to='/login' />
                } else if (props.data.deleteResponse.fetchedData.message === 'Somthing went wrong') {
                    alert(props.data.deleteResponse.fetchedData.message)
                    props.data.deleteResponse = {} //making response to empty object for next request 
                }
            } else if (props.data.deleteResponse.fetchedData.result !== undefined) {
                alert(props.data.deleteResponse.fetchedData.message) //alert response message
                console.log(props.data.deleteResponse.fetchedData.result)
                props.data.deleteResponse = {} //making response to empty object for next request 
                handleDeletedEvent(inputs)
            }
        }
    }
    /* ------------X-------------- Response Handling : deleteResponse ----------------X-------------- */

    /* ------ EditForm ------ */
    const FormInputs = () => (
        <div id="Form">
            <div className="form_element">
                <div className="form_element-lable">
                    <label>Task Title</label>
                </div>
                <input type="text" name="title" value={inputs.title} onChange={handleInputChange} required />
            </div>

            <div className="form_element">
                <TextField
                    id="start"
                    label="start"
                    name="start"
                    type="datetime-local"
                    defaultValue={inputs.start}
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
            <div className="form_element">
                <TextField
                    id="end"
                    label="end"
                    name="end"
                    type="datetime-local"
                    defaultValue={inputs.end}
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
            {
                props.data.editResponse !== undefined ?
                    props.data.editResponse.isLoading ?
                        <LoaderSpinner />
                        : null
                    : null
            }
            {
                props.data.deleteResponse !== undefined ?
                    props.data.deleteResponse.isLoading ?
                        <LoaderSpinner />
                        : null
                    : null
            }

        </div>
    );


    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit}>
                    <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
                    <DialogContent>
                        {FormInputs()}
                    </DialogContent>
                    <DialogActions>
                        <Button type='button' onClick={handleDeleteEvent} color="primary">
                            Delete
                    </Button>
                        <Button type='submit' color="primary">
                            Edit
                    </Button>
                        <Button onClick={handleClose} color="primary">
                            Cancel
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

export default connect(mapStateToProps)(TaskEditDialog);