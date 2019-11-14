/**
 * AddEditTaskForm 
 */

import React , { useState } from 'react';
import {Link,Redirect} from 'react-router-dom';
import useForm from '../../../Hooks/formHooks';
import { signup } from "../../../Actions/user_actions";
import LoaderSpinner from '../../../Components/Loader/loader_spinner';
import { connect } from 'react-redux';
import './signup_container.css';

const SignupContainer = (props) => {

    //it calls after submition of form 
    const callbackFunction = () => {
        props.dispatch(signup(inputs))
    }

   //inputData for default data in form 
    let inputData =  {
        first_name : '',
        last_name : '',
        email : '',
        mobile : '',
        password : ''
    }

    let {
        inputs,
        handleSubmit,
        handleInputChange
    }  = useForm(inputData,callbackFunction);
        
        if(props.data.signupResponse !== undefined){
            if(props.data.signupResponse.error){
                alert(props.data.signupResponse.fetchedData.message) // error alert
                if(props.data.signupResponse.fetchedData.message === 'Email Already Exist.'){ 
                    inputs = {
                        first_name : inputs.first_name,
                        last_name : inputs.last_name,
                        email : '',
                        mobile : inputs.mobile,
                        password : inputs.password
                    }
                }else{
                    inputs = {
                        first_name : inputs.first_name,
                        last_name : inputs.last_name,
                        email : inputs.email,
                        mobile : '',
                        password : ''                    }
                }
                props.data.signupResponse = {}  // making response to empty object for next request 

            }else if(props.data.signupResponse.fetchedData){
                if(props.data.signupResponse.fetchedData.result){
                    alert(props.data.signupResponse.fetchedData.message)
                    return <Redirect to='/admin/login'/>
                }
            }
        }
   
        

    /* ------ AddForm ------ */
    const Form = (     
        <div id="Form">
        <div id='form-title'>Signup Form</div>
        <form onSubmit={handleSubmit}>
            <div className="form_element">
                <div className="form_element-lable">
                    <label>First Name</label>
                </div>
                <input type="text" name="first_name" value={inputs.first_name} onChange={handleInputChange} required />
            </div>
            <div className="form_element">
                <div className="form_element-lable">
                    <label>Last Name</label>
                </div>
                <input type="text" name="last_name" value={inputs.last_name} onChange={handleInputChange} required />
            </div>
            <div className="form_element">
                <div className="form_element-lable">
                    <label>Mobile</label>
                </div>
                <input type="number" name="mobile" value={inputs.mobile} onChange={handleInputChange} required />
            </div>
            <div className="form_element">
                <div className="form_element-lable">
                    <label>Email</label>
                </div>
                <input type="email" name="email" value={inputs.email} onChange={handleInputChange} required />
            </div>
            <div className="form_element">
                <div className="form_element-lable">
                    <label>Password</label>
                </div> 
                <input type="password" name="password" value={inputs.password} onChange={handleInputChange} required />
            </div>   
            <div>
                {
                    props.data.signupResponse !== undefined ? props.data.signupResponse.isLoading ? <LoaderSpinner/> : null : null
                }
            </div>
              
                <input type='submit' name="submit" value='SignUp' />
                <Link to='/admin/login'><input type='button' name='login' value='Login' /></Link>                            
                <Link to='/'><input type='button' name='cancel' value='Cancel' /></Link>      
        </form>
    </div>
    )

    return Form;
}

const mapStateToProps = (state) =>{
    console.log(state.data)
    return {
        data :  state.data
    }
}

export default connect(mapStateToProps)(SignupContainer);