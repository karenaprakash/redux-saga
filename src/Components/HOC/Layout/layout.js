import React from 'react';
import NavigationBar from '../../NavBar/navbar'

const Layout = (props) => {
    return (
        <>
          
                <NavigationBar/> 
                {props.children}
           
        </>
    )
}

export default Layout;