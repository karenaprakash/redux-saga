import React from 'react';
import NavigationBar from '../../NavBar/navbar'
import AuthContext from '../../../Hooks/Context/authContext';

const Layout = (props) => {
    return (
        <>
          
                <NavigationBar/> 
                {props.children}
           
        </>
    )
}

export default Layout;