import React , { useState , useEffect } from 'react';
import {getAuth} from '../../../Actions/index';
/* -------- redux ------- */
import { connect } from 'react-redux';

export default function(WrapComponent){
    const Auth = (props) => {

        const [ isAuth , setIsAuth ] = useState(false);
        const [ isLoading , setIsLoading ] = useState(false);
        const [ error , setError ] = useState(null);
    
        useEffect(() => {
            props.dispatch(getAuth());
        },[]);
    
        console.log(props.data)
        let fetchAuthData;
        if(props.data.fetchAuthResponse){
            fetchAuthData = props.data.fetchAuthResponse
        }
        console.log(fetchAuthData)

      
        if(fetchAuthData !== undefined){
            if(fetchAuthData.isLoading){
                
            }
        }

            
    }
    
    const mapStateToProps = (state) => {
        console.log(state);
        return{
            data : state.data
        }
    }
    
    return connect(mapStateToProps)(Auth);
    
}