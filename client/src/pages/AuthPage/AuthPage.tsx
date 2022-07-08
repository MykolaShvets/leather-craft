import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import RegisterForm from '../../components/RegisterForm/RegisterForm';

import './AuthPage.css'
import LoginForm from '../../components/LoginForm/LoginForm';

const AuthPage: FC = () => {
    const location = useLocation();
    const isLogin = location.pathname === '/login'

    return (
        <div className={'register__container'}>
            <h2>{isLogin? 'Login' : 'Registration'}</h2>
            {isLogin? <LoginForm/> : <RegisterForm/>}
            <p>Or you can {isLogin? <Link to={'/register'}>Create new profile</Link> : <Link to={'/login'}>Login</Link>}</p>
        </div>
    );
};

export default AuthPage;
