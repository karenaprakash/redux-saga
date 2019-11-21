import React from 'react';
import LoginContainer from '../../../Containers/User/Login/login_container';

const UserLogin = (props) => {
    return (
        <div>
            <LoginContainer {...props}  />
        </div>
    )
}

export default UserLogin;