/**
 * AddEditTaskForm 
 */
import React , { useReducer } from 'react';
import {Link,Redirect} from 'react-router-dom';
/* ------------ CSS ----------- */
import './login_signup_form.css';
/* ------------ HOOKS ----------- */
import useForm from '../../../Hooks/formHooks';

/* ------------ Actions ----------- */
import { login , signup } from "../../../Actions/user_actions";

/* ------------ Components ----------- */
import LoaderSpinner from '../../Loader/loader_spinner';
/*------- connect react with redux --------*/
import { connect } from 'react-redux';

const LoginSignUpForm = (props) => {
   const task_type = props.task_type;

    //it run as per requirenment 
    const callbackFunction = () => {
        if(task_type === 'Login'){
            console.log(inputs)
            props.dispatch(login(inputs))
        }else if(task_type === 'SignUp'){
            console.log('signUp')
            props.dispatch(signup(inputs))
        }
    }


   //inputData for default data in form 
    let inputData;
    if(task_type === 'Login'){
        inputData = {
            email : '',
            password : ''
        }
    }else if(task_type === 'SignUp'){
        inputData = {
            first_name : '',
            last_name : '',
            email : '',
            mobile : '',
            password : ''
        }
    }

    let {
        inputs,
        handleSubmit,
        handleInputChange
    }  = useForm(inputData,callbackFunction);
        
    console.log(props.data)
    if(task_type === 'Login'){
        if(props.data.loginResponse !== undefined){
            if(props.data.loginResponse.error){
                props.data.loginResponse = {}
                inputs = {
                    email : '',
                    password : ''
                }
            }else if(props.data.loginResponse.fetchedData){
                if(props.data.loginResponse.fetchedData.isAuth){
                    console.log('Authendicated')
                    return <Redirect to='/'/>
                }
            }
        }
    }else if(task_type === 'SignUp'){
        if(props.data.signupResponse !== undefined){
            if(props.data.signupResponse.error){
                props.data.signupResponse = {}
                inputs = {
                    first_name : '',
                    last_name : '',
                    email : '',
                    mobile : '',
                    password : ''
                }
            }else if(props.data.signupResponse.fetchedData){
                console.log('Signup successfully')
                return <Redirect to='/admin/login'/>
            }
        }
        
    }

    /* ------ AddForm ------ */
    const Form = () => {
        if(task_type === 'SignUp'){
          return  (
                <div id="Form">
                    <div id='form-title'>{task_type}</div>
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
                            {
                                props.data.isLoading ? <LoaderSpinner/> : null
                            }
                            <input type='submit' name="submit" value={task_type} />
                            <Link to='/admin/login'><input type='button' name='login' value='Login' /></Link>                            
                            <Link to='/'><input type='button' name='cancel' value='Cancel' /></Link>      
                    </form>
                </div>
            )
        }else if(task_type ==='Login'){
            return  (
                <div id="Form">
                    <div id='form-title'>{task_type}</div>
                    <form onSubmit={handleSubmit}>
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
                            {
                                props.data.isLoading ? <LoaderSpinner/> : null
                            }
                            <input type='submit' name="submit" value={task_type} />
                            <Link to='/admin/signup'><input type='button' name='signup' value='Signup' /></Link>   
                            <Link to='/'><input type='button' name='cancel' value='Cancel' /></Link> 
                    </form>
                </div>
            )
        }
    } 
   

    

    return (
        <div>
            {Form()}
        </div>
    );
}

const mapStateToProps = (state) =>{
    console.log(state.data)
    return {
        data :  state.data
    }
}

export default connect(mapStateToProps)(LoginSignUpForm);