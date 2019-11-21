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
    addTask
} from '../../Actions/user_actions';
/* ------------ HOOKS ----------- */
import useForm from '../../Hooks/formHooks';
/*------- connect react with redux --------*/
import { connect } from 'react-redux';
/* ------------ Components ----------- */
import LoaderSpinner from '../Loader/loader_spinner';

const TaskAddDialog = (props) => {
    /**
     * Props :
     * open : for handle dialog open or not 
     * handleClose : it close our dialog
     * handleAddEvint : this function adds newly added event to previous events 
     * event : initial event which is given by parent 
     */
    const { open, handleClose, handleAddEvent, event } = props;
    /**
     * Callback function for submit form 
     */
    const callbackFunction = () => {
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
        /* --------X------- Validations --------X--------- */
        /**
         * Dispatching addTask function : which calles task_api for addTask in redux saga and return response 
         */
        console.log(inputs)
        props.dispatch(addTask(inputs))
    }
    /**
     * changeDatesType : this function is for convert date as per input fields requirenment
     */
    const changeDatesType = (date) => {
        return moment(date).format('YYYY-MM-DDTHH:mm')
    }

    /* ------- Initial inputData for our useForm hook ------- */
    const InputData = {
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
    console.log(props.data)
    /* -------------------------- Response Handling ------------------------------ */
    if (props.data.addResponse !== undefined) { // first time render loginResponse is undefined 
        if (props.data.addResponse.fetchedData !== undefined) { // first time responseData is undefined when submiting data
            if (props.data.addResponse.error) { //if for error check
                if (props.data.addResponse.fetchedData.message === 'Authentication Failed') {
                    alert(props.data.addResponse.fetchedData.message) //alert error message
                    props.data.addResponse = {} //making response to empty object for next request 
                    return <Redirect to='/login' />
                } else if (props.data.addResponse.fetchedData.message === 'Somthing went wrong') {
                    alert(props.data.addResponse.fetchedData.message)
                    props.data.addResponse = {} //making response to empty object for next request 
                }
            } else if (props.data.addResponse.fetchedData.result !== undefined) {
                alert(props.data.addResponse.fetchedData.message) //alert response message
                console.log(props.data.addResponse.fetchedData.result)
                inputs._id = props.data.addResponse.fetchedData.result._id;
                console.log('updated data', inputs)
                props.data.addResponse = {} //making response to empty object for next request 
                handleAddEvent(inputs)

            }
        }
    }
    /* ----------------X---------- Response Handling -------------X----------------- */



    /* ------ AddForm ------ */
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
                props.data.addResponse !== undefined ? props.data.addResponse.isLoading ? <LoaderSpinner /> : null : null
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
                            Add
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

export default connect(mapStateToProps)(TaskAddDialog);