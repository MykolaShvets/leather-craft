import React, { Dispatch, FC, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Box, Button, TextField } from '@mui/material';

import { IUser } from '../../interfaces/userInterface';
import { IUserForm } from '../../interfaces/userFormInterface';
import { useAppDispatch } from '../../hooks/redux';
import { updateUser } from '../../store/slice/userSlice';
import { editUserValidator } from '../../validators/userValidator';

const EditUserForm: FC<{user: IUser, modalAction: Dispatch<SetStateAction<boolean>>}> = ({ user, modalAction }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<IUserForm>(
        { resolver: joiResolver(editUserValidator), mode: 'onTouched' },
    );

    const dispatch = useAppDispatch();

    const updateUserInfo: SubmitHandler<IUserForm> = (data) => {
        dispatch(updateUser({ user: data, id: user.id as number }));
        modalAction(false);
    };

    return (
        <Box
            component="form"
            sx={{
                display: 'flex', flexDirection: 'column', gap: '20px',
            }}
        >
            <TextField
                {...register('firstName')}
                defaultValue={user.firstName}
                label="First Name"
                error={!!errors.firstName}
                helperText={errors.firstName && errors.firstName.message}
            />
            <TextField
                {...register('lastName')}
                defaultValue={user.lastName}
                label="Last Name"
                error={!!errors.lastName}
                helperText={errors.lastName && errors.lastName.message}
            />
            <TextField
                {...register('email')}
                label="Email"
                defaultValue={user.email}
                error={!!errors.email}
                helperText={errors.email && errors.email.message}
            />
            <TextField
                {...register('phone')}
                label="Phone"
                defaultValue={user.phone}
                error={!!errors.phone}
                helperText={errors.phone && errors.phone.message}
            />
            <Button
                onClick={handleSubmit(updateUserInfo)}
                variant="outlined"
                sx={{ fontSize: '18px' }}
            >EDIT
            </Button>
        </Box>
    );
};

export default EditUserForm;
