import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
    Box, Button, IconButton, InputAdornment, TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';

import { IUser } from '../../interfaces/userInterface';
import { useAppDispatch } from '../../hooks/redux';
import { regNewUser } from '../../store/slice/userSlice';
import { registerValidator } from '../../validators/userValidator';

const RegisterForm = () => {
    const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
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
        <Box
            component="form"
            sx={{
                display: 'flex', flexDirection: 'column', gap: '20px', width: { xs: '80%', md: '50%' },
            }}
        >
            <TextField
                {...register('firstName')}
                label="First Name"
                error={!!errors.firstName}
                helperText={errors.firstName && errors.firstName.message}
            />
            <TextField
                {...register('lastName')}
                label="Last Name"
                error={!!errors.lastName}
                helperText={errors.lastName && errors.lastName.message}
            />
            <TextField
                {...register('email')}
                label="Email"
                error={!!errors.email}
                helperText={errors.email && errors.email.message}
            />
            <TextField
                {...register('phone')}
                label="Phone"
                error={!!errors.phone}
                helperText={errors.phone && errors.phone.message}
            />
            <TextField
                {...register('password')}
                type={isPasswordHidden ? 'password' : 'text'}
                label="Password"
                error={!!errors.password}
                helperText={errors.password && errors.password.message}
                InputProps={{
                    endAdornment:
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                                edge="end"
                            >
                                {isPasswordHidden ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>,
                }}
            />
            <Button
                onClick={handleSubmit(registration)}
                variant="outlined"
                sx={{ fontSize: '18px' }}
            >Register
            </Button>
        </Box>
    );
};

export default RegisterForm;
