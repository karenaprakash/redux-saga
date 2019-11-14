/**
 * Login Form 
 */

import React , { useEffect } from 'react';
import {Link,Redirect} from 'react-router-dom';
import useForm from '../../../Hooks/formHooks';
import { login } from "../../../Actions/user_actions";
import LoaderSpinner from '../../../Components/Loader/loader_spinner';
import { connect } from 'react-redux';
import './login_container.css';

const LoginContainer = (props) => {


    //it calls after submition of form 
    const callbackFunction = () => {
        props.dispatch(login(inputs))
    }

   //inputData for default data in form 
    let inputData = {
            email : '',
            password : ''
        }

    let {
        inputs,
        handleSubmit,
        handleInputChange
    }  = useForm(inputData,callbackFunction);

    /**
     * Response Handling  
     */

    if(props.data.loginResponse !== undefined){ // first time render loginResponse is undefined 
        if(props.data.loginResponse.fetchedData !== undefined){ // first time responseData is undefined when submiting data
            if(props.data.loginResponse.error){ //if for error check
                alert(props.data.loginResponse.fetchedData.message) //alert error message
                if(props.data.loginResponse.fetchedData.message === 'Wrong Password'){ 
                    inputs = {
                        email : inputs.email,
                        password : ''
                    }
                }else{
                    inputs = {
                        email : '',
                        password : ''
                    }
                }
              
                props.data.loginResponse = {} //making response to empty object for next request 
    
            }else if(props.data.loginResponse.fetchedData.result !== undefined){ 
                if(props.data.loginResponse.fetchedData.result.isAuth){ // if use is authenticated then we are redirecting to home page 
                    alert(props.data.loginResponse.fetchedData.message) //alert response message
                    props.data.loginResponse = {} //making response to empty object for next request 
                    return <Redirect to='/'/>
                }
            }
        }
    }



    /* ------ Login Form ------ */
    const Form = (     
        <div id="Form">
            <div id='form-title'>Login</div>
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
                        props.data.loginResponse !== undefined ?
                        props.data.loginResponse.isLoading ? <LoaderSpinner/> : null
                        :null
                    }
                    <input type='submit' name="submit" value='Login' />
                    <Link to='/admin/signup'><input type='button' name='signup' value='Signup' /></Link>   
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

export default connect(mapStateToProps)(LoginContainer);