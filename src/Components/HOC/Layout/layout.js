import React from 'react'
import NavigationBar from '../../NavBar/navbar'
import { BrowserRouter } from 'react-router-dom';

const Layout = (props) => {
    return (
        <BrowserRouter>
            <NavigationBar/>
            {props.children}
        </BrowserRouter>
    )
}

export default Layout;