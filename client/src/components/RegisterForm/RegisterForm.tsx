import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';

import { IUser } from '../../interfaces/userInterface';
import { useAppDispatch } from '../../hooks/redux';
import { regNewUser } from '../../store/slice/userSlice';
import './RegisterForm.css';
import { registerValidator } from '../../validators/userValidator';

const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IUser>(
        { resolver: joiResolver(registerValidator), mode: 'onTouched' },
    );
    const dispatch = useAppDispatch();
    const navigation = useNavigate();

    const registration: SubmitHandler<IUser> = (data) => {
        dispatch(regNewUser(data));
        navigation('/', { replace: true });
    };

    return (
        <form onSubmit={handleSubmit(registration)} className="register__form">
            <label>First name:
                <input {...register('firstName')} />
                {errors.firstName && <p className="input__error">{errors.firstName.message}</p>}
            </label>
            <label>Last name:
                <input {...register('lastName')} />
                {errors.lastName && <p className="input__error">{errors.lastName.message}</p>}
            </label>
            <label>Email:
                <input {...register('email')} />
                {errors.email && <p className="input__error">{errors.email.message}</p>}
            </label>
            <label>Phone:
                <input {...register('phone')} />
                {errors.phone && <p className="input__error">{errors.phone.message}</p>}
            </label>
            <label>Password:
                <input {...register('password')} />
                {errors.password && <p className="input__error">{errors.password.message}</p>}
            </label>
            <button>Registration</button>
        </form>
    );
};

export default RegisterForm;
