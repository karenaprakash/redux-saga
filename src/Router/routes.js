import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
/* ---------- Pages -------------*/
import Home from '../Pages/Home/home';
import UserLogin from '../Pages/User/Login/login';
import UserSignUp from '../Pages/User/SignUp/signup';
import Layout from '../Components/HOC/Layout/layout';
import AdminCalendar from '../Containers/TasksWithCalendar/admin_calendar';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/login" exact component={UserLogin} />
                <Route path="/signup" exact component={UserSignUp} />
                <Route path="/admin" exact component={AdminCalendar} />  
                <Route path="/" exact component={Home} />
            </Switch>
        </Layout>
    )
}

export default Routes;