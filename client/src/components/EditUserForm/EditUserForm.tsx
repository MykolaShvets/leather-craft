import React, { Dispatch, FC, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { IUser } from '../../interfaces/userInterface';
import { IUserForm } from '../../interfaces/userFormInterface';
import { useAppDispatch } from '../../hooks/redux';
import { updateUser } from '../../store/slice/userSlice';
import { editUserValidator } from '../../validators/userValidator';
import './EditUserForm.css';

const EditUserForm: FC<{user: IUser, modalAction: Dispatch<SetStateAction<boolean>>}> = ({ user, modalAction }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<IUserForm>(
        { resolver: joiResolver(editUserValidator), mode: 'onTouched' },
    );

    const dispatch = useAppDispatch();

    const updateUserInfo: SubmitHandler<IUserForm> = (data) => {
        dispatch(updateUser({ user: data, id: user.id as number }));
    };

    return (
        <form className="edit-user" onSubmit={handleSubmit(updateUserInfo)}>
            <label>
                Firs name: <input type="text" defaultValue={user.firstName} {...register('firstName')} />
                {errors.firstName && <p className="input__error">{errors.firstName.message}</p>}
            </label>
            <label>
                Last name: <input type="text" defaultValue={user.lastName} {...register('lastName')} />
                {errors.lastName && <p className="input__error">{errors.lastName.message}</p>}
            </label>
            <label>
                Email: <input type="text" defaultValue={user.email} {...register('email')} />
                {errors.email && <p className="input__error">{errors.email.message}</p>}

            </label>
            <label>
                Phone: <input type="text" defaultValue={user.phone} {...register('phone')} />
                {errors.phone && <p className="input__error">{errors.phone.message}</p>}
            </label>
            <button onClick={() => modalAction(false)}>Update</button>
        </form>
    );
};

export default EditUserForm;
