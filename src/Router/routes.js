import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
/* ---------- Pages -------------*/
import Home from '../Pages/Home/home';
import AddTask from '../Pages/Admin/add_task';
import EditTask from '../Pages/Admin/edit_task';
import AdminLogin from '../Pages/Admin/Login/login';
import AdminSignUp from '../Pages/Admin/SignUp/signup';

const Routes = () => {
    return (
            <Switch>
                <Route path="/admin/login" exact component={AdminLogin} />
                <Route path="/admin/signup" exact component={AdminSignUp} />
                <Route path="/admin/add-task" exact component={AddTask} />
                <Route path="/admin/edit-task/:id" exact component={EditTask} />                  
                <Route path="/" exact component={Home} />
            </Switch>
    )
}

export default Routes;