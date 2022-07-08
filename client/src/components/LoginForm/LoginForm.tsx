import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ILoginForm } from '../../interfaces/loginInterface';
import { useAppDispatch } from '../../hooks/redux';
import { loginUser } from '../../store/slice/userSlice';

import './LoginForm.css';

const LoginForm: FC = () => {
    const { register, handleSubmit } = useForm<ILoginForm>();
    const dispatch = useAppDispatch();
    const navigation = useNavigate();

    const login: SubmitHandler<ILoginForm> = (data) => {
        dispatch(loginUser(data));
        navigation('/', { replace: true });
    };

    return (
        <form onSubmit={handleSubmit(login)} className="login__form">
            <label>Email:
                <input {...register('email')} />
            </label>
            <label>Password:
                <input {...register('password')} />
            </label>
            <button>Login</button>
        </form>
    );
};

export default LoginForm;
