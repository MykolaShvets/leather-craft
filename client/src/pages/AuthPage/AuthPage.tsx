import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import RegisterForm from '../../components/RegisterForm/RegisterForm';
import LoginForm from '../../components/LoginForm/LoginForm';

const AuthPage: FC = () => {
    const location = useLocation();
    const isLogin = location.pathname === '/login';

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}
        >
            <Typography variant="h2" textAlign="center" marginBottom="20px">{isLogin ? 'Login' : 'Registration'}</Typography>
            {isLogin ? <LoginForm /> : <RegisterForm />}
            <Box sx={{
                display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px',
            }}
            >
                <Typography>Or you can</Typography>
                <Typography color="red" fontWeight="bold">
                    {isLogin ? <Link to="/register">Create new profile</Link> : <Link to="/login">Login</Link>}
                </Typography>
            </Box>
        </Box>
    );
};

export default AuthPage;
