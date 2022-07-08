import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { IUser } from '../../interfaces/userInterface';

import './RegisterForm.css'
import { useAppDispatch } from '../../hooks/redux';
import { regNewUser } from '../../store/slice/userSlice';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {

    const {register, handleSubmit} = useForm<IUser>()
    const dispatch = useAppDispatch();
    const navigation = useNavigate();

    const registration: SubmitHandler<IUser> = (data) => {
        dispatch(regNewUser(data))
        navigation('/', {replace: true});
    }

    return (
        <form onSubmit={handleSubmit(registration)} className={'register__form'}>
            <label>First name: <input {...register('firstName')}/></label>
            <label>Last name: <input {...register('lastName')}/></label>
            <label>Email: <input {...register('email')}/></label>
            <label>Phone: <input {...register('phone')}/></label>
            <label>Password: <input {...register('password')}/></label>
            <button>Registration</button>
        </form>
    );
};

export default RegisterForm;
