import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';

import { ILoginForm } from '../../interfaces/loginInterface';
import { useAppDispatch } from '../../hooks/redux';
import { loginUser } from '../../store/slice/userSlice';
import { loginValidator } from '../../validators/userValidator';
import './LoginForm.css';

const LoginForm: FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>(
        { resolver: joiResolver(loginValidator), mode: 'onTouched' },
    );
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
                {errors.email && <p className="input__error">{errors.email.message}</p>}
            </label>
            <label>Password:
                <input {...register('password')} />
                {errors.password && <p className="input__error">{errors.password.message}</p>}
            </label>
            <button>Login</button>
        </form>
    );
};

export default LoginForm;
